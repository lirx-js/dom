import {
  IVirtualCustomElementNodeSlotsMap,
} from '../../../dom-manipulation/virtual-nodes/virtual-custom-element-node/members/slots/virtual-custom-element-node-slots-map.type';
import {
  IVirtualCustomElementNodeOptions,
} from '../../../dom-manipulation/virtual-nodes/virtual-custom-element-node/members/options/virtual-custom-element-node-options.type';
import { VirtualCustomElementNode } from '../../../dom-manipulation/virtual-nodes/virtual-custom-element-node/virtual-custom-element-node.class';
import { IComponent, IComponentCreateFunction } from '../../types/component.type';
import { IComponentConfig } from '../../types/config/component-config.type';
import { ICreateComponentOptions } from '../../types/options/create-component-options.type';
import { resolveCreateShadowComponent } from './functions/resolve-create-shadow-component';

export function createShadowComponent<GConfig extends IComponentConfig>(
  {
    name,
    ...options
  }: ICreateComponentOptions<GConfig>,
): IComponent<GConfig> {

  const create: IComponentCreateFunction<GConfig> = (
    slots: IVirtualCustomElementNodeSlotsMap = new Map(),
  ): VirtualCustomElementNode<GConfig> => {

    const node = new VirtualCustomElementNode<GConfig>({
      ...options,
      name,
      slots,
    } as IVirtualCustomElementNodeOptions<GConfig>);

    resolveCreateShadowComponent({
      ...options,
      node,
      slots,
    });

    return node;
  };

  return {
    name,
    create,
  };
}
