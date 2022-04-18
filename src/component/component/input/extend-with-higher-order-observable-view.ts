import {
  createMulticastReplayLastSource,
  ICreateReplayLastSourceInitialValue,
  IHigherOrderObservableView,
  IObservable,
  IObserver,
  ISource,
  mergeAllSingleObservable,
  readObservableValue,
  single,
  IObserverObservableTuple,
} from '@lirx/core';
import { objectDefineProperty } from '../../../misc/object-define-property';

const DEFAULT_OPTIONS = {
  configurable: false,
  enumerable: true,
};

export type IObjectWithHigherOrderObservableView<GTarget, GPropertyName extends string, GValue> =
  Omit<GTarget, keyof IHigherOrderObservableView<GPropertyName, GValue>>
  & IHigherOrderObservableView<GPropertyName, GValue>;

export function extendWithHigherOrderObservableViewHavingSource<GTarget, GPropertyName extends string, GValue>(
  target: GTarget,
  propertyName: GPropertyName,
  {
    emit,
    subscribe,
  }: ISource<IObservable<GValue>>,
): IObjectWithHigherOrderObservableView<GTarget, GPropertyName, GValue> {

  const value$: IObservable<GValue> = mergeAllSingleObservable(subscribe);

  const $value: IObserver<GValue> = (value: GValue): void => {
    emit(single(value));
  };

  objectDefineProperty(target, propertyName, {
    ...DEFAULT_OPTIONS,
    get: (): GValue => {
      return readObservableValue(value$, (): GValue => {
        console.warn(`Reading '${propertyName}': the source did not immediately send a value`);
        return (void 0) as unknown as GValue;
      });
    },
    set: $value,
  });

  objectDefineProperty(target, `${propertyName}$`, {
    ...DEFAULT_OPTIONS,
    get: (): IObservable<GValue> => {
      return value$;
    },
    set: emit,
  });

  objectDefineProperty(target, `$${propertyName}`, {
    ...DEFAULT_OPTIONS,
    get: (): IObserver<GValue> => {
      return $value;
    },
    set: (): never => {
      throw new Error(`Readonly`);
    },
  });

  return target as any;
}

export function getInitialValueOfTarget(
  target: any,
  propertyName: string,
): any {
  return (propertyName in target)
    ? [target[propertyName]]
    : [];
}

export function extendWithHigherOrderObservableView<GTarget, GPropertyName extends string, GValue>(
  target: GTarget,
  propertyName: GPropertyName,
  ...initialValue: ICreateReplayLastSourceInitialValue<GValue>
): IObjectWithHigherOrderObservableView<GTarget, GPropertyName, GValue> {
  const _initialValue: ICreateReplayLastSourceInitialValue<IObservable<GValue>> = (initialValue.length === 0)
    ? []
    : [single(initialValue[0])];

  return extendWithHigherOrderObservableViewHavingSource<GTarget, GPropertyName, GValue>(
    target,
    propertyName,
    createMulticastReplayLastSource<IObservable<GValue>>(..._initialValue),
  );
}

export function extendWithHigherOrderObservableViewAndAutomaticInitialValue<GTarget, GPropertyName extends string, GValue>(
  target: GTarget,
  propertyName: GPropertyName,
): IObjectWithHigherOrderObservableView<GTarget, GPropertyName, GValue> {
  return extendWithHigherOrderObservableView<GTarget, GPropertyName, GValue>(
    target,
    propertyName,
    ...getInitialValueOfTarget(target, propertyName),
  );
}

export function extendWithHigherOrderObservableView$<GTarget, GPropertyName extends string, GValue>(
  target: GTarget,
  propertyName: GPropertyName,
  ...initialValue: ICreateReplayLastSourceInitialValue<GValue>
): IObserverObservableTuple<GValue> {
  const _target: IObjectWithHigherOrderObservableView<GTarget, GPropertyName, GValue> = extendWithHigherOrderObservableView<GTarget, GPropertyName, GValue>(
    target,
    propertyName,
    ...initialValue,
  );

  return [
    _target[`$${propertyName}`] as unknown as IObserver<GValue>,
    _target[`${propertyName}$`] as unknown as IObservable<GValue>,
  ];
}

export function extendWithHigherOrderObservableViewAndAutomaticInitialValue$<GTarget, GPropertyName extends string, GValue>(
  target: GTarget,
  propertyName: GPropertyName,
): IObserverObservableTuple<GValue> {
  return extendWithHigherOrderObservableView$<GTarget, GPropertyName, GValue>(
    target,
    propertyName,
    ...getInitialValueOfTarget(target, propertyName),
  );
}
