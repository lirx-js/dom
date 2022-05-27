import { IParentNode } from '../../../../../properties/get-parent-node';

/**
 * Returns true if attaching the nodes of 'originNode' into 'destinationNode' is useful
 */
export function isAttachParentNodeChildrenUseful(
  originNode: IParentNode,
  destinationNode: Node,
  referenceNode: Node | null,
): boolean {
  return (originNode !== destinationNode);
}

