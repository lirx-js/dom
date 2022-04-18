import { compareCustomElementConstructorTagNamesOrThrow } from '../../helpers/compare-custom-element-constructor-tag-names-or-throw';
import { ICustomElementConstructor } from '../../types/custom-element-constructor.type';
import { createCustomElementView } from '../create-custom-element-view';
import { ICustomElementView } from '../custom-element-view.type';

export type IGetCustomElementConstructorFunctionResult<GCustomElementConstructor extends ICustomElementConstructor> =
  | GCustomElementConstructor
  | PromiseLike<GCustomElementConstructor>;

export interface IGetCustomElementConstructorFunction<GCustomElementConstructor extends ICustomElementConstructor> {
  (): IGetCustomElementConstructorFunctionResult<GCustomElementConstructor>;
}

export function customElementRef<// generics
  GTagName extends string,
  GCustomElementConstructor extends ICustomElementConstructor
  //
  >(
  tagName: GTagName,
  getCustomElementConstructor: IGetCustomElementConstructorFunction<GCustomElementConstructor>,
  isExternal: boolean = false,
): ICustomElementView<GTagName, GCustomElementConstructor> {
  return createCustomElementView<GTagName, GCustomElementConstructor>(
    tagName,
    (): Promise<GCustomElementConstructor> => {
      let promise: Promise<GCustomElementConstructor> = new Promise<GCustomElementConstructor>((
        resolve: (value: GCustomElementConstructor | PromiseLike<GCustomElementConstructor>) => void,
      ): void => {
        resolve(getCustomElementConstructor());
      });

      if (!isExternal) {
        promise = promise.then((customElementConstructor: GCustomElementConstructor): GCustomElementConstructor => {
          compareCustomElementConstructorTagNamesOrThrow(customElementConstructor, tagName);
          return customElementConstructor;
        });
      }

      return promise;
    },
  );
}
