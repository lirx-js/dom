import { ITypedSourcesMapEntriesTuple } from '../../../../../../../misc/typed-sources-map/types/typed-sources-map-entries-tuple.type';
import { IVirtualCustomElementNodeConfig } from './virtual-custom-element-node-config.type';

export type InferVirtualCustomElementNodeConfigInputs<GConfig extends IVirtualCustomElementNodeConfig> =
  GConfig['inputs'] extends ITypedSourcesMapEntriesTuple
    ? GConfig['inputs']
    : [];
