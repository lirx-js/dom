import { ICustomElementConstructor } from '../../types/custom-element-constructor.type';
import { getCustomElementConstructorDetailsOrThrow } from '../get-custom-element-constructor-details-or-throw';

export function getCustomElementConstructorTagNameOrThrow(
  customElementConstructor: ICustomElementConstructor,
): string | never {
  return getCustomElementConstructorDetailsOrThrow(customElementConstructor).name;
}
