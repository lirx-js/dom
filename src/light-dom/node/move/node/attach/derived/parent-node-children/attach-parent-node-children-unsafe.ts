import { getFirstChild } from '../../../../../properties/get-first-child';
import { IParentNode } from '../../../../../properties/get-parent-node';
import { dispatchNodePositionChange } from '../../../on-node-position-change-listener';
import { attachNodeRaw } from '../../attach-node-raw';

/**
 * Moves children of originNode into destinationNode
 */
export function attachParentNodeChildrenUnsafe(
  originNode: IParentNode,
  destinationNode: Node,
  referenceNode: Node | null,
): void {
  let firstChild: ChildNode | null;
  while ((firstChild = getFirstChild(originNode)) !== null) {
    attachNodeRaw(firstChild, destinationNode, referenceNode);
    dispatchNodePositionChange(firstChild, originNode);
  }
}

export function attachParentNodeChildrenUnsafeWithNodes(
  fragment: IParentNode,
  parentNode: Node,
  referenceNode: Node | null,
): Node[] {
  const nodes: Node[] = [];

  let firstChild: ChildNode | null;
  while ((firstChild = getFirstChild(fragment)) !== null) {
    nodes.push(firstChild);
    attachNodeRaw(firstChild, parentNode, referenceNode);
    dispatchNodePositionChange(firstChild, fragment);
  }

  return nodes;
}

