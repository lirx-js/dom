import { createRXDOMError } from './create-rx-dom-error';

export function createCustomElementsWithSameNameRXDOMError(
  tagName: string,
): Error {
  return createRXDOMError(6, `Found more than one custom element with the same tag name '${tagName}`);
}

