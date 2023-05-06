import {
  IVirtualCustomElementNodeConfig,
} from '../../../dom-manipulation/virtual-nodes/virtual-custom-element-node/members/config/virtual-custom-element-node-config.type';

export interface IComponentConfig extends IVirtualCustomElementNodeConfig {
  data?: object;
}
