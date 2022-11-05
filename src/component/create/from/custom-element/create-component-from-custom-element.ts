import {
  createComponentFromCustomElementReference,
} from './create-component-from-custom-element-reference';
import { ICustomElementComponent, ICustomElementConstructor } from './custom-element.types';

export function createComponentFromCustomElement<GElement extends HTMLElement>(
  name: string,
  customElementConstructor: ICustomElementConstructor<GElement>,
): ICustomElementComponent<GElement> {
  return createComponentFromCustomElementReference(
    name,
    (): ICustomElementConstructor<GElement> => customElementConstructor,
  );
}
