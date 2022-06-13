import { VirtualContainerNode } from '../dom/nodes/static/container/virtual-container-node.class';
import { VirtualDOMNode } from '../dom/virtual-dom-node.class';

export function applyTemplateForVirtualDOMNode<GArguments extends any[]>(
  parentNode: VirtualDOMNode,
  template: (parentNode: VirtualDOMNode, ...args: GArguments) => void,
  args: GArguments,
): void {
  const container: VirtualContainerNode = new VirtualContainerNode();
  template(container, ...args);
  container.attach(parentNode);
}

