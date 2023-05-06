import { IObserver } from '@lirx/core';
import { VirtualCustomElementNode } from '../../../virtual-custom-element-node.class';
import { IVirtualCustomElementNodeConfig } from '../../config/virtual-custom-element-node-config.type';
import { IVirtualCustomElementNodeInputsMap } from '../create-virtual-custom-element-node-inputs-map';
import { getCaseInsensitiveVirtualCustomElementNodeInputKey } from './get-case-insensitive-virtual-custom-element-node-input-key';
import { getVirtualCustomElementNodeInputsMap } from './get-virtual-custom-element-node-inputs-map';
import {
  InferCustomVirtualElementNodeSetCaseInsensitiveInputValue,
} from './infer-custom-virtual-element-node-set-case-insensitive-input-value.type';

export function virtualCustomElementNodeGetCaseInsensitiveInputObserver<GConfig extends IVirtualCustomElementNodeConfig, GKey extends string>(
  node: VirtualCustomElementNode<GConfig>,
  key: GKey,
): IObserver<InferCustomVirtualElementNodeSetCaseInsensitiveInputValue<GConfig, GKey>> {
  const _key: string = getCaseInsensitiveVirtualCustomElementNodeInputKey<GConfig, GKey>(
    node,
    key,
  );
  const map: IVirtualCustomElementNodeInputsMap = getVirtualCustomElementNodeInputsMap(node);
  return map.get(_key)![0];
}
