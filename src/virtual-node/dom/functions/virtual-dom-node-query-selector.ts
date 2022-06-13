import { isElementNode } from '../../../misc/dom/is/is-element-node';
import { VirtualDOMNode } from '../virtual-dom-node.class';
import { getLinkedVirtualDOMNodeOfDOMNodeOrThrow } from './link/link-dom-node-with-virtual-dom-node';

export function virtualDOMNodeQuerySelectorElement<GElement extends HTMLElement>(
  node: VirtualDOMNode,
  selector: string,
): GElement | null {
  const selfDOMNodes: readonly Node[] = node.getSelfDOMNodes();
  for (let i = 0, l = selfDOMNodes.length; i < l; i++) {
    const selfDOMNode: Node = selfDOMNodes[i];
    if (isElementNode(selfDOMNode)) {
      const selectedDOMNode: GElement | null = selfDOMNode.querySelector<GElement>(selector);
      if (selectedDOMNode !== null) {
        return selectedDOMNode;
      }
    }
  }
  return null;
}

export function virtualDOMNodeQuerySelectorElementOrThrow<GElement extends HTMLElement>(
  node: VirtualDOMNode,
  selector: string,
): GElement {
  const selectedDOMNode: GElement | null = virtualDOMNodeQuerySelectorElement<GElement>(node, selector);
  if (selectedDOMNode === null) {
    throw new Error(`Failed to select element`);
  } else {
    return selectedDOMNode;
  }
}

/*----------*/

export function virtualDOMNodeQuerySelector<GNode extends VirtualDOMNode>(
  node: VirtualDOMNode,
  selector: string,
): GNode | null {
  const element: HTMLElement | null = virtualDOMNodeQuerySelectorElement(node, selector);
  return (element === null)
    ? null
    : getLinkedVirtualDOMNodeOfDOMNodeOrThrow(element) as GNode;
}

export function virtualDOMNodeQuerySelectorOrThrow<GNode extends VirtualDOMNode>(
  node: VirtualDOMNode,
  selector: string,
): GNode {
  const selectedNode: GNode | null = virtualDOMNodeQuerySelector<GNode>(node, selector);
  if (selectedNode === null) {
    throw new Error(`Failed to select element`);
  } else {
    return selectedNode;
  }
}
