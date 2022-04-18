import { createRXDOMError } from './create-rx-dom-error';

export function createDifferentConstructorsRXDOMError(
  tagName: string,
): Error {
  return createRXDOMError(7, `The custom element's view returned a different constructor for '${tagName}'`);
}

