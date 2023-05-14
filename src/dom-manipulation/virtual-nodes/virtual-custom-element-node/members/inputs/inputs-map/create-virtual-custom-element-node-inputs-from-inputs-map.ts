import { IObservable } from '@lirx/core';
import { ObservablesMap } from '../../../../../../misc/classes/observables-map.class';
import { InferVirtualCustomElementNodeConfigInputs } from '../../config/inputs/infer-virtual-custom-element-node-config-inputs.type';
import { IVirtualCustomElementNodeConfig } from '../../config/virtual-custom-element-node-config.type';
import { IVirtualCustomElementNodeInputs } from '../virtual-custom-element-node-inputs.type';
import { IVirtualCustomElementNodeInputsMap } from './create-virtual-custom-element-node-inputs-map';

export function createVirtualCustomElementNodeInputsFromInputsMap<GConfig extends IVirtualCustomElementNodeConfig>(
  inputs: IVirtualCustomElementNodeInputsMap,
): IVirtualCustomElementNodeInputs<GConfig> {
  return new ObservablesMap<InferVirtualCustomElementNodeConfigInputs<GConfig>>(
    Array.from(inputs, ([key, [, observable]]): [string, IObservable<unknown>] => {
      return [key, observable];
    }) as any,
  );
}
