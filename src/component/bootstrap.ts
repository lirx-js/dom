import {
  IVirtualCustomElementNodeSlotsMap,
} from '../virtual-node/dom/nodes/reactive/custom-element/slots/virtual-custom-element-node-slots-map.type';
import { VirtualCustomElementNode } from '../virtual-node/dom/nodes/reactive/custom-element/virtual-custom-element-node.class';
import { VirtualRootNode } from '../virtual-node/dom/nodes/static/root/virtual-root-node.class';
import { IComponent } from './types/component.type';
import { IComponentConfig } from './types/config/component-config.type';

export function bootstrap<GConfig extends IComponentConfig>(
  component: IComponent<GConfig>,
  slots?: IVirtualCustomElementNodeSlotsMap,
): VirtualCustomElementNode<GConfig> {
  const elementNode: VirtualCustomElementNode<GConfig> = component.create(slots);
  elementNode.attach(VirtualRootNode.body);
  return elementNode;
}
