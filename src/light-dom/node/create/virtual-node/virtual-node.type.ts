import { IReferenceNode } from '../reference-node/reference-node.type';


export interface IVirtualNodeSetChildNodes {
 (
   childNodes: readonly Node[],
 ): void;
}

export interface IVirtualNodeGetChildNodes {
  (): readonly Node[];
}


export interface IVirtualNode {
  readonly referenceNode: IReferenceNode;
  readonly setChildNodes: IVirtualNodeSetChildNodes;
  readonly getChildNodes: IVirtualNodeGetChildNodes;
}
