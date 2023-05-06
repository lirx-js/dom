import { VirtualElementNode } from '../../../virtual-element-node.class';
import { getCaseInsensitiveVirtualElementNodePropertyKey } from './get-case-insensitive-virtual-element-node-property-key';
import {
  InferVirtualElementNodeSetCaseInsensitivePropertyValue,
} from './infer-virtual-element-node-set-case-insensitive-property-value.type';

/**
 * Same as VirtualElementNode.setProperty, however, "key" is case-insensitive.
 * @see VirtualElementNode.setProperty
 */
export function virtualElementNodeSetCaseInsensitiveProperty<GElementNode extends Element, GPropertyKey extends string>(
  node: VirtualElementNode<GElementNode>,
  propertyKey: GPropertyKey,
  value: InferVirtualElementNodeSetCaseInsensitivePropertyValue<GElementNode, GPropertyKey>,
): void {
  node.setProperty(
    getCaseInsensitiveVirtualElementNodePropertyKey<GElementNode, GPropertyKey>(
      node,
      propertyKey,
    ),
    value as any,
  );
}

