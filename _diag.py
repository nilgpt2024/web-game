# -*- coding: utf-8 -*-
"""CDP 诊断：页面高度、overflow、内容区位置。python _diag.py <url>"""
import json, time, sys, urllib.request, subprocess, os, tempfile, atexit
import websocket

URL = sys.argv[1]
PORT = 9230
chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
profile = os.path.join(tempfile.gettempdir(), "chrome_diag")
proc = subprocess.Popen([
    chrome, "--headless=new", "--disable-gpu", "--no-first-run",
    "--allow-file-access-from-files",
    "--remote-debugging-port=%d" % PORT, "--remote-allow-origins=*",
    "--user-data-dir=%s" % profile, "about:blank",
], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
atexit.register(lambda: proc.terminate())

for _ in range(50):
    try:
        urllib.request.urlopen("http://127.0.0.1:%d/json/version" % PORT, timeout=1)
        break
    except Exception:
        time.sleep(0.3)
targets = json.load(urllib.request.urlopen("http://127.0.0.1:%d/json" % PORT))
page = next(t for t in targets if t.get("type") == "page")
ws = websocket.create_connection(page["webSocketDebuggerUrl"], max_size=None)
_id = 0
def cmd(method, params=None):
    global _id
    _id += 1
    ws.send(json.dumps({"id": _id, "method": method, "params": params or {}}))
    while True:
        m = json.loads(ws.recv())
        if m.get("id") == _id:
            return m

cmd("Page.enable")
cmd("Emulation.setDeviceMetricsOverride", {"width": 1280, "height": 800, "deviceScaleFactor": 1, "mobile": False})
cmd("Page.navigate", {"url": URL})
time.sleep(7)
js = r"""
(() => {
  const b = document.body, h = document.documentElement;
  const info = document.querySelector('.game-info-section');
  return JSON.stringify({
    scrollH: h.scrollHeight,
    bodyH: b ? b.getBoundingClientRect().height : null,
    htmlOverflow: getComputedStyle(h).overflow,
    bodyOverflow: b ? getComputedStyle(b).overflow : null,
    htmlH: getComputedStyle(h).height,
    bodyHcss: b ? getComputedStyle(b).height : null,
    hasInfo: !!info,
    infoRect: info ? Math.round(info.getBoundingClientRect().top) : null,
    cnPanel: !!document.querySelector('#cn-panel'),
    wrapperH: (() => { const w = document.querySelector('#wrapper'); return w ? Math.round(w.getBoundingClientRect().height) : null; })(),
  });
})()
"""
r = cmd("Runtime.evaluate", {"expression": js, "returnByValue": True})
print(r["result"]["result"]["value"])
ws.close()
