import { ICustomElementConstructor } from '../types/custom-element-constructor.type';
import { ICustomElementView } from './custom-element-view.type';

export function isCustomElementView<// generics
  GTagName extends string,
  GCustomElementConstructor extends ICustomElementConstructor
  //
  >(
  value: object,
  tagName?: GTagName,
): value is ICustomElementView<GTagName, GCustomElementConstructor> {
  return (typeof (value as any).resolve === 'function')
    && (typeof (value as any).tagName === 'string')
    && (
      (tagName === void 0)
      || ((value as any).tagName === tagName)
    );
}


