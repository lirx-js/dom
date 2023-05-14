import { IObserver } from '@lirx/core';
import { VirtualCustomElementNode } from '../../../virtual-custom-element-node.class';
import { IVirtualCustomElementNodeConfig } from '../../config/virtual-custom-element-node-config.type';
import { virtualCustomElementNodeGetInputObserver } from '../virtual-custom-element-node-get-input-observer';
import { getCaseInsensitiveVirtualCustomElementNodeInputKey } from './get-case-insensitive-virtual-custom-element-node-input-key';
import {
  InferVirtualCustomElementNodeCaseInsensitiveInputValue,
} from './infer-virtual-custom-element-node-case-insensitive-input-value.type';

export function virtualCustomElementNodeGetCaseInsensitiveInputObserver<GConfig extends IVirtualCustomElementNodeConfig, GKey extends string>(
  node: VirtualCustomElementNode<GConfig>,
  key: GKey,
): IObserver<InferVirtualCustomElementNodeCaseInsensitiveInputValue<GConfig, GKey>> {
  return virtualCustomElementNodeGetInputObserver<GConfig, string>(
    node,
    getCaseInsensitiveVirtualCustomElementNodeInputKey<GConfig, GKey>(
      node,
      key,
    ),
  );
}
