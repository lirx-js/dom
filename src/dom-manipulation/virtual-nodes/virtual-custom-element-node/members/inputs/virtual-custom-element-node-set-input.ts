import { VirtualCustomElementNode } from '../../virtual-custom-element-node.class';
import { IVirtualCustomElementNodeConfig } from '../config/virtual-custom-element-node-config.type';
import { InferVirtualCustomElementNodeInputKeys } from './infer-virtual-custom-element-node-input-keys.type';
import { InferVirtualCustomElementNodeInputValue } from './infer-virtual-custom-element-node-input-value.type';
import { virtualCustomElementNodeGetInputObserver } from './virtual-custom-element-node-get-input-observer';

export function virtualCustomElementNodeSetInput<GConfig extends IVirtualCustomElementNodeConfig, GKey extends InferVirtualCustomElementNodeInputKeys<GConfig>>(
  node: VirtualCustomElementNode<GConfig>,
  key: GKey,
  value: InferVirtualCustomElementNodeInputValue<GConfig, GKey>,
): void {
  virtualCustomElementNodeGetInputObserver(node, key)(value);
}

