import { XMLBuilder } from 'fast-xml-parser';

/**
 * Tetszőleges object kiírása xml-be
 * @param obj tetszőleges object
 * @returns xml dokumentum string
 */
export default function writeToXML(obj: any): string {
  obj = removeNull(obj);

  const xmlBuilder = new XMLBuilder({
    format: true,
    ignoreAttributes: false,
    attributeNamePrefix: '$',
    textNodeName: '_',
  });

  const xml = xmlBuilder.build(obj);

  return xml;
}

function removeNull(obj: any): any {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, value]) => value != null)
      .map(([key, value]) => [key, value === Object(value) ? removeNull(value) : value])
  );
}
