import { IUnsubscribe } from '@lirx/core';
import { attachManyNodes } from '../../../../move/derived/batch/attach-many-nodes';
import { detachManyNodes } from '../../../../move/derived/batch/detach-many-nodes';
import { onNodeParentChangeListener } from '../../../../move/node/on-node-parent-change-listener';
import { getNextSibling } from '../../../../properties/get-next-sibling';
import { getParentNode, IParentNode } from '../../../../properties/get-parent-node';

export function moveNodesWithReferenceNode(
  referenceNode: Node,
  listNodes: () => ArrayLike<ChildNode>,
): IUnsubscribe {
  return onNodeParentChangeListener(referenceNode)(() => {
    const parentNode: IParentNode | null = getParentNode(referenceNode);
    if (parentNode === null) {
      detachManyNodes(listNodes());
    } else {
      attachManyNodes(listNodes(), parentNode, getNextSibling(referenceNode));
    }
  });
}


// export function moveNodesWithReferenceNode(
//   referenceNode: Node,
//   listNodes: () => ArrayLike<ChildNode>,
// ): IUnsubscribe {
//   let moving: boolean = false;
//
//   const move = () => {
//     if (moving) {
//       console.warn('moving !');
//       // setTimeout(move);
//     } else {
//       moving = true;
//       const parentNode: IParentNode | null = getParentNode(referenceNode);
//       console.log('moving', referenceNode, parentNode);
//       if (parentNode === null) {
//         detachManyNodes(listNodes());
//       } else {
//         attachManyNodes(listNodes(), parentNode, getNextSibling(referenceNode));
//       }
//       moving = false;
//     }
//   };
//
//   return onNodeParentChangeListener(referenceNode)(move);
// }
