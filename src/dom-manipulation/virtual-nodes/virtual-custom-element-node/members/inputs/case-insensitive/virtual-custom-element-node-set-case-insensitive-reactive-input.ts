import { IObservable } from '@lirx/core';
import { IUnsubscribe } from '@lirx/utils';
import { VirtualCustomElementNode } from '../../../virtual-custom-element-node.class';
import { IVirtualCustomElementNodeConfig } from '../../config/virtual-custom-element-node-config.type';
import {
  InferCustomVirtualElementNodeSetCaseInsensitiveInputValue,
} from './infer-custom-virtual-element-node-set-case-insensitive-input-value.type';
import { virtualCustomElementNodeSetCaseInsensitiveInput } from './virtual-custom-element-node-set-case-insensitive-input';

export function virtualCustomElementNodeSetCaseInsensitiveReactiveInput<GConfig extends IVirtualCustomElementNodeConfig, GKey extends string>(
  node: VirtualCustomElementNode<GConfig>,
  key: GKey,
  value$: IObservable<InferCustomVirtualElementNodeSetCaseInsensitiveInputValue<GConfig, GKey>>,
): IUnsubscribe {
  return node.onConnected$(value$)((value: InferCustomVirtualElementNodeSetCaseInsensitiveInputValue<GConfig, GKey>): void => {
    virtualCustomElementNodeSetCaseInsensitiveInput<GConfig, GKey>(node, key, value);
  });
}
