import { IObserver } from '@lirx/core';
import { VirtualCustomElementNode } from '../../virtual-custom-element-node.class';
import { IVirtualCustomElementNodeConfig } from '../config/virtual-custom-element-node-config.type';
import { IVirtualCustomElementNodeInputsMap } from './inputs-map/create-virtual-custom-element-node-inputs-map';
import { getVirtualCustomElementNodeInputsMap } from './inputs-map/get-virtual-custom-element-node-inputs-map';
import { InferVirtualCustomElementNodeInputKeys } from './infer-virtual-custom-element-node-input-keys.type';
import { InferVirtualCustomElementNodeInputValue } from './infer-virtual-custom-element-node-input-value.type';

export function virtualCustomElementNodeGetInputObserver<GConfig extends IVirtualCustomElementNodeConfig, GKey extends InferVirtualCustomElementNodeInputKeys<GConfig>>(
  node: VirtualCustomElementNode<GConfig>,
  key: GKey,
): IObserver<InferVirtualCustomElementNodeInputValue<GConfig, GKey>> {
  const map: IVirtualCustomElementNodeInputsMap = getVirtualCustomElementNodeInputsMap(node);
  return map.get(key)![0];
}
