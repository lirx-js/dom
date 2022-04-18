import { createRXDOMError } from './create-rx-dom-error';

export function createDifferentTagNameRXDOMError(
  expected: string,
  found: string,
): Error {
  return createRXDOMError(4, `Different tag name. Expected '${expected}', found '${found}'`);
}

