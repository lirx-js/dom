import { IVirtualCustomElementNodeSlotsMap } from '../../slots/virtual-custom-element-node-slots-map.type';
import { IVirtualCustomElementNodeConfig } from '../config/virtual-custom-element-node-config.type';
import { InferVirtualCustomElementNodeOptionsInputsInterface } from './infer-virtual-custom-element-node-options-inputs-interface.type';
import { InferVirtualCustomElementNodeOptionsOutputsInterface } from './infer-virtual-custom-element-node-options-outputs-interface.type';

export type IVirtualCustomElementNodeOptions<GConfig extends IVirtualCustomElementNodeConfig> = {
    name: string;
    extends?: string;
    slots: IVirtualCustomElementNodeSlotsMap;
  }
  & InferVirtualCustomElementNodeOptionsInputsInterface<GConfig>
  & InferVirtualCustomElementNodeOptionsOutputsInterface<GConfig>
  ;
