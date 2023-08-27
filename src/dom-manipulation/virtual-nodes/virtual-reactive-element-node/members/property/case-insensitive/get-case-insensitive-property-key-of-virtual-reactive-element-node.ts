import { VirtualReactiveElementNode } from '../../../virtual-reactive-element-node.class';
import {
  getCaseInsensitivePropertyKeyMapOfVirtualReactiveElementNode,
} from './get-case-insensitive-property-key-map-of-virtual-reactive-element-node';
import {
  InferCaseInsensitivePropertyKeyOfVirtualReactiveElementNode,
} from './infer-case-insensitive-property-key-of-virtual-reactive-element-node.type';

export function getCaseInsensitivePropertyKeyOfVirtualReactiveElementNode<GElementNode extends Element, GCaseInsensitiveKey extends string>(
  node: VirtualReactiveElementNode<GElementNode>,
  key: GCaseInsensitiveKey,
): InferCaseInsensitivePropertyKeyOfVirtualReactiveElementNode<GElementNode, GCaseInsensitiveKey> {
  return getCaseInsensitivePropertyKeyMapOfVirtualReactiveElementNode<GElementNode>(node).get<GCaseInsensitiveKey>(key);
}
