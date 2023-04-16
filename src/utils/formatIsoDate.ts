/**
 * ISO dátum átkonvertálása YYYYmmddhhmmss formátumra.
 * @param timestamp ISO dátum
 * @returns YYYYmmddhhmmss formátumú dátum
 */
export default function formatIsoDate(timestamp: string): string {
  return timestamp.substring(0, 19).replace(/-|:|T/g, '');
}
