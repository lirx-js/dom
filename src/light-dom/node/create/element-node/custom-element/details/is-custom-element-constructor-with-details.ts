import { CUSTOM_ELEMENT_CONSTRUCTOR_DETAILS } from './custom-element-constructor-details.constant';
import { ICustomElementConstructorWithDetails } from './custom-element-constructor-with-details.type';

export function isCustomElementConstructorWithDetails(
  value: any,
): value is ICustomElementConstructorWithDetails {
  return CUSTOM_ELEMENT_CONSTRUCTOR_DETAILS in value;
}
