/** @module convector-core-model */

const g: any = global;

export const requiredMetadataKey = g.ConvectorRequiredMetadataKey || Symbol('required');
g.ConvectorRequiredMetadataKey = requiredMetadataKey;
import 'reflect-metadata';

export function Required() {
  return (target: any, key: string) => {
    const required = Reflect.getMetadata(requiredMetadataKey, target);

    Reflect.defineMetadata(requiredMetadataKey, {
      ...required,
      [key]: true
    }, target);
  };
}

export function ensureRequired(obj: any) {
  let required = {};

  try {
    required = Reflect.getMetadata(requiredMetadataKey, obj) || {};
  } catch (e) {
    // empty
  }

  return Object.keys(required)
    .every(k => {
      let res = !required[k] || obj[k] !== undefined;
      if (!res) {
        console.log(`Validation error. Field ${k} is required but was not found.`);
      }
      return res;
    });
}
