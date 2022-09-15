import {
  IVirtualCustomElementNodeConfig,
} from '../../../virtual-node/dom/nodes/reactive/custom-element/types/config/virtual-custom-element-node-config.type';

export interface IComponentConfig extends IVirtualCustomElementNodeConfig {
  data?: object;
}
