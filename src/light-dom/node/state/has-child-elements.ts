import { getFirstElementChild } from '../properties/get-first-element-child';

export function hasChildElements(
  node: Element,
): boolean {
  return getFirstElementChild(node) !== null;
}
