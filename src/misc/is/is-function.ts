import { IGenericFunction } from '@lirx/utils';

export function isFunction(
  value: unknown,
): value is IGenericFunction {
  return (typeof value === 'function');
}
