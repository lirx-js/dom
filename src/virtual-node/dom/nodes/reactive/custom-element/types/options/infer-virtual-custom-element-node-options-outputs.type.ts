import {
  ITypedSourcesMapEntriesTupleToKeysTuple,
} from '../../../../../../../misc/typed-sources-map/types/typed-sources-map-entries-tuple-to-keys-tuple.infer';
import { InferVirtualCustomElementNodeConfigOutputs } from '../config/infer-virtual-custom-element-node-config-outputs.types';
import { IVirtualCustomElementNodeConfig } from '../config/virtual-custom-element-node-config.type';

export type InferVirtualCustomElementNodeOptionsOutputs<GConfig extends IVirtualCustomElementNodeConfig> =
  ITypedSourcesMapEntriesTupleToKeysTuple<InferVirtualCustomElementNodeConfigOutputs<GConfig>>;
