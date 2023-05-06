import {
  IGenericVirtualDOMNodeModifier,
  IVirtualDOMNodeModifierFunction,
} from '../../dom-manipulation/modifiers/virtual-dom-node-modifier/virtual-dom-node-modifier.type';
import { VirtualDOMNode } from '../../dom-manipulation/virtual-nodes/virtual-dom-node/virtual-dom-node.class';

export type INodeModifierList = readonly IGenericVirtualDOMNodeModifier[];

export interface IApplyNodeModifierFunction<GValue, GNode extends VirtualDOMNode> {
  (
    name: string,
    ...args: Parameters<IVirtualDOMNodeModifierFunction<GValue, GNode>>
  ): ReturnType<IVirtualDOMNodeModifierFunction<GValue, GNode>>;
}

export function generateApplyNodeModifierFunction<GValue, GNode extends VirtualDOMNode>(
  modifiers: INodeModifierList = [],
): IApplyNodeModifierFunction<GValue, GNode> {
  const modifiersElementsMap = new Map<string, IGenericVirtualDOMNodeModifier>(
    modifiers.map((modifier: IGenericVirtualDOMNodeModifier): [string, IGenericVirtualDOMNodeModifier] => {
      return [modifier.name, modifier];
    }),
  );

  return (
    name: string,
    ...args: Parameters<IVirtualDOMNodeModifierFunction<GValue, GNode>>
  ): ReturnType<IVirtualDOMNodeModifierFunction<GValue, GNode>> => {
    if (modifiersElementsMap.has(name)) {
      return modifiersElementsMap.get(name)!.apply(...args);
    } else {
      throw new Error(`Missing import of modifier '${name}'`);
    }
  };
}
