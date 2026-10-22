# -*- coding: utf-8 -*-
"""CDP 全页截图：python _fullshot.py <url> <out.png> [width] [height]"""
import json, time, base64, sys, urllib.request, subprocess, os, tempfile, socket, atexit
import websocket

URL = sys.argv[1]
OUT = sys.argv[2]
W = int(sys.argv[3]) if len(sys.argv) > 3 else 1280
H = int(sys.argv[4]) if len(sys.argv) > 4 else 800

PORT = 9228
chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
profile = os.path.join(tempfile.gettempdir(), "chrome_fullshot")
proc = subprocess.Popen([
    chrome, "--headless=new", "--disable-gpu", "--no-first-run",
    "--hide-scrollbars", "--allow-file-access-from-files",
    "--remote-debugging-port=%d" % PORT,
    "--remote-allow-origins=*",
    "--user-data-dir=%s" % profile,
    "about:blank",
], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
atexit.register(lambda: (proc.terminate()))

def wait_port():
    for _ in range(50):
        try:
            urllib.request.urlopen("http://127.0.0.1:%d/json/version" % PORT, timeout=1)
            return True
        except Exception:
            time.sleep(0.3)
    return False
wait_port()

# 找 page target
targets = json.load(urllib.request.urlopen("http://127.0.0.1:%d/json" % PORT))
page = None
for t in targets:
    if t.get("type") == "page":
        page = t; break
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
cmd("Emulation.setDeviceMetricsOverride", {"width": W, "height": H, "deviceScaleFactor": 1, "mobile": False})
cmd("Page.navigate", {"url": URL})
time.sleep(6)
# 等待 load
shot = cmd("Page.captureScreenshot", {"format": "png", "captureBeyondViewport": True, "fromSurface": True})
data = shot["result"]["data"]
open(OUT, "wb").write(base64.b64decode(data))
print("saved", OUT, os.path.getsize(OUT))
ws.close()
