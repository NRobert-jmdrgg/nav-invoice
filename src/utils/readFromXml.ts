// import { Parser, processors } from 'xml2js';
import { XMLParser } from 'fast-xml-parser';

/**
 * Olvasás XML fájlból
 * @param xml xml string
 * @param removeNamespaces törölje-e a namespace-ket
 * @param explicitArray értékeket tömbben adja-e vissza
 * @returns js object.
 */
export default function readFromXml<R>(xml: string, knownArrays: string[]): Promise<R> {
  const parser = new XMLParser({
    removeNSPrefix: true,
    isArray: (name, jpath, isLeafNode, isAttribute) => knownArrays.indexOf(jpath) !== -1,
  });

  return new Promise((resolve, reject) => {
    try {
      const result = parser.parse(xml) as R;
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
}
