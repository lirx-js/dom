import { IObservable, readObservableValue } from '@lirx/core';
import { createKeyDoesNotExistError } from './create-key-does-not-exist-error';

/** TYPES **/

export type IObservablesMapEntry<GKey extends string, GValue> = [
  key: GKey,
  value: GValue,
];

export type IGenericObservablesMapEntry = IObservablesMapEntry<any, any>;

export type IGenericObservablesMapEntries = readonly IGenericObservablesMapEntry[];

export type InferObservablesMapKeys<GEntries extends IGenericObservablesMapEntries> = {
  [Key in keyof GEntries]: GEntries[Key][0];
}[number];

export type InferObservablesMapValueFromKey<GEntries extends IGenericObservablesMapEntries, GKey extends string> = {
  [Key in keyof GEntries]: GEntries[Key][0] extends GKey
    ? GEntries[Key][1]
    : never;
}[number];

export type InferObservablesMapInputEntries<GEntries extends IGenericObservablesMapEntries> = {
  readonly [Key in keyof GEntries]: [GEntries[Key][0], IObservable<GEntries[Key][1]>];
};

/** CLASS **/

export class ObservablesMap<GEntries extends IGenericObservablesMapEntries> {

  protected _map: Map<string, IObservable<unknown>>;

  constructor(
    entries: InferObservablesMapInputEntries<GEntries>,
  ) {
    this._map = new Map<string, IObservable<unknown>>(entries);
  }

  get$<GKey extends InferObservablesMapKeys<GEntries>>(
    key: GKey,
  ): IObservable<InferObservablesMapValueFromKey<GEntries, GKey>> {
    const value: IObservable<unknown> | undefined = this._map.get(key);
    if (value === void 0) {
      throw createKeyDoesNotExistError(key);
    } else {
      return value as IObservable<InferObservablesMapValueFromKey<GEntries, GKey>>;
    }
  }

  get<GKey extends InferObservablesMapKeys<GEntries>>(
    key: GKey,
  ): InferObservablesMapValueFromKey<GEntries, GKey> {
    return readObservableValue(this.get$(key), (): never => {
      throw new Error(`Unable to read input: ${key}`);
    });
  }
}

/*---------------------*/


/*---------------------*/

// type A = [
//   ['A', string],
//   ['b', boolean],
// ];
//
// const a = new ObservablesMap<A>([
//   ['A', single('0')],
//   ['b', single(false)],
// ]);
//
// const b = a.get$('A');
