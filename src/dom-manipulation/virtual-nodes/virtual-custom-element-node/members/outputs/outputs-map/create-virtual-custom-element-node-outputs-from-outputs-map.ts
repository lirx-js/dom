import { IObserver } from '@lirx/core';
import { ObserversMap } from '../../../../../../misc/classes/observers-map.class';
import { InferVirtualCustomElementNodeConfigOutputs } from '../../config/outputs/infer-virtual-custom-element-node-config-outputs.type';
import { IVirtualCustomElementNodeConfig } from '../../config/virtual-custom-element-node-config.type';
import { IVirtualCustomElementNodeOutputsMap } from './create-virtual-custom-element-node-outputs-map';
import { IVirtualCustomElementNodeOutputs } from '../virtual-custom-element-node-outputs.type';

export function createVirtualCustomElementNodeOutputsFromOutputsMap<GConfig extends IVirtualCustomElementNodeConfig>(
  outputs: IVirtualCustomElementNodeOutputsMap,
): IVirtualCustomElementNodeOutputs<GConfig> {
  return new ObserversMap<InferVirtualCustomElementNodeConfigOutputs<GConfig>>(
    Array.from(outputs, ([key, [observer]]): [string, IObserver<unknown>] => {
      return [key, observer];
    }) as any,
  );
}
