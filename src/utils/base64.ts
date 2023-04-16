/**
 * BASE64 kódolású adat átkonvertálása UTF-8-ra
 * @param data BASE64 kódolású adat
 * @returns UTF-8 kódolású adat
 */
export function base64ToUtf8(data: string): string {
  return Buffer.from(data, 'base64').toString('utf8');
}

/**
 * UTF-8 kódolású adat átkonvertálása BASE64-re
 * @param data UTF-8 kódolású adat
 * @returns BASE64 kódolású adat
 */
export function utf8ToBase64(data: string): string {
  return Buffer.from(data, 'utf-8').toString('base64');
}
