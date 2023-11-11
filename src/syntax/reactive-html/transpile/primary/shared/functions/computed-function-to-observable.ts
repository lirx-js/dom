import { IObservable, ComputedSignal, IComputedSignalFunction } from '@lirx/core';

export function computedFunctionToObservable<GValue>(
  computedFunction: IComputedSignalFunction<GValue>,
): IObservable<GValue> {
  return new ComputedSignal(computedFunction).toObservable();
}
