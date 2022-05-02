import { ICustomElementConstructor } from '../types/custom-element-constructor.type';
import { CUSTOM_ELEMENT_CONSTRUCTOR_DETAILS } from './custom-element-constructor-details.constant';
import { ICustomElementConstructorDetails } from './custom-element-constructor-details.type';

export interface ICustomElementConstructorWithDetails extends ICustomElementConstructor {
  readonly [CUSTOM_ELEMENT_CONSTRUCTOR_DETAILS]: ICustomElementConstructorDetails;
}
