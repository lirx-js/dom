import { IObserver } from '@lirx/core';
import { IUnsubscribe } from '@lirx/utils';
import { VirtualCustomElementNode } from '../../../virtual-custom-element-node.class';
import { IVirtualCustomElementNodeConfig } from '../../config/virtual-custom-element-node-config.type';
import {
  InferVirtualCustomElementNodeCaseInsensitiveOutputValue,
} from './infer-virtual-custom-element-node-case-insensitive-output-value.type';
import {
  virtualCustomElementNodeGetCaseInsensitiveOutputObservable,
} from './virtual-custom-element-node-get-case-insensitive-output-observable';

export function virtualCustomElementNodeSetCaseInsensitiveReactiveOutput<GConfig extends IVirtualCustomElementNodeConfig, GKey extends string>(
  node: VirtualCustomElementNode<GConfig>,
  key: GKey,
  $value: IObserver<InferVirtualCustomElementNodeCaseInsensitiveOutputValue<GConfig, GKey>>,
): IUnsubscribe {
  return node.onConnected$(
    virtualCustomElementNodeGetCaseInsensitiveOutputObservable<GConfig, GKey>(node, key),
  )($value);
}
