import { createMissingTagNameForComponentRXDOMError } from '../../../../../../misc/errors/rx-dom-error-2--missing-tag-name-for-component';
import { ICustomElementConstructor } from '../types/custom-element-constructor.type';
import { TAG_NAME } from './custom-element-constructor-tag-name.constant';

export function getCustomElementConstructorTagNameOrThrow(
  customElementConstructor: ICustomElementConstructor,
): string | never {
  if (TAG_NAME in customElementConstructor) {
    return customElementConstructor[TAG_NAME];
  } else {
    throw createMissingTagNameForComponentRXDOMError(customElementConstructor);
  }
}
