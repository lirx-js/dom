import { VirtualCustomElementNode } from '../../../virtual-custom-element-node.class';
import { IVirtualCustomElementNodeConfig } from '../../config/virtual-custom-element-node-config.type';
import {
  InferVirtualCustomElementNodeCaseInsensitiveInputValue,
} from './infer-virtual-custom-element-node-case-insensitive-input-value.type';
import { virtualCustomElementNodeGetCaseInsensitiveInputObserver } from './virtual-custom-element-node-get-case-insensitive-input-observer';

export function virtualCustomElementNodeSetCaseInsensitiveInput<GConfig extends IVirtualCustomElementNodeConfig, GKey extends string>(
  node: VirtualCustomElementNode<GConfig>,
  key: GKey,
  value: InferVirtualCustomElementNodeCaseInsensitiveInputValue<GConfig, GKey>,
): void {
  virtualCustomElementNodeGetCaseInsensitiveInputObserver(node, key)(value);
}

