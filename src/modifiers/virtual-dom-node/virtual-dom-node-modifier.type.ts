import { VirtualDOMNode } from '../../virtual-node/dom/virtual-dom-node.class';

export interface IVirtualDOMNodeModifierFunction<GValue, GNode extends VirtualDOMNode> {
  (
    node: VirtualDOMNode,
    value: GValue,
  ): GNode;
}

export interface IVirtualDOMNodeModifier<GValue, GNode extends VirtualDOMNode> {
  readonly name: string;
  readonly apply: IVirtualDOMNodeModifierFunction<GValue, GNode>;
}

export type IGenericVirtualDOMNodeModifier = IVirtualDOMNodeModifier<any, any>;
