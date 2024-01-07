import { IObservable, ComputedSignal, IComputedSignalFunction, fromSignal } from '@lirx/core';

export function computedFunctionToObservable<GValue>(
  computedFunction: IComputedSignalFunction<GValue>,
): IObservable<GValue> {
  return fromSignal(new ComputedSignal(computedFunction));
}
