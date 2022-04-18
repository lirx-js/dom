import { ICustomElementConstructor } from '../types/custom-element-constructor.type';

export interface ICustomElementViewResolveFunction<GCustomElementConstructor extends ICustomElementConstructor> {
  (): Promise<GCustomElementConstructor>;
}

export interface ICustomElementView<// generics
  GTagName extends string,
  GCustomElementConstructor extends ICustomElementConstructor
  //
  > {
  readonly tagName: GTagName;
  readonly resolve: ICustomElementViewResolveFunction<GCustomElementConstructor>;
}

export type IGenericCustomElementView = ICustomElementView<string, ICustomElementConstructor>;
