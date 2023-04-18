import { get, set, map, partialRight, pick } from 'lodash';

export type OrderSchema = {
  path: string;
  order: string[];
};

export function reOrder(obj: any, orderSchema: OrderSchema[]) {
  // const orderSchema = sortByDots(schema);

  if (obj) {
    orderSchema.forEach((schema) => {
      // the root of the object
      if (schema.path === '') {
        // get the new order
        const pickedObj = pick(obj, schema.order);

        // delete the old keys
        Object.keys(pickedObj).forEach((key) => delete obj[key]);
        // set the ordered keys
        Object.assign(obj, pickedObj);
      } else {
        // check if property exists
        const prop = get(obj, schema.path);
        if (prop) {
          if (!Array.isArray(prop)) {
            // if not at root set the object according to order
            set(obj, schema.path, pick(prop, schema.order));
          } else {
            // if its an array map each object. PartialRight = prefill the rightmost argument of function called 'pick'
            set(obj, schema.path, map(prop, partialRight(pick, schema.order)));
          }
        }
      }
    });
  }
}
