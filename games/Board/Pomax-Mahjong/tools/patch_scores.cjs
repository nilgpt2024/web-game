/* 给 diag_scores.mjs 加 getRuleset hook，追踪规则解析序列 */
const fs = require("fs");
let s = fs.readFileSync("tools/diag_scores.mjs", "utf8");
if (!s.includes("__hookLog")) {
  const inject = `
const hook = await send('Runtime.evaluate', { expression: \\\`(async () => {
  const m = await import('/src/js/core/scoring/ruleset.js');
  const log = window.__hookLog = [];
  if (!m.Ruleset.__hooked) {
    m.Ruleset.__hooked = true;
    const orig = m.Ruleset.getRuleset.bind(m.Ruleset);
    m.Ruleset.getRuleset = (name) => { log.push('getRuleset(' + name + ')'); return orig(name); };
  }
  return 'hooked';
})()\\\`, returnByValue: true, awaitPromise: true });
console.log('HOOK:', JSON.stringify(hook.result?.result?.value));
await sleep(1500);`;
  s = s.replace("await sleep(5000);", "await sleep(5000);" + inject);
  const tail = `
const hl = await send("Runtime.evaluate", { expression: "JSON.stringify(window.__hookLog || [])", returnByValue: true });
console.log("HOOK-LOG:", hl.result?.result?.value);`;
  s = s.replace('console.log("SCORES:", r.result?.result?.value);', 'console.log("SCORES:", r.result?.result?.value);' + tail);
  fs.writeFileSync("tools/diag_scores.mjs", s);
  console.log("patched");
} else {
  console.log("already patched");
}
