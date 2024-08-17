import _ from 'lodash';

export function toCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(v => toCamelCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      const camelKey = _.camelCase(key);
      result[camelKey] = toCamelCase(obj[key]);
      return result;
    }, {} as any);
  }
  return obj;
}
