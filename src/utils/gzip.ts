import { gzip, ungzip } from 'pako';

export function compressData(data: Buffer): string {
  const compressed = gzip(data, { level: 1 });
  return compressed.toString();
}

export function uncompressData(compressedData: Buffer): string {
  const unCompressed = ungzip(compressedData, { to: 'string' });
  return unCompressed;
}
