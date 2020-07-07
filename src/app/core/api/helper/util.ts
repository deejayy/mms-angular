export const isDate = (value: any): value is Date => value instanceof Date && !isNaN(+value);
export const isObject = (x: any): x is Object => x !== null && typeof x === 'object';
export const isArray = Array.isArray || (<T>(x: any): x is T[] => x && typeof x.length === 'number');
