import { VirtualDOMNode } from '../../virtual-nodes/virtual-dom-node/virtual-dom-node.class';
import { IVirtualDOMNodeModifier, IVirtualDOMNodeModifierFunction } from './virtual-dom-node-modifier.type';

export interface ICreateVirtualDOMNodeModifierOptions {
  weight?: number;
}

export function createVirtualDOMNodeModifier<GValue, GNode extends VirtualDOMNode>(
  name: string,
  apply: IVirtualDOMNodeModifierFunction<GValue, GNode>,
  {
    weight = 0,
  }: ICreateVirtualDOMNodeModifierOptions = {},
): IVirtualDOMNodeModifier<GValue, GNode> {
  return {
    name,
    apply,
    weight,
  };
}
