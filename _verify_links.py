# -*- coding: utf-8 -*-
import subprocess, time, json, urllib.request, shutil, os

PORT = 9233
profile = r"D:\PycharmProjects\GameHub\_cdptmp"
shutil.rmtree(profile, ignore_errors=True)
chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
proc = subprocess.Popen([
    chrome, "--headless=new", "--disable-gpu", "--no-sandbox",
    "--remote-debugging-port=%d" % PORT, "--remote-allow-origins=*", "--user-data-dir=" + profile,
    "--window-size=1280,3000", "about:blank"
])

for _ in range(30):
    try:
        targets = json.load(urllib.request.urlopen("http://127.0.0.1:%d/json" % PORT))
        break
    except Exception:
        time.sleep(1)

ws_url = targets[0]["webSocketDebuggerUrl"]
import websocket
ws = websocket.create_connection(ws_url, timeout=30, suppress_origin=True)
mid = 0
def cdp(method, params=None):
    global mid
    mid += 1
    ws.send(json.dumps({"id": mid, "method": method, "params": params or {}}))
    while True:
        r = json.loads(ws.recv())
        if r.get("id") == mid:
            return r

cdp("Page.enable")
cdp("Page.navigate", {"url": "https://suipce.com/"})
time.sleep(10)
# 触发懒加载：滚到底
cdp("Runtime.evaluate", {"expression": "window.scrollTo(0,document.body.scrollHeight)"})
time.sleep(5)

r = cdp("Runtime.evaluate", {"expression": """
(function(){
  var links = Array.from(document.querySelectorAll('a[href]')).map(a=>a.getAttribute('href'));
  var gameLinks = links.filter(h=>h && h.indexOf('games/')>-1);
  var withIndex = gameLinks.filter(h=>h.indexOf('index.html')>-1);
  var noTrailing = gameLinks.filter(h=>!/\/$/.test(h) && h.indexOf('index.html')<0);
  return JSON.stringify({total:links.length, game:gameLinks.length, withIndex:withIndex.slice(0,10), noTrailing:noTrailing.slice(0,10), sample:gameLinks.slice(0,8)});
})()
""", "returnByValue": True})
print(r["result"]["result"]["value"])
ws.close()
proc.terminate()
shutil.rmtree(profile, ignore_errors=True)
