import { IVirtualCustomElementNodeSlotsMap } from '../slots/virtual-custom-element-node-slots-map.type';
import { IVirtualCustomElementNodeConfig } from '../config/virtual-custom-element-node-config.type';
import { InferVirtualCustomElementNodeOptionsInputsInterface } from './inputs/infer-virtual-custom-element-node-options-inputs-interface.type';
import { InferVirtualCustomElementNodeOptionsOutputsInterface } from './outputs/infer-virtual-custom-element-node-options-outputs-interface.type';

export type IVirtualCustomElementNodeOptions<GConfig extends IVirtualCustomElementNodeConfig> = {
    name: string;
    extends?: string;
    namespaceURI?: string,
    slots: IVirtualCustomElementNodeSlotsMap;
  }
  & InferVirtualCustomElementNodeOptionsInputsInterface<GConfig>
  & InferVirtualCustomElementNodeOptionsOutputsInterface<GConfig>
  ;
