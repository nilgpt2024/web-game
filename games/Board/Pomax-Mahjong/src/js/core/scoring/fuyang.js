import { config } from "../../../config.js";
import { Ruleset } from "./ruleset.js";

/**
 * 阜阳麻将（安徽阜阳地区玩法）。
 *
 * 核心规则：
 *  - 只许碰、杠，**不许吃**（ruleset.noChow，player-master.mayChow 读取）
 *  - **只能自摸胡，不能点炮**（ruleset.selfDrawOnly，game.getAllClaims 读取；
 *    自摸胡不走 claim 竞价，因此不会被误伤；抢杠胡走 processKongRob，保留）
 *  - 计分 = 底分 + 杠分 + 牌型分，庄家输赢翻倍，16 分封顶
 *
 * 计分表（POINTS_DOUBLES 模式：score × 2^doubles，本规则无加倍项）：
 *  - 胡牌底分 1 分，自摸 1 分，抢杠胡 2 分
 *  - 明杠 1 分 / 暗杠 2 分；门风刻/圈风刻/箭刻 1 分，对应杠再 +1 分
 *  - 门清 1 分；碰碰胡 2 分；混一色 2 分；清一色 4 分
 *  - **不带花牌**（noFlowerTiles，wall.reset 读取）：牌墙只含 136 张，
 *    春夏秋冬/梅兰竹菊 8 张花牌不参与对局
 */
class FuyangMahjong extends Ruleset {

  constructor() {
    super(
      Ruleset.POINTS_DOUBLES,
      250,   // 起始分
      16,    // 单局封顶 16 分
      1,     // 胡牌底分 1 分
      1,     // 无番牌型按 1 分计
      false, // 输家之间不互相结账
      true,  // 庄家输赢翻倍
      false, // 自摸不额外加倍（阜阳只能自摸，没有点炮对照）
      false, // 点炮者加倍（阜阳无点炮）
      false, // 风位顺序不反向
      true   // 东家胡牌则过庄
    );
    this.noChow = true;        // 不许吃（player-master.mayChow 读取）
    this.selfDrawOnly = true;  // 不能点炮（game.getAllClaims 读取）
    this.noFlowerTiles = true; // 不带花牌：136 张玩法（wall.reset 读取，
                               // 春夏秋冬/梅兰竹菊 8 张花牌直接从牌墙剔除）
  }

  getPairValue() {
    return { score: 0, log: [] };
  }

  // 阜阳麻将不吃，此函数实际上不会被调用
  getChowValue() {
    return { score: 0, log: [] };
  }

  getPungValue(tile, locked, concealed, names, windTile, windOfTheRoundTile) {
    const prefix = (locked && !concealed) ? "明刻" : "暗刻";
    const s = { score: 0, log: [] };
    if (tile > 26) {
      if (tile === windTile) {
        s.score += 1;
        s.log.push(`${prefix}门风 1 分`);
      }
      if (tile === windOfTheRoundTile) {
        s.score += 1;
        s.log.push(`${prefix}圈风 1 分`);
      }
      if (tile > 30) {
        s.score += 1;
        s.log.push(`${prefix}箭牌 1 分`);
      }
    }
    return s;
  }

  getKongValue(tile, locked, concealed, names, windTile, windOfTheRoundTile) {
    const open = (locked && !concealed);
    const label = open ? "明杠" : "暗杠";
    const s = { score: open ? 1 : 2, log: [`${label} ${open ? 1 : 2} 分`] };
    if (tile > 26) {
      if (tile === windTile) {
        s.score += 1;
        s.log.push(`门风杠 1 分`);
      }
      if (tile === windOfTheRoundTile) {
        s.score += 1;
        s.log.push(`圈风杠 1 分`);
      }
      if (tile > 30) {
        s.score += 1;
        s.log.push(`箭牌杠 1 分`);
      }
    }
    return s;
  }

  // 花牌不计分（引擎牌墙含 8 张花牌，仅为兼容）
  checkBonusTilePoints() {}

  /**
   * 整手牌型分（胡牌与非胡牌结算共用）。
   */
  checkHandPatterns(scorePattern, windTile, windOfTheRoundTile, tilesLeft, scoreObject) {
    if (!scorePattern.length) return;
    const state = this.getState(scorePattern, false, false, false, false, windTile, windOfTheRoundTile, tilesLeft);

    if (state.punghand) {
      scoreObject.score += 2;
      scoreObject.log.push(`碰碰胡 2 分`);
    }
    if (state.onesuit && !state.honours) {
      scoreObject.score += 4;
      scoreObject.log.push(`清一色 4 分`);
    } else if (state.onesuit && state.honours) {
      scoreObject.score += 2;
      scoreObject.log.push(`混一色 2 分`);
    }
    if (state.concealedCount === scorePattern.length) {
      scoreObject.score += 1;
      scoreObject.log.push(`门清 1 分`);
    }
  }

  /**
   * 只有赢家才有的加分项。
   */
  checkWinnerHandPatterns(scorePattern, winset, selfdraw, selftile, robbed, windTile, windOfTheRoundTile, tilesLeft, scoreObject) {
    const names = config.TILE_NAMES;
    if (robbed) {
      scoreObject.score += 2;
      scoreObject.log.push(`抢杠胡 2 分`);
    }
    if (selfdraw) {
      scoreObject.score += 1;
      scoreObject.log.push(`自摸 1 分${selftile !== false ? ` (${names[selftile]})` : ""}`);
    }
  }
}

Ruleset.register(FuyangMahjong);
