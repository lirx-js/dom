import { IObservable } from '@lirx/core';
import { VirtualCustomElementNode } from '../../virtual-custom-element-node.class';
import { IVirtualCustomElementNodeConfig } from '../config/virtual-custom-element-node-config.type';
import { InferVirtualCustomElementNodeOutputKeys } from './infer-virtual-custom-element-node-output-keys.type';
import { InferVirtualCustomElementNodeOutputValue } from './infer-virtual-custom-element-node-output-value.type';
import { IVirtualCustomElementNodeOutputsMap } from './outputs-map/create-virtual-custom-element-node-outputs-map';
import { getVirtualCustomElementNodeOutputsMap } from './outputs-map/get-virtual-custom-element-node-outputs-map';

export function virtualCustomElementNodeGetOutputObservable<GConfig extends IVirtualCustomElementNodeConfig, GKey extends InferVirtualCustomElementNodeOutputKeys<GConfig>>(
  node: VirtualCustomElementNode<GConfig>,
  key: GKey,
): IObservable<InferVirtualCustomElementNodeOutputValue<GConfig, GKey>> {
  const map: IVirtualCustomElementNodeOutputsMap = getVirtualCustomElementNodeOutputsMap(node);
  return map.get(key)![1];
}
