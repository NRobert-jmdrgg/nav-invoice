import { Builder, BuilderOptions } from 'xml2js';

/**
 * Tetszőleges object kiírása xml-be
 * @param obj tetszőleges object
 * @param rootname root neve
 * @param removeNil undefined vagy null értékeket ne írja bele
 * @returns xml dokumentum string
 */
export default function writeToXML(obj: any, rootname?: string, removeNil = true): string {
  let options: BuilderOptions = {};

  if (rootname) {
    options.rootName = rootname;
  }

  if (removeNil) {
    obj = removeNull(obj);
  }

  const xmlBuilder = new Builder(options);

  return xmlBuilder.buildObject(obj);
}

function removeNull(obj: any): any {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, value]) => value != null)
      .map(([key, value]) => [key, value === Object(value) ? removeNull(value) : value])
  );
}
