import { attachParentNodeChildrenWithNodes } from '../../move/node/attach/derived/parent-node-children/attach-parent-node-children';
import { getNextSibling } from '../../properties/get-next-sibling';
import { getParentNode, IParentNode } from '../../properties/get-parent-node';
import { createReferenceNode } from '../reference-node/create-reference-node';
import {
  attachOptionalDocumentFragmentToReferenceNode
} from '../reference-node/functions/attach/attach-optional-document-fragment-to-reference-node';
import { moveNodesWithReferenceNode } from '../reference-node/functions/move/move-nodes-with-reference-node';
import { IReferenceNodeChildren } from '../reference-node/reference-node-children.type';
import { IReferenceNode } from '../reference-node/reference-node.type';
import { IVirtualNode } from './virtual-node.type';

export function createVirtualNode(
  name: string,
  transparent?: boolean,
): IVirtualNode {
  throw new Error('TODO'); // TODO
  // const referenceNode: IReferenceNode = createReferenceNode(name, transparent);
  // let _childNodes: readonly ChildNode[] = [];
  //
  // moveNodesWithReferenceNode(
  //   referenceNode,
  //   () => _childNodes,
  // );
  //
  // const setChildNodes = (
  //   childNodes: readonly ChildNode[],
  // ) => {
  //   // _childNodes = childNodes;
  //
  //   // attachParentNodeChildrenWithNodes(
  //   //   fragment,
  //   //   getParentNode(referenceNode) as IParentNode,
  //   //   getNextSibling(referenceNode),
  //   // ) as unknown as IReferenceNodeChildren
  //
  //   _childNodes = attachOptionalDocumentFragmentToReferenceNode(
  //     fragment,
  //     referenceNode,
  //   );
  // };
  //
  // const getChildNodes = (): readonly ChildNode[] => {
  //   return _childNodes;
  // };
  //
  // return {
  //   referenceNode,
  //   setChildNodes,
  //   getChildNodes,
  // };
}

