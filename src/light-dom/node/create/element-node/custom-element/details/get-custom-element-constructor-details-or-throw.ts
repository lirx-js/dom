import { createMissingDetailsForComponentRXDOMError } from '../../../../../../misc/errors/rx-dom-error-2--missing-details-component';
import { ICustomElementConstructor } from '../types/custom-element-constructor.type';
import { CUSTOM_ELEMENT_CONSTRUCTOR_DETAILS } from './custom-element-constructor-details.constant';
import { ICustomElementConstructorDetails } from './custom-element-constructor-details.type';
import { isCustomElementConstructorWithDetails } from './is-custom-element-constructor-with-details';

export function getCustomElementConstructorDetailsOrThrow(
  customElementConstructor: ICustomElementConstructor,
): ICustomElementConstructorDetails | never {
  if (isCustomElementConstructorWithDetails(customElementConstructor)) {
    return customElementConstructor[CUSTOM_ELEMENT_CONSTRUCTOR_DETAILS];
  } else {
    throw createMissingDetailsForComponentRXDOMError(customElementConstructor);
  }
}
