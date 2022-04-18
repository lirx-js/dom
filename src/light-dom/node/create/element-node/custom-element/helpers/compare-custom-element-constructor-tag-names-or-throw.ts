import { createDifferentTagNameRXDOMError } from '../../../../../../misc/errors/rx-dom-error-4--different-tag-name';
import { ICustomElementConstructor } from '../types/custom-element-constructor.type';
import { getCustomElementConstructorTagNameOrThrow } from './get-custom-element-constructor-tag-name-or-throw';

export function compareCustomElementConstructorTagNamesOrThrow(
  customElementConstructor: ICustomElementConstructor,
  tagName: string,
): void | never {
  const _tagName: string = getCustomElementConstructorTagNameOrThrow(customElementConstructor);
  if (_tagName !== tagName) {
    throw createDifferentTagNameRXDOMError(tagName, _tagName);
  }
}
