import { attachParentNodeChildrenWithNodes } from '../../../../move/node/attach/derived/parent-node-children/attach-parent-node-children';
import { getNextSibling } from '../../../../properties/get-next-sibling';
import { getParentNode, IParentNode } from '../../../../properties/get-parent-node';
import { IReferenceNodeChildren } from '../../reference-node-children.type';
import { IReferenceNode } from '../../reference-node.type';

export function attachDocumentFragmentToReferenceNode(
  fragment: DocumentFragment,
  referenceNode: IReferenceNode,
): IReferenceNodeChildren {
  return attachParentNodeChildrenWithNodes(
    fragment,
    getParentNode(referenceNode) as IParentNode,
    getNextSibling(referenceNode),
  ) as unknown as IReferenceNodeChildren;
}
