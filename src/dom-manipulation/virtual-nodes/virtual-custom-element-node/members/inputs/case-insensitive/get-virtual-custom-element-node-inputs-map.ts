import { IGenericVirtualCustomElementNode } from '../../../generic-virtual-custom-element-node.type';
import { IVirtualCustomElementNodeInputsMap } from '../create-virtual-custom-element-node-inputs-map';

export function getVirtualCustomElementNodeInputsMap(
  node: IGenericVirtualCustomElementNode,
): IVirtualCustomElementNodeInputsMap {
  return (node as any)._inputsMap as IVirtualCustomElementNodeInputsMap;
}
