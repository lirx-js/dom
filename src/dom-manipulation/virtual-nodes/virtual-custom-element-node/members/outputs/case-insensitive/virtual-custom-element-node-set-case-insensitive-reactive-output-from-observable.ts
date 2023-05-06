import { IObservable, IObserver } from '@lirx/core';
import { IUnsubscribe } from '@lirx/utils';
import {
  virtualNodeSubscribeToObservableWithObservableOfObservers,
} from '../../../../virtual-node/members/misc/virtual-node-subscribe-to-observable-with-observable-of-observers';
import { VirtualCustomElementNode } from '../../../virtual-custom-element-node.class';
import { IVirtualCustomElementNodeConfig } from '../../config/virtual-custom-element-node-config.type';
import {
  InferCustomVirtualElementNodeSetCaseInsensitiveOutputValue,
} from './infer-custom-virtual-element-node-set-case-insensitive-output-value.type';
import {
  virtualCustomElementNodeGetCaseInsensitiveOutputObservable,
} from './virtual-custom-element-node-get-case-insensitive-output-observable';

export function virtualCustomElementNodeSetCaseInsensitiveReactiveOutputFromObservable<GConfig extends IVirtualCustomElementNodeConfig, GKey extends string>(
  node: VirtualCustomElementNode<GConfig>,
  key: GKey,
  value$: IObservable<IObserver<InferCustomVirtualElementNodeSetCaseInsensitiveOutputValue<GConfig, GKey>>>,
): IUnsubscribe {
  return virtualNodeSubscribeToObservableWithObservableOfObservers(
    node,
    virtualCustomElementNodeGetCaseInsensitiveOutputObservable<GConfig, GKey>(node, key),
    value$,
  );
}
