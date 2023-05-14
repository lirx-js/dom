import { IObservable } from '@lirx/core';
import { IUnsubscribe } from '@lirx/utils';
import { VirtualCustomElementNode } from '../../virtual-custom-element-node.class';
import { IVirtualCustomElementNodeConfig } from '../config/virtual-custom-element-node-config.type';
import { InferVirtualCustomElementNodeInputKeys } from './infer-virtual-custom-element-node-input-keys.type';
import { InferVirtualCustomElementNodeInputValue } from './infer-virtual-custom-element-node-input-value.type';
import { virtualCustomElementNodeSetInput } from './virtual-custom-element-node-set-input';

export function virtualCustomElementNodeSetReactiveInput<GConfig extends IVirtualCustomElementNodeConfig, GKey extends InferVirtualCustomElementNodeInputKeys<GConfig>>(
  node: VirtualCustomElementNode<GConfig>,
  key: GKey,
  value$: IObservable<InferVirtualCustomElementNodeInputValue<GConfig, GKey>>,
): IUnsubscribe {
  return node.onConnected$(value$)((value: InferVirtualCustomElementNodeInputValue<GConfig, GKey>): void => {
    virtualCustomElementNodeSetInput<GConfig, GKey>(node, key, value);
  });
}
