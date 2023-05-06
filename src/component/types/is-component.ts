import {
  IVirtualCustomElementNodeConfig,
} from '../../dom-manipulation/virtual-nodes/virtual-custom-element-node/members/config/virtual-custom-element-node-config.type';
import { IComponent } from './component.type';

export function isComponent<GConfig extends IVirtualCustomElementNodeConfig>(
  value: unknown,
): value is IComponent<GConfig> {
  return (typeof value === 'object')
    && (value !== null)
    // @ts-ignore
    && (typeof value['name'] === 'string')
    // @ts-ignore
    && (typeof value['create'] === 'function')
    ;
}
