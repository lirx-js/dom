import { InferVirtualCustomElementNodeConfigInputs } from '../../config/inputs/infer-virtual-custom-element-node-config-inputs.type';
import { IVirtualCustomElementNodeConfig } from '../../config/virtual-custom-element-node-config.type';
import { PartialInterfaceIfTupleIsEmpty } from '../../../../../../misc/types/partial-interface-if-tuple-is-empty.type';
import { InferVirtualCustomElementNodeOptionsInputs } from './infer-virtual-custom-element-node-options-inputs.type';

export type InferVirtualCustomElementNodeOptionsInputsInterface<GConfig extends IVirtualCustomElementNodeConfig> =
  PartialInterfaceIfTupleIsEmpty<InferVirtualCustomElementNodeConfigInputs<GConfig>, {
    inputs: InferVirtualCustomElementNodeOptionsInputs<GConfig>
  }>
  ;
