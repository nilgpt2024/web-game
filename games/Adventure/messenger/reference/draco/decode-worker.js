/* Local Draco decoder. Reads the attribute-name metadata embedded in the
   published Messenger geometry instead of silently dropping custom attributes. */
importScripts('./draco_wasm_wrapper.js');
const ready = (async () => {
  let lastError;
  for (let attempt = 0; attempt < 3; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetch('./draco_decoder.wasm', { signal: controller.signal });
      if (!response.ok) throw new Error(`Local Draco wasm unavailable: HTTP ${response.status}`);
      const wasmBinary = await response.arrayBuffer();
      return await DracoDecoderModule({ wasmBinary });
    } catch (error) { lastError = error; }
    finally { clearTimeout(timer); }
  }
  throw lastError;
})();
// Handle initialization rejection even before the first geometry message.
ready.catch(() => {});
const arrayTypes = [Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array];
self.onmessage = async ({ data }) => {
  const { id, buffer } = data;
  let module, decoder, geometry, query;
  try {
    module = await ready;
    decoder = new module.Decoder();
    const raw = new Uint8Array(buffer);
    let metadata, bytes;
    if (new TextDecoder().decode(raw.subarray(0, 5)) === 'DRACO') {
      bytes = new Int8Array(buffer);
    } else {
      const n = new DataView(buffer).getUint32(0, true);
      metadata = JSON.parse(new TextDecoder().decode(raw.subarray(4, 4 + n)));
      bytes = new Int8Array(buffer, 4 + n);
    }
    const type = decoder.GetEncodedGeometryType(bytes);
    const mesh = type === module.TRIANGULAR_MESH;
    geometry = mesh ? new module.Mesh() : new module.PointCloud();
    const status = mesh ? decoder.DecodeArrayToMesh(bytes, bytes.length, geometry) : decoder.DecodeArrayToPointCloud(bytes, bytes.length, geometry);
    if (!status.ok()) throw new Error(status.error_msg());
    if (!metadata) {
      query = new module.MetadataQuerier();
      metadata = JSON.parse(query.GetStringEntry(decoder.GetMetadata(geometry), 'info'));
    }
    const attrs = metadata.attributes.map(([name, typeIndex], uniqueId) => {
      const attr = decoder.GetAttributeByUniqueId(geometry, uniqueId);
      const itemSize = attr.num_components();
      const count = geometry.num_points() * itemSize;
      // Floats are convenient for ordinary Three shader attributes. The custom
      // integer IDs are all < 1,000,000 so Float32 conversion is exact.
      const ptr = module._malloc(count * 4);
      decoder.GetAttributeDataArrayForAllPoints(geometry, attr, module.DT_FLOAT32, count * 4, ptr);
      const array = new Float32Array(module.HEAPF32.buffer, ptr, count).slice();
      module._free(ptr);
      return { name, itemSize, array, originalArray: arrayTypes[typeIndex].name };
    });
    let index = null;
    if (mesh) {
      const count = geometry.num_faces() * 3;
      const ptr = module._malloc(count * 4);
      decoder.GetTrianglesUInt32Array(geometry, count * 4, ptr);
      index = new Uint32Array(module.HEAPF32.buffer, ptr, count).slice();
      module._free(ptr);
    }
    const transfers = attrs.map(a => a.array.buffer);
    if (index) transfers.push(index.buffer);
    self.postMessage({ id, attrs, index, userData: metadata.userData || {} }, transfers);
  } catch (error) {
    self.postMessage({ id, error: String(error) });
  } finally {
    if (query) module.destroy(query);
    if (geometry) module.destroy(geometry);
    if (decoder) module.destroy(decoder);
  }
};
