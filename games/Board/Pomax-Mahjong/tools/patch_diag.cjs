/* 给 diag_load.mjs 加：截屏 + 弹窗内容 dump（诊断用户可见的报错） */
const fs = require("fs");
let s = fs.readFileSync("tools/diag_load.mjs", "utf8");
if (!s.includes("UI:")) {
  const inject = `
const shot = await send('Page.captureScreenshot', { format: 'png' });
fs.writeFileSync('C:/Users/nil/AppData/Local/Temp/mj-user-url.png', Buffer.from(shot.result.data, 'base64'));
const ui = await send('Runtime.evaluate', { expression: \`(() => {
  const dlg = document.querySelector('.modal, dialog, .modal-window');
  const modalText = dlg ? dlg.textContent.replace(/\\\\s+/g, ' ').slice(0, 200) : null;
  let errorBanner = null;
  for (const d of document.querySelectorAll('div, section, aside')) {
    const t = (d.textContent || '');
    if (/error|错误|Error/i.test(t) && t.length < 300) { errorBanner = t.replace(/\\\\s+/g,' ').slice(0,150); break; }
  }
  return JSON.stringify({ modalText, errorBanner, bodyHead: document.body.textContent.replace(/\\\\s+/g,' ').slice(0,120) });
})()\`, returnByValue: true });
console.log('UI:', ui.result?.result?.value);
console.log('SHOT: C:/Users/nil/AppData/Local/Temp/mj-user-url.png');
console.log('PAGE-STATE:', state.result?.result?.value);`;
  s = s.replace('console.log("PAGE-STATE:", state.result?.result?.value);', inject);
  fs.writeFileSync("tools/diag_load.mjs", s);
  console.log("patched");
} else {
  console.log("already patched");
}
