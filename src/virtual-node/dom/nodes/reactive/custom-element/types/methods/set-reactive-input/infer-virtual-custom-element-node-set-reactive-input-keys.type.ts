import {
  InferTypedSourcesMapEntriesTupleKeys,
} from '../../../../../../../../misc/typed-sources-map/types/infer-typed-sources-map-entries-tuple-keys.infer';
import { InferVirtualCustomElementNodeConfigInputs } from '../../config/infer-virtual-custom-element-node-config-inputs.type';
import { IVirtualCustomElementNodeConfig } from '../../config/virtual-custom-element-node-config.type';

export type InferVirtualCustomElementNodeSetReactiveInputKeys<GConfig extends IVirtualCustomElementNodeConfig> =
  InferTypedSourcesMapEntriesTupleKeys<InferVirtualCustomElementNodeConfigInputs<GConfig>>
  ;
