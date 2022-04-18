import { IGenericCustomElementView } from '../views/custom-element-view.type';
import { ICustomElementConstructor } from './custom-element-constructor.type';

export type ICustomElementConstructorOrView =
  | ICustomElementConstructor
  | IGenericCustomElementView
  ;
