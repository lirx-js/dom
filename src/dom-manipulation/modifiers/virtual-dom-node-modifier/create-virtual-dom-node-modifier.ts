import { VirtualDOMNode } from '../../virtual-nodes/virtual-dom-node/virtual-dom-node.class';
import { IVirtualDOMNodeModifier, IVirtualDOMNodeModifierFunction } from './virtual-dom-node-modifier.type';

export function createVirtualDOMNodeModifier<GValue, GNode extends VirtualDOMNode>(
  name: string,
  apply: IVirtualDOMNodeModifierFunction<GValue, GNode>,
): IVirtualDOMNodeModifier<GValue, GNode> {
  return {
    name,
    apply,
  };
}
