import {
  IVirtualCustomElementNodeSlotsMap,
} from '../virtual-node/dom/nodes/reactive/custom-element/slots/virtual-custom-element-node-slots-map.type';
import { VirtualCustomElementNode } from '../virtual-node/dom/nodes/reactive/custom-element/virtual-custom-element-node.class';
import { IGenericVirtualRootNode, VirtualRootNode } from '../virtual-node/dom/nodes/static/root/virtual-root-node.class';
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
