import {
  IVirtualCustomElementNodeSlotsMap,
} from '../dom-manipulation/virtual-nodes/virtual-custom-element-node/members/slots/virtual-custom-element-node-slots-map.type';
import { VirtualCustomElementNode } from '../dom-manipulation/virtual-nodes/virtual-custom-element-node/virtual-custom-element-node.class';
import { IGenericVirtualRootNode, VirtualRootNode } from '../dom-manipulation/virtual-nodes/virtual-root-node/virtual-root-node.class';
import { IComponent } from './types/component.type';
import { IComponentConfig } from './types/config/component-config.type';

/**
 * Creates "component", and appends it to "container" (usually the <body>)
 */
export function bootstrap<GConfig extends IComponentConfig>(
  component: IComponent<GConfig>,
  slots?: IVirtualCustomElementNodeSlotsMap,
  container: HTMLElement | IGenericVirtualRootNode = VirtualRootNode.body,
): VirtualCustomElementNode<GConfig> {
  const elementNode: VirtualCustomElementNode<GConfig> = component.create(slots);
  elementNode.attach(
    (container instanceof VirtualRootNode)
      ? container
      : new VirtualRootNode(container),
  );
  return elementNode;
}
