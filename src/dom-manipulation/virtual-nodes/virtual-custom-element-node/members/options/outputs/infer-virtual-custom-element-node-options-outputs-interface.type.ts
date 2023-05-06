import { InferVirtualCustomElementNodeConfigOutputs } from '../../config/outputs/infer-virtual-custom-element-node-config-outputs.type';
import { IVirtualCustomElementNodeConfig } from '../../config/virtual-custom-element-node-config.type';
import { PartialInterfaceIfTupleIsEmpty } from '../../../../../../misc/types/partial-interface-if-tuple-is-empty.type';
import { InferVirtualCustomElementNodeOptionsOutputs } from './infer-virtual-custom-element-node-options-outputs.type';

export type InferVirtualCustomElementNodeOptionsOutputsInterface<GConfig extends IVirtualCustomElementNodeConfig> =
  PartialInterfaceIfTupleIsEmpty<InferVirtualCustomElementNodeConfigOutputs<GConfig>, {
    outputs: InferVirtualCustomElementNodeOptionsOutputs<GConfig>
  }>
  ;
