// Cloudflare Pages catch-all.
// Permanently redirect the mirrored game.suipce.com host to the canonical
// suipce.com (same path), while letting every other host serve static assets.
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  if (url.hostname.toLowerCase() === "game.suipce.com") {
    url.hostname = "suipce.com";
    return Response.redirect(url.toString(), 301);
  }

  // Default: serve the static asset (this also honors _redirects rules).
  return env.ASSETS.fetch(request);
}
