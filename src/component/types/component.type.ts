import {
  IVirtualCustomElementNodeSlotsMap,
} from '../../dom-manipulation/virtual-nodes/virtual-custom-element-node/members/slots/virtual-custom-element-node-slots-map.type';
import {
  IVirtualCustomElementNodeConfig,
} from '../../dom-manipulation/virtual-nodes/virtual-custom-element-node/members/config/virtual-custom-element-node-config.type';
import { VirtualCustomElementNode } from '../../dom-manipulation/virtual-nodes/virtual-custom-element-node/virtual-custom-element-node.class';

export interface IComponentCreateFunction<GConfig extends IVirtualCustomElementNodeConfig> {
  (
    slots?: IVirtualCustomElementNodeSlotsMap,
  ): VirtualCustomElementNode<GConfig>;
}

export interface IComponent<GConfig extends IVirtualCustomElementNodeConfig> {
  readonly name: string;
  readonly create: IComponentCreateFunction<GConfig>;
}

// export type IGenericComponent = IComponent<IVirtualCustomElementNodeConfig>;
export type IGenericComponent = IComponent<any>;

export type InferComponentGConfig<GComponent extends IGenericComponent> =
  GComponent extends IComponent<infer GConfig>
    ? GConfig
    : never;
