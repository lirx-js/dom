import { createRXDOMError } from './create-rx-dom-error';

export function createCustomElementNotDefinedRXDOMError(
  tagName: string,
): Error {
  return createRXDOMError(5, `The custom element '${tagName}' is not defined. Did you forget rx-async' ?'`);
}

