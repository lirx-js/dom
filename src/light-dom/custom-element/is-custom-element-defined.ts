import { getCustomElementConstructorFromTagName } from './get-custom-element-constructor-from-tag-name';

export function isCustomElementDefined(
  tagName: string,
): boolean {
  return getCustomElementConstructorFromTagName(tagName) !== void 0;
}
