import { ITypedSourcesMapEntriesTuple } from '../../types/typed-sources-map-entries-tuple.type';

export interface ITypedSourcesMapEntriesFunction<GTypedSourcesTuple extends ITypedSourcesMapEntriesTuple> {
  // (): Iterable<[InferTypedSourcesMapEntriesTupleKeys<GTypedSourcesTuple>, InferTypedSourcesMapEntriesTupleValues<GTypedSourcesTuple>]>;
  (): Iterable<[key: unknown, value: unknown]>;
}
