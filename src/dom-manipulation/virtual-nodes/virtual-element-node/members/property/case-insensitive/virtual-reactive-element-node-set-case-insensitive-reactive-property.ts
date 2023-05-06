import { IObservable } from '@lirx/core';
import { IUnsubscribe } from '@lirx/utils';
import { VirtualReactiveElementNode } from '../../../../virtual-reactive-element-node/virtual-reactive-element-node.class';
import {
  InferVirtualElementNodeSetCaseInsensitivePropertyValue,
} from './infer-virtual-element-node-set-case-insensitive-property-value.type';
import { virtualElementNodeSetCaseInsensitiveProperty } from './virtual-element-node-set-case-insensitive-property';

export function virtualReactiveElementNodeSetCaseInsensitiveReactiveProperty<GElementNode extends Element, GPropertyKey extends string>(
  node: VirtualReactiveElementNode<GElementNode>,
  propertyKey: GPropertyKey,
  value$: IObservable<InferVirtualElementNodeSetCaseInsensitivePropertyValue<GElementNode, GPropertyKey>>,
): IUnsubscribe {
  return node.onConnected$(value$)((value: InferVirtualElementNodeSetCaseInsensitivePropertyValue<GElementNode, GPropertyKey>): void => {
    virtualElementNodeSetCaseInsensitiveProperty<GElementNode, GPropertyKey>(node, propertyKey, value);
  });
}
