/* Download the unchanged Godot binaries as independently cached gzip parts. */
window.ValeDownloads = (() => {
  'use strict';
  const manifest = {"index.wasm":{"size":39514754,"sha256":"fc74679e3b97f76878947fcd4fbe1268cbfa6188182a2e33bbc3f5dc9bfa57d0","type":"application/wasm","parts":[{"url":"part-b6956c4e77f01c5a81a4.gz","size":4194304,"downloadSize":1295458,"downloadSha256":"b6956c4e77f01c5a81a40e8b4985e4a91f469853598291318d77f096662c8cd3"},{"url":"part-2f52db86ec5024669e02.gz","size":4194304,"downloadSize":1174190,"downloadSha256":"2f52db86ec5024669e02da542c1bb760100a8b08d7a4ea4a719cae880bf75145"},{"url":"part-4862adf17fc68cc9aa01.gz","size":4194304,"downloadSize":1082541,"downloadSha256":"4862adf17fc68cc9aa01828eb356cf10653eb7fe8f08965d225308f5fb34f2c1"},{"url":"part-bb78ec121f8356879802.gz","size":4194304,"downloadSize":850771,"downloadSha256":"bb78ec121f83568798024a535137b4d59ca979cee11f010299040e5b198c0de9"},{"url":"part-2aba9d6c169b42c043fa.gz","size":4194304,"downloadSize":784848,"downloadSha256":"2aba9d6c169b42c043fa9612279897e78dcbb2950f861aba19312840460dc60e"},{"url":"part-8dbad947e7824003e42d.gz","size":4194304,"downloadSize":951358,"downloadSha256":"8dbad947e7824003e42d7b3ce184baf0d6e3ab11b28450ba72f0aabfde9b3fb9"},{"url":"part-f885d4fbcdaa538691ee.gz","size":4194304,"downloadSize":771302,"downloadSha256":"f885d4fbcdaa538691eeebdfb67d8c7f616439258744b93cd8da81788f3edbd1"},{"url":"part-f05a58124533cdd6b8db.gz","size":4194304,"downloadSize":1042226,"downloadSha256":"f05a58124533cdd6b8db11620c486f4d70cdcafd71207ca1c6889277639cc168"},{"url":"part-aefb934d80647b4bc668.gz","size":4194304,"downloadSize":1379241,"downloadSha256":"aefb934d80647b4bc668cb32c048d69d402bbbfdb7c7464b75205875c5c70730"},{"url":"part-968f5ceb43c09cbbbe88.gz","size":1766018,"downloadSize":729146,"downloadSha256":"968f5ceb43c09cbbbe88b9a3cfb6ee1015b8501d28e471f1a93b98d9bb3fb824"}]},"the-free-game-4e83a4e9569e.pck":{"size":52814180,"sha256":"4e83a4e9569ed6f5b9281b4db40e2e10e7de814a7a4bdcebb05ee055dde4ebe5","type":"application/octet-stream","parts":[{"url":"part-ab34c1e72f9f8b100b03.gz","size":4194304,"downloadSize":3843760,"downloadSha256":"ab34c1e72f9f8b100b03ee8d8b52e270e8f19ad61347e5b41fe14b7be35364c1"},{"url":"part-c58c193f06eed2b1de5c.gz","size":4194304,"downloadSize":3994198,"downloadSha256":"c58c193f06eed2b1de5cc6ef96b1daa00ef6cecb1f6a642d5c4cc8e12fb91b84"},{"url":"part-e6aa931ae08458dcb8d5.gz","size":4194304,"downloadSize":3769226,"downloadSha256":"e6aa931ae08458dcb8d504f67efafc053863b5e9c7bb5ba019e5d8ae070ad0ee"},{"url":"part-662601b9336fa059b584.gz","size":4194304,"downloadSize":4191740,"downloadSha256":"662601b9336fa059b58442288bdb534a82bba9c515d95fb82218570d59db0eab"},{"url":"part-3c2bcd83631910d1e40b.gz","size":4194304,"downloadSize":4195467,"downloadSha256":"3c2bcd83631910d1e40b3c3ee4958e4c1415d8bfb2afef5749ee70cb16a260a2"},{"url":"part-34cdda0d05265466b59f.gz","size":4194304,"downloadSize":4191292,"downloadSha256":"34cdda0d05265466b59f419c33bcd8fe683c26fc48cf83eb7bf2c73d27d475eb"},{"url":"part-e3dceac51a24ea7c555c.gz","size":4194304,"downloadSize":4190688,"downloadSha256":"e3dceac51a24ea7c555cd8dfe25bb5362afc575870c8030bf86b9104c727eecb"},{"url":"part-12d27bbab45990043a79.gz","size":4194304,"downloadSize":4195555,"downloadSha256":"12d27bbab45990043a79551ae944d0a66d08d73f09b92dec7021208224815570"},{"url":"part-eea4fa068fdd49221e5d.gz","size":4194304,"downloadSize":4194552,"downloadSha256":"eea4fa068fdd49221e5d1110abc95597e0cc69bfaf4fe6d890cd1eb7cb515eff"},{"url":"part-9e5e3519fe2747c160f5.gz","size":4194304,"downloadSize":4189281,"downloadSha256":"9e5e3519fe2747c160f5283c7b6c956416fd83412e27b75398c050ca059de1bc"},{"url":"part-7139356817127b75d57a.gz","size":4194304,"downloadSize":4195393,"downloadSha256":"7139356817127b75d57afeedb6cc3d44217f5d56ab432c197a8029cb281c5e1e"},{"url":"part-b1b117a2654f2dfd27a4.gz","size":4194304,"downloadSize":4194508,"downloadSha256":"b1b117a2654f2dfd27a4d0e55a02417fdcd1b256fe9daa4ddce065ce1b0d31b0"},{"url":"part-0d7bd71bb2ac4bda65e8.gz","size":2482532,"downloadSize":2437323,"downloadSha256":"0d7bd71bb2ac4bda65e86e132a097312f745fa435d31d917477e903782642a0f"}]}};
  const nativeFetch = window.fetch.bind(window);
  const hex = bytes => Array.from(new Uint8Array(bytes), n => n.toString(16).padStart(2, '0')).join('');
  async function verify(bytes, expected) {
    if (hex(await crypto.subtle.digest('SHA-256', bytes)) !== expected) {
      throw new Error('Um arquivo do jogo chegou incompleto. Tente novamente.');
    }
  }
  async function start(engine, onProgress) {
    if (typeof DecompressionStream !== 'function') {
      throw new Error('Atualize seu navegador para abrir esta versão do jogo.');
    }
    const progress = new Map();
    const total = Object.values(manifest).flatMap(file => file.parts).reduce((sum, part) => sum + part.downloadSize, 0);
    const report = () => onProgress(Array.from(progress.values()).reduce((sum, size) => sum + size, 0), total);
    const files = new Map(Object.entries(manifest).map(([name, file]) => [new URL(name, document.baseURI).href, file]));
    const pending = new Map();
    const aborter = new AbortController();
    async function download(file) {
      const output = new Uint8Array(file.size);
      let offset = 0;
      for (const part of file.parts) {
        const response = await nativeFetch(new URL(part.url, document.baseURI), {signal:aborter.signal});
        if (!response.ok || !response.body) throw new Error('Não foi possível baixar os arquivos do jogo. Confira sua conexão e tente novamente.');
        const zipped = new Uint8Array(part.downloadSize);
        const reader = response.body.getReader();
        let received = 0;
        while (true) {
          const {value, done} = await reader.read();
          if (done) break;
          if (received + value.length > zipped.length) {await reader.cancel();throw new Error('Arquivo de jogo inválido.');}
          zipped.set(value, received);
          received += value.length;
          progress.set(part.url, received);
          report();
        }
        if (received !== zipped.length) throw new Error('Download interrompido. Tente novamente.');
        await verify(zipped, part.downloadSha256);
        const decoded = new Uint8Array(await new Response(new Blob([zipped]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer());
        if (decoded.length !== part.size) throw new Error('Tamanho do arquivo de jogo inválido.');
        output.set(decoded, offset);
        offset += decoded.length;
      }
      await verify(output, file.sha256);
      return output;
    }
    const wrappedFetch = async (input, options) => {
      const href = new URL(input instanceof Request ? input.url : input, document.baseURI).href;
      const file = files.get(href);
      if (!file) return nativeFetch(input, options);
      if (!pending.has(href)) pending.set(href, download(file));
      const bytes = await pending.get(href);
      return new Response(bytes, {headers:{'Content-Type':file.type,'Content-Length':String(file.size)}});
    };
    window.fetch = wrappedFetch;
    report();
    try {
      await engine.startGame();
    } finally {
      if (window.fetch === wrappedFetch) window.fetch = nativeFetch;
      aborter.abort();
      pending.clear();
    }
  }
  return {start};
})();
