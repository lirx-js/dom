import { ITypedSourcesMapEntriesTuple } from '../../../../../../../misc/typed-sources-map/types/typed-sources-map-entries-tuple.type';

export interface IVirtualCustomElementNodeConfig {
  element?: Element;
  inputs?: ITypedSourcesMapEntriesTuple;
  outputs?: ITypedSourcesMapEntriesTuple;
}
