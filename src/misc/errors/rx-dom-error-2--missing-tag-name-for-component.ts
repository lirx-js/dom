import { HTMLElementConstructor } from '../../light-dom/types/html-element-constructor.type';
import { createRXDOMError } from './create-rx-dom-error';

export function createMissingTagNameForComponentRXDOMError(
  component: HTMLElementConstructor,
  index?: number,
): Error {
  return createRXDOMError(2, `Missing 'TAG_NAME' for component '${component.name}'${(index === void 0) ? '' : ` at index ${index}`}`);
}

