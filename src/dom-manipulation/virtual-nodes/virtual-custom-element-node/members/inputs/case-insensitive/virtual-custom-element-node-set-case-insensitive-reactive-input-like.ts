import { IObservable, IObservableLike, toObservableThrowIfUndefined } from '@lirx/core';
import { IUnsubscribe } from '@lirx/utils';
import { VirtualCustomElementNode } from '../../../virtual-custom-element-node.class';
import { IVirtualCustomElementNodeConfig } from '../../config/virtual-custom-element-node-config.type';
import {
  InferCustomVirtualElementNodeSetCaseInsensitiveInputValue,
} from './infer-custom-virtual-element-node-set-case-insensitive-input-value.type';
import { virtualCustomElementNodeSetCaseInsensitiveInput } from './virtual-custom-element-node-set-case-insensitive-input';
import { virtualCustomElementNodeSetCaseInsensitiveReactiveInput } from './virtual-custom-element-node-set-case-insensitive-reactive-input';

export function virtualCustomElementNodeSetCaseInsensitiveReactiveInputLike<GConfig extends IVirtualCustomElementNodeConfig, GKey extends string>(
  node: VirtualCustomElementNode<GConfig>,
  key: GKey,
  value$: IObservableLike<InferCustomVirtualElementNodeSetCaseInsensitiveInputValue<GConfig, GKey>>,
): IUnsubscribe {
  return virtualCustomElementNodeSetCaseInsensitiveReactiveInput(
    node,
    key,
    toObservableThrowIfUndefined(value$)
  );
}
