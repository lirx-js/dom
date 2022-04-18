import { IHigherOrderObservableView } from '@lirx/core';
import { HTMLElementConstructor } from '../../../light-dom/types/html-element-constructor.type';
import { extendWithHigherOrderObservableViewAndAutomaticInitialValue } from './extend-with-higher-order-observable-view';

export type IComponentInput<GName extends string, GType> = [
  name: GName,
  type: GType,
];

export type IGenericComponentInput = IComponentInput<string, any>;

export type IGenericComponentInputList = readonly IGenericComponentInput[];

export type IComponentInputListToHigherOrderObservableView<GInputList extends IGenericComponentInputList> = {
  [GKey in keyof GInputList]: GInputList[GKey] extends IComponentInput<infer GName, infer GType>
    ? IHigherOrderObservableView<GName, GType>
    : GInputList[GKey];
};

export type IComponentInputListToPropertyNameList<GInputList extends IGenericComponentInputList> = {
  [GKey in keyof GInputList]: GInputList[GKey] extends IComponentInput<infer GName, any>
    ? GName
    : GInputList[GKey];
};

type TupleToUnion<T> = { [P in keyof T]: T[P] } extends { [key: number]: infer V } ? V : never;
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
type TupleToIntersection<T> = UnionToIntersection<TupleToUnion<T>>;

export type IComponentWithInputListToObject<GInputList extends IGenericComponentInputList> =
  TupleToIntersection<IComponentInputListToHigherOrderObservableView<GInputList>>;

export type IComponentWithInputsFactoryInstance<GBaseClass extends HTMLElementConstructor, GInputList extends IGenericComponentInputList> =
  Omit<InstanceType<GBaseClass>, keyof IComponentWithInputListToObject<GInputList>>
  & IComponentWithInputListToObject<GInputList>;

export type IComponentWithInputsFactoryResult<GBaseClass extends HTMLElementConstructor, GInputList extends IGenericComponentInputList> =
  Omit<GBaseClass, 'new'>
  & {
  new(...args: ConstructorParameters<GBaseClass>): IComponentWithInputsFactoryInstance<GBaseClass, GInputList>;
};

export function componentWithInputsFactory<GBaseClass extends HTMLElementConstructor, GInputList extends IGenericComponentInputList>(
  baseClass: GBaseClass,
  propertyNames: IComponentInputListToPropertyNameList<GInputList>,
): IComponentWithInputsFactoryResult<GBaseClass, GInputList> {
  return class extends baseClass {
    constructor(...args: any[]) {
      super(...args);
      for (let i = 0, l = propertyNames.length; i < l; i++) {
        extendWithHigherOrderObservableViewAndAutomaticInitialValue(
          this,
          propertyNames[i],
        );
      }
    }
  } as unknown as IComponentWithInputsFactoryResult<GBaseClass, GInputList>;
}

