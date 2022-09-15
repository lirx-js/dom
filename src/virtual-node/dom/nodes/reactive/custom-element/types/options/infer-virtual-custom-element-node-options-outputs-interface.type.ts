import { InferVirtualCustomElementNodeConfigOutputs } from '../config/infer-virtual-custom-element-node-config-outputs.types';
import { IVirtualCustomElementNodeConfig } from '../config/virtual-custom-element-node-config.type';
import { PartialInterfaceIfTypedSourcesTupleIsEmpty } from '../methods/shared/partial-interface-if-typed-sources-tuple-is-empty.type';
import { InferVirtualCustomElementNodeOptionsOutputs } from './infer-virtual-custom-element-node-options-outputs.type';

export type InferVirtualCustomElementNodeOptionsOutputsInterface<GConfig extends IVirtualCustomElementNodeConfig> =
  PartialInterfaceIfTypedSourcesTupleIsEmpty<InferVirtualCustomElementNodeConfigOutputs<GConfig>, { outputs: InferVirtualCustomElementNodeOptionsOutputs<GConfig> }>
  ;
