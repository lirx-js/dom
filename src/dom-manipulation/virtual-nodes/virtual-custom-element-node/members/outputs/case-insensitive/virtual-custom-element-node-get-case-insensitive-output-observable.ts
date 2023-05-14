import { IObservable } from '@lirx/core';
import { VirtualCustomElementNode } from '../../../virtual-custom-element-node.class';
import { IVirtualCustomElementNodeConfig } from '../../config/virtual-custom-element-node-config.type';
import { virtualCustomElementNodeGetOutputObservable } from '../virtual-custom-element-node-get-output-observable';
import { getCaseInsensitiveVirtualCustomElementNodeOutputKey } from './get-case-insensitive-virtual-custom-element-node-output-key';
import {
  InferVirtualCustomElementNodeCaseInsensitiveOutputValue,
} from './infer-virtual-custom-element-node-case-insensitive-output-value.type';

export function virtualCustomElementNodeGetCaseInsensitiveOutputObservable<GConfig extends IVirtualCustomElementNodeConfig, GKey extends string>(
  node: VirtualCustomElementNode<GConfig>,
  key: GKey,
): IObservable<InferVirtualCustomElementNodeCaseInsensitiveOutputValue<GConfig, GKey>> {
  return virtualCustomElementNodeGetOutputObservable<GConfig, GKey>(
    node,
    getCaseInsensitiveVirtualCustomElementNodeOutputKey<GConfig, GKey>(
      node,
      key,
    ),
  );
}
