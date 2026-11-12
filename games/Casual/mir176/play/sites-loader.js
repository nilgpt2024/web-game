globalThis.mir176SiteAssets={"index.wasm":{"size":39514754,"hash":"fc74679e3b97f76878947fcd4fbe1268cbfa6188182a2e33bbc3f5dc9bfa57d0","parts":[{"url":"game-data/index.wasm.fc74679e3b97f768.0.bin","size":8388608,"hash":"8a56546b5f9b9137e80adde4400b797a5189062dee30d2505871ebd8e83987d3"},{"url":"game-data/index.wasm.fc74679e3b97f768.1.bin","size":8388608,"hash":"62901720225c5663e708a233614396a6943357de7c98cead67f11669773dccae"},{"url":"game-data/index.wasm.fc74679e3b97f768.2.bin","size":8388608,"hash":"c14dee0b88ada7bc7b4b48f3b8ae20e16922818417292b06082484fe183ae397"},{"url":"game-data/index.wasm.fc74679e3b97f768.3.bin","size":8388608,"hash":"ca498a54fdb112b659cf23bc79a932e58d350a0f4cc8fabb639f230233ad6c72"},{"url":"game-data/index.wasm.fc74679e3b97f768.4.bin","size":5960322,"hash":"219249da87c3cfda9a89fba24e253e60d6efd5191d0b108120ad93e51e54d707"}]},"index.pck":{"size":50633616,"hash":"f4a88e8c7925e05fc892e7b4c4faa1629de11074a86fd361176a748046422fba","parts":[{"url":"game-data/index.pck.f4a88e8c7925e05f.0.bin","size":8388608,"hash":"e7a97f72d73f5492d081cb1245c3504ac6999207b32bc428eafcca226f12768a"},{"url":"game-data/index.pck.f4a88e8c7925e05f.1.bin","size":8388608,"hash":"2df4ff280cd05bda681629b9d2ae01582531529c62f8300ba90f1f502121e194"},{"url":"game-data/index.pck.f4a88e8c7925e05f.2.bin","size":8388608,"hash":"2cf6db30690e107d5b8d0f409010b2c23570710a64c9fc8f56348a6941359c8a"},{"url":"game-data/index.pck.f4a88e8c7925e05f.3.bin","size":8388608,"hash":"053ed0c482151738a0678f0c3c5f960a563b7065ec3a15f65e02f6f0513921cd"},{"url":"game-data/index.pck.f4a88e8c7925e05f.4.bin","size":8388608,"hash":"d45f345a35aa63f7c351a971f7fe547e18d4b2f756b3fb8c9b2137a4dd4b98f2"},{"url":"game-data/index.pck.f4a88e8c7925e05f.5.bin","size":8388608,"hash":"4367b151e59d2a9643e3239cdd8adda5d9ef343ac47caad546dab6bd7c11dcc1"},{"url":"game-data/index.pck.f4a88e8c7925e05f.6.bin","size":301968,"hash":"ea2f1c3207d9c8591b59cbd8291c5dd201fb3e3d70e95e7ad778b92ddaeb6eea"}]}};
// This hook is limited to Godot's two preload requests; normal browser fetch is unchanged.
(() => {
  const files = globalThis.mir176SiteAssets;
  const base = new URL('.', document.baseURI);
  const entries = new Map(Object.entries(files).map(([name, spec]) => [new URL(name, base).href, spec]));
  const progress = new Map([...entries.keys()].map(key => [key, 0]));
  const total = Object.values(files).reduce((sum, file) => sum + file.size, 0);
  function showProgress() {
    const current = [...progress.values()].reduce((sum, value) => sum + value, 0);
    const bar = document.getElementById('progress');
    if (bar) { bar.value = current; bar.max = total; }
    const status = document.getElementById('status');
    if (status) status.textContent = `正在载入角色与地牢… ${Math.round(current / total * 100)}%`;
  }
  async function loadPart(part) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const response = await fetch(new URL(part.url, base), {credentials:'same-origin'});
        if (!response.ok) throw Error(`资源加载失败 (${response.status})`);
        const stream = response.body.pipeThrough(new DecompressionStream('gzip'));
        const bytes = new Uint8Array(await new Response(stream).arrayBuffer());
        if (bytes.length !== part.size) throw Error('资源长度不完整');
        const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', bytes));
        const hash = [...digest].map(value => value.toString(16).padStart(2, '0')).join('');
        if (hash !== part.hash) throw Error('资源校验失败');
        return bytes;
      } catch (error) {
        if (attempt === 2) throw error;
        await new Promise(resolve => setTimeout(resolve, 500 * (attempt + 1)));
      }
    }
  }
  globalThis.mir176SiteFetch = async input => {
    const key = new URL(input, base).href;
    const spec = entries.get(key);
    if (!spec) return fetch(input);
    try {
      if (!globalThis.DecompressionStream) throw Error('请使用最新版 Chrome、Edge 或 Safari');
      const bytes = new Uint8Array(spec.size);
      let offset = 0;
      for (const part of spec.parts) {
        const decoded = await loadPart(part);
        bytes.set(decoded, offset);
        offset += decoded.length;
        progress.set(key, offset);
        showProgress();
      }
      return new Response(bytes, {headers:{'Content-Length':String(spec.size), 'Content-Type':key.endsWith('.wasm') ? 'application/wasm' : 'application/octet-stream'}});
    } catch (error) {
      const status = document.getElementById('status');
      if (status) status.textContent = `加载失败：${error.message}。请刷新页面重试。`;
      throw error;
    }
  };
})();
