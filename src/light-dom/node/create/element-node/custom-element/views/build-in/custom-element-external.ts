import { createCustomElementNotDefinedRXDOMError } from '../../../../../../../misc/errors/rx-dom-error-5--custom-element-not-defined';
import { getCustomElementConstructorFromTagName } from '../../../../../../custom-element/get-custom-element-constructor-from-tag-name';
import { HTMLElementConstructor } from '../../../../../../types/html-element-constructor.type';
import { ICustomElementConstructor } from '../../types/custom-element-constructor.type';
import { createCustomElementView } from '../create-custom-element-view';
import { ICustomElementView } from '../custom-element-view.type';

export function customElementExternal<// generics
  GTagName extends string,
  GCustomElementConstructor extends ICustomElementConstructor
  //
  >(
  tagName: GTagName,
): ICustomElementView<GTagName, GCustomElementConstructor> {
  return createCustomElementView<GTagName, GCustomElementConstructor>(
    tagName,
    (): Promise<GCustomElementConstructor> => {
      const customElementConstructor: HTMLElementConstructor | undefined = getCustomElementConstructorFromTagName(tagName);
      return (customElementConstructor === void 0)
        ? Promise.reject(createCustomElementNotDefinedRXDOMError(tagName))
        : Promise.resolve(customElementConstructor as GCustomElementConstructor);
    },
  );
}

