import { getChildNodes } from '../../../../../properties/get-child-nodes';
import { IParentNode } from '../../../../../properties/get-parent-node';
import { attachParentNodeChildrenUnsafe, attachParentNodeChildrenUnsafeWithNodes } from './attach-parent-node-children-unsafe';
import { isAttachParentNodeChildrenUseful } from './is-attach-parent-node-children-useful';

export function attachParentNodeChildren(
  originNode: IParentNode,
  destinationNode: Node,
  referenceNode: Node | null,
): void {
  if (isAttachParentNodeChildrenUseful(originNode, destinationNode, referenceNode)) {
    attachParentNodeChildrenUnsafe(originNode, destinationNode, referenceNode);
  }
}

export function attachParentNodeChildrenWithNodes(
  originNode: IParentNode,
  destinationNode: Node,
  referenceNode: Node | null,
): Node[] {
  return isAttachParentNodeChildrenUseful(originNode, destinationNode, referenceNode)
    ? attachParentNodeChildrenUnsafeWithNodes(originNode, destinationNode, referenceNode)
    : getChildNodes(originNode);
}
