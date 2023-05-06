import { createNamesMismatchError } from '../errors/create-names-mismatch-error';
import {
  IVirtualCustomElementNodeSlotsMap,
} from '../../dom-manipulation/virtual-nodes/virtual-custom-element-node/members/slots/virtual-custom-element-node-slots-map.type';
import {
  IVirtualCustomElementNodeConfig,
} from '../../dom-manipulation/virtual-nodes/virtual-custom-element-node/members/config/virtual-custom-element-node-config.type';
import { VirtualCustomElementNode } from '../../dom-manipulation/virtual-nodes/virtual-custom-element-node/virtual-custom-element-node.class';
import { IComponent } from '../types/component.type';

export function createComponentReference<GConfig extends IVirtualCustomElementNodeConfig>(
  name: string,
  getComponent: () => IComponent<GConfig>,
): IComponent<GConfig> {
  return {
    name,
    create: (
      slots?: IVirtualCustomElementNodeSlotsMap,
    ): VirtualCustomElementNode<GConfig> => {
      const { name: _name, create } = getComponent();
      if (_name === name) {
        return create(slots);
      } else {
        throw createNamesMismatchError(name, _name);
      }
    },
  };
}
