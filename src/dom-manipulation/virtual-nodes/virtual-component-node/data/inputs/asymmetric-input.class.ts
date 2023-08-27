import { IMapFunction, ICreateReplayLastSourceInitialValue, IObserver } from '@lirx/core';
import { Input } from './input.class';

export class AsymmetricInput<GObserverValue, GValue extends GObserverValue> extends Input<GValue> {
  readonly #emit: IObserver<GObserverValue>;

  constructor(
    map: IMapFunction<GObserverValue, GValue>,
    ...initialValue: ICreateReplayLastSourceInitialValue<GValue>
  ) {
    super(...initialValue);

    this.#emit = (
      value: GObserverValue,
    ): void => {
      super.emit(map(value));
    };
  }

  override get emit(): IObserver<GObserverValue> {
    return this.#emit;
  }
}

export type IGenericAsymmetricInput = AsymmetricInput<any, any>;

export function asymmetricInput<GObserverValue, GValue extends GObserverValue>(
  map: IMapFunction<GObserverValue, GValue>,
  ...initialValue: ICreateReplayLastSourceInitialValue<GValue>
): AsymmetricInput<GObserverValue, GValue> {
  return new AsymmetricInput<GObserverValue, GValue>(
    map,
    ...initialValue,
  );
}
