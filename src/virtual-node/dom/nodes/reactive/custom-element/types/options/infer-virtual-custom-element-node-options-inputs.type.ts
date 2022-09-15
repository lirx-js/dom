import {
  ITypedSourcesMapEntriesTupleToEntriesTuple,
} from '../../../../../../../misc/typed-sources-map/types/typed-sources-map-entries-tuple-to-entries-tuple.infer';
import { InferVirtualCustomElementNodeConfigInputs } from '../config/infer-virtual-custom-element-node-config-inputs.type';
import { IVirtualCustomElementNodeConfig } from '../config/virtual-custom-element-node-config.type';

export type InferVirtualCustomElementNodeOptionsInputs<GConfig extends IVirtualCustomElementNodeConfig> =
  ITypedSourcesMapEntriesTupleToEntriesTuple<InferVirtualCustomElementNodeConfigInputs<GConfig>>;
