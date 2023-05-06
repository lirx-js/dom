import { IObservable } from '@lirx/core';
import { VirtualCustomElementNode } from '../../../virtual-custom-element-node.class';
import { IVirtualCustomElementNodeConfig } from '../../config/virtual-custom-element-node-config.type';
import { IVirtualCustomElementNodeOutputsMap } from '../create-virtual-custom-element-node-outputs-map';
import { getCaseInsensitiveVirtualCustomElementNodeOutputKey } from './get-case-insensitive-virtual-custom-element-node-output-key';
import { getVirtualCustomElementNodeOutputsMap } from './get-virtual-custom-element-node-outputs-map';
import {
  InferCustomVirtualElementNodeSetCaseInsensitiveOutputValue,
} from './infer-custom-virtual-element-node-set-case-insensitive-output-value.type';

export function virtualCustomElementNodeGetCaseInsensitiveOutputObservable<GConfig extends IVirtualCustomElementNodeConfig, GKey extends string>(
  node: VirtualCustomElementNode<GConfig>,
  key: GKey,
): IObservable<InferCustomVirtualElementNodeSetCaseInsensitiveOutputValue<GConfig, GKey>> {
  const _key: string = getCaseInsensitiveVirtualCustomElementNodeOutputKey<GConfig, GKey>(
    node,
    key,
  );
  const map: IVirtualCustomElementNodeOutputsMap = getVirtualCustomElementNodeOutputsMap(node);
  return map.get(_key)![1];
}
