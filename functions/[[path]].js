// Cloudflare Pages catch-all.
// 域名架构：game.suipce.com = 游戏正典，suipce.com = 门户（tools + game 双入口）。
// 所有主机均直接回源静态资源；主机/路径跳转统一在 _redirects 中声明，不在此函数内硬编码。
export async function onRequest(context) {
  const { request, env } = context;
  return env.ASSETS.fetch(request);
}
