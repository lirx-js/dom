import {
  InferTypedSourcesMapEntriesTupleKeys,
} from '../../../../../../../../misc/typed-sources-map/types/infer-typed-sources-map-entries-tuple-keys.infer';
import { InferVirtualCustomElementNodeConfigInputs } from '../../config/infer-virtual-custom-element-node-config-inputs.type';
import { InferVirtualCustomElementNodeConfigOutputs } from '../../config/infer-virtual-custom-element-node-config-outputs.types';
import { IVirtualCustomElementNodeConfig } from '../../config/virtual-custom-element-node-config.type';

export type InferVirtualCustomElementNodeSetReactiveOutputKeys<GConfig extends IVirtualCustomElementNodeConfig> =
  | InferTypedSourcesMapEntriesTupleKeys<InferVirtualCustomElementNodeConfigInputs<GConfig>>
  | InferTypedSourcesMapEntriesTupleKeys<InferVirtualCustomElementNodeConfigOutputs<GConfig>>
  ;
