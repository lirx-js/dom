import { IObserver } from '@lirx/core';
import { IUnsubscribe } from '@lirx/utils';
import { VirtualCustomElementNode } from '../../virtual-custom-element-node.class';
import { IVirtualCustomElementNodeConfig } from '../config/virtual-custom-element-node-config.type';
import { InferVirtualCustomElementNodeOutputKeys } from './infer-virtual-custom-element-node-output-keys.type';
import { InferVirtualCustomElementNodeOutputValue } from './infer-virtual-custom-element-node-output-value.type';
import { virtualCustomElementNodeGetOutputObservable } from './virtual-custom-element-node-get-output-observable';

export function virtualCustomElementNodeSetReactiveOutput<GConfig extends IVirtualCustomElementNodeConfig, GKey extends InferVirtualCustomElementNodeOutputKeys<GConfig>>(
  node: VirtualCustomElementNode<GConfig>,
  key: GKey,
  $value: IObserver<InferVirtualCustomElementNodeOutputValue<GConfig, GKey>>,
): IUnsubscribe {
  return node.onConnected$(
    virtualCustomElementNodeGetOutputObservable<GConfig, GKey>(node, key),
  )($value);
}
