import { compareCustomElementConstructorTagNamesOrThrow } from '../../helpers/compare-custom-element-constructor-tag-names-or-throw';
import { getCustomElementConstructorTagNameOrThrow } from '../../helpers/get-custom-element-constructor-tag-name-or-throw';
import { ICustomElementConstructor } from '../../types/custom-element-constructor.type';
import { createCustomElementView } from '../create-custom-element-view';
import { ICustomElementView } from '../custom-element-view.type';

export function customElementRaw<// generics
  GTagName extends string,
  GCustomElementConstructor extends ICustomElementConstructor
  //
  >(
  customElementConstructor: GCustomElementConstructor,
): ICustomElementView<GTagName, GCustomElementConstructor> {
  return createCustomElementView<GTagName, GCustomElementConstructor>(
    getCustomElementConstructorTagNameOrThrow(customElementConstructor) as GTagName,
    (): Promise<GCustomElementConstructor> => {
      return Promise.resolve(customElementConstructor);
    },
  );
}

export function customElement<// generics
  GTagName extends string,
  GCustomElementConstructor extends ICustomElementConstructor
  //
  >(
  tagName: GTagName,
  customElementConstructor: GCustomElementConstructor,
): ICustomElementView<GTagName, GCustomElementConstructor> {
  compareCustomElementConstructorTagNamesOrThrow(
    customElementConstructor,
    tagName,
  );
  return createCustomElementView<GTagName, GCustomElementConstructor>(
    tagName,
    (): Promise<GCustomElementConstructor> => {
      return Promise.resolve(customElementConstructor);
    },
  );
}
