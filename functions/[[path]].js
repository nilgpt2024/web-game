// Cloudflare Pages catch-all —— 按主机名分发。
// 域名架构：game.suipce.com = 游戏正典，suipce.com = 门户（tools + game 双入口），tools.suipce.com 独立项目。
//
// 为什么用 Function 而不是 _redirects 的 host 规则：
// Pages 的 _redirects 只按 path 匹配，source 里写绝对 host（如 https://suipce.com/）不会生效，
// 因此门户域的根重写与旧路径 301 统一在这里处理。

const PORTAL_HOST = "suipce.com";
const GAME_HOST = "game.suipce.com";

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const host = url.hostname.toLowerCase();
  const path = url.pathname;

  // ---------- 门户域 suipce.com ----------
  if (host === PORTAL_HOST) {
    // 根路径与 /index.html 出门户页（200 重写，非跳转）
    if (path === "/" || path === "/index.html") {
      return env.ASSETS.fetch(new Request(new URL("/portal/index.html", url), request));
    }
    // 门户自己的 robots
    if (path === "/robots.txt") {
      return env.ASSETS.fetch(new Request(new URL("/portal/robots.txt", url), request));
    }
    // 门户副本不外露，收敛到根
    if (path === "/portal" || path === "/portal/index.html") {
      return Response.redirect("https://suipce.com/", 301);
    }
    // 其余旧路径（旧游戏页、旧 sitemap、旧 blog）301 到游戏域，保留权重
    return Response.redirect(
      new URL(path + url.search, `https://${GAME_HOST}`).toString(),
      301
    );
  }

  // ---------- 游戏域与 pages.dev 预览域：直接回源 ----------
  return env.ASSETS.fetch(request);
}
