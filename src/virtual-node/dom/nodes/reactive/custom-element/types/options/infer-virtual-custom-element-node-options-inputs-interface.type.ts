import { InferVirtualCustomElementNodeConfigInputs } from '../config/infer-virtual-custom-element-node-config-inputs.type';
import { IVirtualCustomElementNodeConfig } from '../config/virtual-custom-element-node-config.type';
import { PartialInterfaceIfTypedSourcesTupleIsEmpty } from '../methods/shared/partial-interface-if-typed-sources-tuple-is-empty.type';
import { InferVirtualCustomElementNodeOptionsInputs } from './infer-virtual-custom-element-node-options-inputs.type';

export type InferVirtualCustomElementNodeOptionsInputsInterface<GConfig extends IVirtualCustomElementNodeConfig> =
  PartialInterfaceIfTypedSourcesTupleIsEmpty<InferVirtualCustomElementNodeConfigInputs<GConfig>, { inputs: InferVirtualCustomElementNodeOptionsInputs<GConfig> }>
  ;
