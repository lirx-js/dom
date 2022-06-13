import { ITypedSourcesMapEntriesTuple } from '../../../../../../../../misc/typed-sources-map/types/typed-sources-map-entries-tuple.type';

export type PartialInterfaceIfTypedSourcesTupleIsEmpty<GTypedSourcesTuple extends ITypedSourcesMapEntriesTuple, GInterface> =
  GTypedSourcesTuple extends []
    ? Partial<GInterface>
    : GInterface
  ;
