import { ICustomElementConstructor } from '../types/custom-element-constructor.type';
import { ICustomElementView, ICustomElementViewResolveFunction } from './custom-element-view.type';

export function createCustomElementView<// generics
  GTagName extends string,
  GCustomElementConstructor extends ICustomElementConstructor
  //
  >(
  tagName: GTagName,
  resolve: ICustomElementViewResolveFunction<GCustomElementConstructor>,
): ICustomElementView<GTagName, GCustomElementConstructor> {
  return {
    tagName,
    resolve,
  };
}


