import { IDefaultNotificationsUnion, IObservable, toPromiseLast } from '@lirx/core';
import { ICustomElementConstructor } from '../../types/custom-element-constructor.type';
import { ICustomElementView } from '../custom-element-view.type';
import { customElementRef } from './custom-element-ref';

export function customElementObservable<// generics
  GTagName extends string,
  GCustomElementConstructor extends ICustomElementConstructor
  //
  >(
  tagName: GTagName,
  customElementConstructorObservable: IObservable<IDefaultNotificationsUnion<GCustomElementConstructor>>,
  isExternal?: boolean,
): ICustomElementView<GTagName, GCustomElementConstructor> {
  return customElementRef<GTagName, GCustomElementConstructor>(
    tagName,
    (): Promise<GCustomElementConstructor> => {
      return toPromiseLast<GCustomElementConstructor>(customElementConstructorObservable);
    },
    isExternal,
  );
}
