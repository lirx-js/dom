import {
  InferTypedSourcesMapEntriesTupleKeys,
} from '../../../../../../../../misc/typed-sources-map/types/infer-typed-sources-map-entries-tuple-keys.infer';
import {
  InferTypedSourcesMapEntriesTupleValueFromKey,
} from '../../../../../../../../misc/typed-sources-map/types/infer-typed-sources-map-entries-tuple-value-from-key.infer';
import { InferVirtualCustomElementNodeConfigInputs } from '../../config/infer-virtual-custom-element-node-config-inputs.type';
import { InferVirtualCustomElementNodeConfigOutputs } from '../../config/infer-virtual-custom-element-node-config-outputs.types';
import { IVirtualCustomElementNodeConfig } from '../../config/virtual-custom-element-node-config.type';
import {
  InferVirtualCustomElementNodeSetReactiveInputKeys,
} from '../set-reactive-input/infer-virtual-custom-element-node-set-reactive-input-keys.type';

export type InferVirtualCustomElementNodeSetReactiveOutputValueFromKey<// generics
  GConfig extends IVirtualCustomElementNodeConfig,
  GKey extends InferVirtualCustomElementNodeSetReactiveInputKeys<GConfig>
  //
  > =
  GKey extends InferTypedSourcesMapEntriesTupleKeys<InferVirtualCustomElementNodeConfigInputs<GConfig>>
    ? InferTypedSourcesMapEntriesTupleValueFromKey<InferVirtualCustomElementNodeConfigInputs<GConfig>, GKey>
    : InferTypedSourcesMapEntriesTupleValueFromKey<InferVirtualCustomElementNodeConfigOutputs<GConfig>, GKey>
  ;
