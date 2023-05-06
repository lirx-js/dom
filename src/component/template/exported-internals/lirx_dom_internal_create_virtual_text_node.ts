import { VirtualTextNode } from '../../../dom-manipulation/virtual-nodes/virtual-text-node/virtual-text-node';

/**
 * @deprecated
 * @internal
 */
export function lirx_dom_internal_create_virtual_text_node(
  value?: string,
): VirtualTextNode {
  return new VirtualTextNode(value);
}


