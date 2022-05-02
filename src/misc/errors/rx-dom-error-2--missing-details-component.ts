import { HTMLElementConstructor } from '../../light-dom/types/html-element-constructor.type';
import { createRXDOMError } from './create-rx-dom-error';

export function createMissingDetailsForComponentRXDOMError(
  component: HTMLElementConstructor,
): Error {
  return createRXDOMError(2, `Missing 'CUSTOM_ELEMENT_CONSTRUCTOR_DETAILS' for component '${component.name}'`);
}

// export function createMissingTagNameForComponentRXDOMError(
//   component: HTMLElementConstructor,
//   index?: number,
// ): Error {
//   return createRXDOMError(2, `Missing 'CUSTOM_ELEMENT_CONSTRUCTOR_DETAILS' for component '${component.name}'${(index === void 0) ? '' : ` at index ${index}`}`);
// }

