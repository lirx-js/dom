import {
  IVirtualCustomElementNodeConfig,
} from '../../virtual-node/dom/nodes/reactive/custom-element/types/config/virtual-custom-element-node-config.type';
import { IComponent } from './component.type';

export function isComponent<GConfig extends IVirtualCustomElementNodeConfig>(
  value: unknown,
): value is IComponent<GConfig> {
  return (typeof value === 'object')
    && (value !== null)
    && (typeof value['name'] === 'string')
    && (typeof value['create'] === 'function')
    ;
}
