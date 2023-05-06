import { IObservable } from '@lirx/core';
import { VirtualReactiveTextNode } from '../../../dom-manipulation/virtual-nodes/virtual-reactive-text-node/virtual-reactive-text-node.class';
import { VirtualTextNode } from '../../../dom-manipulation/virtual-nodes/virtual-text-node/virtual-text-node';

/**
 * @deprecated
 * @internal
 */
export function lirx_dom_internal_create_virtual_reactive_text_node(
  value$: IObservable<string>,
): VirtualTextNode {
  return new VirtualReactiveTextNode(value$);
}
