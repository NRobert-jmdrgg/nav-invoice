function fixArray(target: any, path: string) {
  if (!target) {
    return;
  }

  // path.to.property
  const parts = path.split('.');
  // check if we are not at the last part of the path
  if (parts.length > 1) {
    const firstPart = parts[0];
    const otherParts = parts.slice(1).join('.');

    // if the property at the first part of the current path is an array then fix the property for each item in the array
    if (Array.isArray(target)) {
      for (let t of target) {
        fixArray(t[firstPart], otherParts);
      }
    } else {
      // call the fix array with the next path without the first part (to.property)
      fixArray(target[firstPart], otherParts);
    }
  } else {
    // we are at a path with no dots: 'property'
    // if current target is array and the property is not an array, then change it to an array
    if (Array.isArray(target)) {
      for (let t of target) {
        if (t[path] && !Array.isArray(t[path])) {
          t[path] = [t[path]];
        }
      }
    } else {
      // change to array
      if (target[path] && !Array.isArray(target[path])) {
        target[path] = [target[path]];
      }
    }
  }
}
/**
 * Azoknak az objekt property-knek a javítása, amelyeknek az api dokumentáció alapján tömbnek kellene lennie.
 * @param obj Tetszőleges objekt
 * @param paths Azoknak a property-knek az elérése, amiknek tömbnek kellene lennie.
 */
export function fixKnownArrays(obj: any, paths: string[]) {
  paths.forEach((path) => fixArray(obj, path));
}
