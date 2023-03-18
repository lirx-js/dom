import { IObservable, single, switchMapObservable } from '@lirx/core';
import { IVirtualNodeOrNull, VirtualNode } from '../virtual-node.class';

export function nodeHasRootParentObservable(
  node: VirtualNode,
): IObservable<boolean> {
  if (node.isConnectedRoot) {
    return single(true);
  } else {
    return switchMapObservable(node.parentNode$, (parentNode: IVirtualNodeOrNull): IObservable<boolean> => {
      if (parentNode === null) {
        return single(false);
      } else if (parentNode.isConnectedRoot) {
        return single(true);
      } else {
        return nodeHasRootParentObservable(parentNode);
      }
    });
  }
}
