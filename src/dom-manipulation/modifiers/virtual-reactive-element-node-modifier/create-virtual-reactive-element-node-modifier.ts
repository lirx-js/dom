import { VirtualReactiveElementNode } from '../../virtual-nodes/virtual-reactive-element-node/virtual-reactive-element-node.class';
import { VirtualDOMNode } from '../../virtual-nodes/virtual-dom-node/virtual-dom-node.class';
import { createVirtualDOMNodeModifier } from '../virtual-dom-node-modifier/create-virtual-dom-node-modifier';
import { IVirtualDOMNodeModifier } from '../virtual-dom-node-modifier/virtual-dom-node-modifier.type';
import { IVirtualReactiveElementNodeModifierFunction } from './virtual-reactive-element-node-modifier.type';

export function createVirtualReactiveElementNodeModifier<GValue, GNode extends VirtualDOMNode>(
  name: string,
  apply: IVirtualReactiveElementNodeModifierFunction<GValue, GNode>,
): IVirtualDOMNodeModifier<GValue, GNode> {
  return createVirtualDOMNodeModifier<GValue, GNode>(name, (node: VirtualDOMNode, value: GValue): GNode => {
    if (node instanceof VirtualReactiveElementNode) {
      return apply(node, value);
    } else {
      throw new Error(`Not a VirtualReactiveElementNode`);
    }
  });
}

