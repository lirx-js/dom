import { ICreateElementOptions } from '../node/create/element-node/create-element';

export function getCustomElementTagName(
  tagName: string,
  options?: ICreateElementOptions,
): string {
  return ((options === void 0) || (options.is === void 0))
    ? tagName
    : options.is;
}
