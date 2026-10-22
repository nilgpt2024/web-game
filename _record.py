# -*- coding: utf-8 -*-
"""独立后台录屏进程：PIL 截屏 + cv2 写 mp4，录指定时长后自动结束"""
import cv2, numpy as np, time, sys, os
from PIL import ImageGrab

out_path = sys.argv[1] if len(sys.argv) > 1 else r'D:\PycharmProjects\GameHub\_out.mp4'
seconds = float(sys.argv[2]) if len(sys.argv) > 2 else 18
# region 参数（左,上,右,下）；缺省全屏
region = None
if len(sys.argv) > 3 and sys.argv[3].strip():
    region = tuple(int(x) for x in sys.argv[3].split(','))
    w = region[2]-region[0]; h = region[3]-region[1]
else:
    probe = ImageGrab.grab(); w, h = probe.size; region = (0, 0, w, h)

fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out = cv2.VideoWriter(out_path, fourcc, 15.0, (w, h))
t0 = time.time(); frames = 0
while time.time() - t0 < seconds:
    img = np.array(ImageGrab.grab(region))
    out.write(cv2.cvtColor(img, cv2.COLOR_RGB2BGR)); frames += 1
    time.sleep(0.03)
out.release()
print("recorded_seconds", seconds, "frames", frames, "size", w, "x", h)
