import { XMLBuilder } from 'fast-xml-parser';

/**
 * Tetszőleges object kiírása xml-be
 * @param obj tetszőleges object
 * @returns xml dokumentum string
 */
export default function writeToXML(obj: any): string {
  const xmlBuilder = new XMLBuilder({
    format: true,
    suppressEmptyNode: true,
    ignoreAttributes: false,
    attributeNamePrefix: '$',
    textNodeName: '_',
  });

  const xml = xmlBuilder.build(obj);

  return xml;
}
