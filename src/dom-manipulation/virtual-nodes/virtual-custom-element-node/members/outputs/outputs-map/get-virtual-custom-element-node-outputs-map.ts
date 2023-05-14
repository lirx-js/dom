import { IGenericVirtualCustomElementNode } from '../../../generic-virtual-custom-element-node.type';
import { IVirtualCustomElementNodeOutputsMap } from './create-virtual-custom-element-node-outputs-map';

export function getVirtualCustomElementNodeOutputsMap(
  node: IGenericVirtualCustomElementNode,
): IVirtualCustomElementNodeOutputsMap {
  return (node as any)._outputsMap as IVirtualCustomElementNodeOutputsMap;
}
