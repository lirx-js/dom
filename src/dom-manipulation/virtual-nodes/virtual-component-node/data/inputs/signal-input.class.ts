import { IObserver, IObservable, Signal, ISignal, ISignalOptions } from '@lirx/core';
import { AbstractInput } from './abstract-input.class';

export class SignalInput<GValue> extends AbstractInput<GValue> {
  readonly #signal: ISignal<GValue>;
  readonly #emit: IObserver<GValue>;
  readonly #subscribe: IObservable<GValue>;

  constructor(
    initialValue?: GValue | undefined,
    options?: ISignalOptions<GValue>,
  ) {
    super();
    this.#signal = new Signal<GValue>(initialValue, options);

    this.#emit = (
      value: GValue,
    ): void => {
      this.#signal.set(value);
    };

    this.#subscribe = this.#signal.toObservable();
  }

  get signal(): ISignal<GValue> {
    return this.#signal;
  }

  override get emit(): IObserver<GValue> {
    return this.#emit;
  }

  override get subscribe(): IObservable<GValue> {
    return this.#subscribe;
  }

  override get value(): GValue {
    return this.#signal.get();
  }
}

export type IGenericSignalInput = SignalInput<any>;

export function signalInput<GValue>(
  initialValue?: GValue | undefined,
  options?: ISignalOptions<GValue>,
): SignalInput<GValue> {
  return new SignalInput<GValue>(initialValue, options);
}

