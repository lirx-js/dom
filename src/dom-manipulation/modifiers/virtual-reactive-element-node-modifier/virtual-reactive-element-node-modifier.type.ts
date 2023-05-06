import {
  IGenericVirtualReactiveElementNode,
} from '../../virtual-nodes/virtual-reactive-element-node/generic-virtual-reactive-element-node.type';
import { VirtualDOMNode } from '../../virtual-nodes/virtual-dom-node/virtual-dom-node.class';

export interface IVirtualReactiveElementNodeModifierFunction<GValue, GNode extends VirtualDOMNode> {
  (
    node: IGenericVirtualReactiveElementNode,
    value: GValue,
  ): GNode;
}
