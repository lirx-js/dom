import { ITypedSourcesMapEntriesTuple } from '../../../../../../../misc/typed-sources-map/types/typed-sources-map-entries-tuple.type';

export interface IVirtualCustomElementNodeConfig {
  element?: HTMLElement;
  inputs?: ITypedSourcesMapEntriesTuple;
  outputs?: ITypedSourcesMapEntriesTuple;
}
