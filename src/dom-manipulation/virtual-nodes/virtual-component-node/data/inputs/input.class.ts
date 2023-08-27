import {
  IObserver,
  createMulticastReplayLastSource,
  IObservable,
  ICreateReplayLastSourceInitialValue,
  IMulticastReplayLastSource,
} from '@lirx/core';

export class Input<GValue> {
  readonly #source: IMulticastReplayLastSource<GValue>;

  constructor(
    ...initialValue: ICreateReplayLastSourceInitialValue<GValue>
  ) {
    this.#source = createMulticastReplayLastSource<GValue>(...initialValue);
  }

  get emit(): IObserver<GValue> {
    return this.#source.emit;
  }

  get subscribe(): IObservable<GValue> {
    return this.#source.subscribe;
  }

  get value(): GValue {
    return this.#source.getValue();
  }
}

export type IGenericInput = Input<any>;

export function input<GValue>(
  ...initialValue: ICreateReplayLastSourceInitialValue<GValue>
): Input<GValue> {
  return new Input<GValue>(...initialValue);
}

