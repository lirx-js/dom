import {
  InferTypedSourcesMapEntriesTupleValueFromKey,
} from '../../../../../../../../misc/typed-sources-map/types/infer-typed-sources-map-entries-tuple-value-from-key.infer';
import { InferVirtualCustomElementNodeConfigInputs } from '../../config/infer-virtual-custom-element-node-config-inputs.type';
import { IVirtualCustomElementNodeConfig } from '../../config/virtual-custom-element-node-config.type';
import { InferVirtualCustomElementNodeSetReactiveInputKeys } from './infer-virtual-custom-element-node-set-reactive-input-keys.type';

export type InferVirtualCustomElementNodeSetReactiveInputValueFromKey<// generics
  GConfig extends IVirtualCustomElementNodeConfig,
  GKey extends InferVirtualCustomElementNodeSetReactiveInputKeys<GConfig>
  //
  > =
  InferTypedSourcesMapEntriesTupleValueFromKey<InferVirtualCustomElementNodeConfigInputs<GConfig>, GKey>
  ;
