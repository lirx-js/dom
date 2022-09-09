import { IGenericObservable, IObservable, single } from '@lirx/core';
import { isObservable } from './is/is-observable';

export type INotAnObservable<GValue> = [GValue] extends [IGenericObservable]
  ? { MUST_NOT_BE_AN_OBSERVABLE: never }
  : any;

export type IObservableLike<GValue extends INotAnObservable<GValue>> =
  | GValue
  | IObservable<GValue>
  ;


export function toObservable<GValue extends INotAnObservable<GValue>>(
  value: IObservableLike<GValue>,
): IObservable<GValue> {
  return isObservable(value)
    ? value
    : single(value);
}

export function toObservableThrowIfUndefined<GValue extends INotAnObservable<GValue>>(
  value: IObservableLike<GValue>,
): IObservable<GValue> {
  if (value === void 0) {
    throw new TypeError(`Not an observable`);
  } else {
    return toObservable(value);
  }
}

export function toObservableStrict<GValue extends INotAnObservable<GValue>>(
  value: IObservableLike<GValue>,
): IObservable<GValue> {
  if (isObservable(value)) {
    return value;
  } else {
    throw new TypeError(`Not an observable`);
  }
}
