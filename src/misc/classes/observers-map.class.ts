import { IObservable, IObserver } from '@lirx/core';
import { createKeyDoesNotExistError } from './create-key-does-not-exist-error';

/** TYPES **/

export type IObserversMapEntry<GKey extends string, GValue> = [
  key: GKey,
  value: GValue,
];

export type IGenericObserversMapEntry = IObserversMapEntry<any, any>;

export type IGenericObserversMapEntries = readonly IGenericObserversMapEntry[];

export type InferObserversMapKeys<GEntries extends IGenericObserversMapEntries> = {
  [Key in keyof GEntries]: GEntries[Key][0];
}[number];

export type InferObserversMapValueFromKey<GEntries extends IGenericObserversMapEntries, GKey extends string> = {
  [Key in keyof GEntries]: GEntries[Key][0] extends GKey
    ? GEntries[Key][1]
    : never;
}[number];

export type InferObserversMapInputEntries<GEntries extends IGenericObserversMapEntries> = {
  readonly [Key in keyof GEntries]: [GEntries[Key][0], IObserver<GEntries[Key][1]>];
};

/** CLASS **/

export class ObserversMap<GEntries extends IGenericObserversMapEntries> {

  protected _map: Map<string, IObserver<unknown>>;

  constructor(
    entries: InferObserversMapInputEntries<GEntries>,
  ) {
    this._map = new Map<string, IObserver<unknown>>(entries);
  }

  $set<GKey extends InferObserversMapKeys<GEntries>>(
    key: GKey,
  ): IObserver<InferObserversMapValueFromKey<GEntries, GKey>> {
    const value: IObserver<unknown> | undefined = this._map.get(key);
    if (value === void 0) {
      throw createKeyDoesNotExistError(key);
    } else {
      return value as IObservable<InferObserversMapValueFromKey<GEntries, GKey>>;
    }
  }

  set<GKey extends InferObserversMapKeys<GEntries>>(
    key: GKey,
    value: InferObserversMapValueFromKey<GEntries, GKey>,
  ): void {
    this.$set(key)(value);
  }
}

/*---------------------*/

// type A = [
//   ['A', string],
//   ['b', boolean],
// ];
//
// const a = new ObserversMap<A>([
//   ['A', () => {}],
//   ['b', () => {}],
// ]);
//
// const b = a.$set('A');
