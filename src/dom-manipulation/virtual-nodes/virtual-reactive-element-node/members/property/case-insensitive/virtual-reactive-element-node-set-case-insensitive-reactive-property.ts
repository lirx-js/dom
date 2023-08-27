import { IObservable } from '@lirx/core';
import { IUnsubscribe } from '@lirx/unsubscribe';
import { VirtualReactiveElementNode } from '../../../virtual-reactive-element-node.class';
import {
  getCaseInsensitivePropertyKeyOfVirtualReactiveElementNode,
} from './get-case-insensitive-property-key-of-virtual-reactive-element-node';
import {
  InferCaseInsensitivePropertyKeyOfVirtualReactiveElementNode,
} from './infer-case-insensitive-property-key-of-virtual-reactive-element-node.type';
import {
  InferVirtualElementNodeSetCaseInsensitivePropertyValue,
} from './infer-virtual-element-node-set-case-insensitive-property-value.type';

export function virtualReactiveElementNodeSetCaseInsensitiveReactiveProperty<GElementNode extends Element, GCaseInsensitiveKey extends string>(
  node: VirtualReactiveElementNode<GElementNode>,
  propertyKey: GCaseInsensitiveKey,
  value$: IObservable<InferVirtualElementNodeSetCaseInsensitivePropertyValue<GElementNode, GCaseInsensitiveKey>>,
): IUnsubscribe {
  type GKey = Extract<InferCaseInsensitivePropertyKeyOfVirtualReactiveElementNode<GElementNode, GCaseInsensitiveKey>, keyof GElementNode>;
  return node.setReactiveProperty<GKey>(
    getCaseInsensitivePropertyKeyOfVirtualReactiveElementNode<GElementNode, GCaseInsensitiveKey>(node, propertyKey) as GKey,
    value$ as unknown as IObservable<GElementNode[GKey]>,
  );
}
