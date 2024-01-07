import { IObserver, IObservable, Signal, ISignal, ISignalOptions, fromSignal } from '@lirx/core';
import { SignalThrow } from '@lirx/core/src/signals/error/signal-throw.class';
import { AbstractInput } from './abstract-input.class';

export class SignalInput<GValue> extends AbstractInput<GValue> {
  readonly #signal: ISignal<GValue>;
  readonly #emit: IObserver<GValue>;
  readonly #subscribe: IObservable<GValue>;

  constructor(
    initialValue: GValue | SignalThrow,
    options?: ISignalOptions<GValue>,
  ) {
    super();
    this.#signal = new Signal<GValue>(initialValue, options);

    this.#emit = (
      value: GValue,
    ): void => {
      this.#signal.set(value);
    };

    this.#subscribe = fromSignal(this.#signal);
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
  initialValue: GValue | SignalThrow,
  options?: ISignalOptions<GValue>,
): SignalInput<GValue> {
  return new SignalInput<GValue>(initialValue, options);
}

