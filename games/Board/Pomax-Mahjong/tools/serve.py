"""麻将页预览静态服务：强制 no-store 防浏览器缓存旧 JS/CSS/HTML。
用法: python tools/serve.py [port]  (默认 8774，serve 仓库根目录)
"""
import http.server
import socketserver
import sys
import os
import socket

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8774
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def guess_type(self, path):
        t = super().guess_type(path)
        if path.endswith(".js") and t in ("text/plain", "application/octet-stream"):
            return "text/javascript"
        return t


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    # 双栈监听：localhost 可能解析成 IPv6 (::1)，只绑 IPv4 会导致
    # 浏览器访问 http://localhost:PORT/ 直接拒连；只绑 IPv6 会让
    # 127.0.0.1 拒连。用 IPv6 套接字 + V6ONLY=0 同时接受 ::1 与 IPv4。
    address_family = socket.AF_INET6

    def server_bind(self):
        # 必须在 bind 之前设置，否则不生效
        try:
            self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        except OSError:
            pass
        super().server_bind()


if __name__ == "__main__":
    with Server(("::", PORT), NoCacheHandler) as httpd:
        print(f"serving {ROOT} at http://localhost:{PORT}/ (no-store, dual-stack)")
        httpd.serve_forever()
