import { ISource } from '@lirx/core';
import { InferVirtualCustomElementNodeConfigInputs } from '../../config/inputs/infer-virtual-custom-element-node-config-inputs.type';
import { IVirtualCustomElementNodeConfigInputs } from '../../config/inputs/virtual-custom-element-node-config-inputs.type';
import { IVirtualCustomElementNodeConfig } from '../../config/virtual-custom-element-node-config.type';

export interface ICreateInputSourceFunction<GValue> {
  (): ISource<GValue>;
}

export type InferVirtualCustomElementNodeOptionsInputsFromInputs<GInputs extends IVirtualCustomElementNodeConfigInputs> = {
  [Key in keyof GInputs]:
  | [GInputs[Key][0], GInputs[Key][1]?, ICreateInputSourceFunction<GInputs[Key][1]>?]
  | GInputs[Key][0];
};

export type InferVirtualCustomElementNodeOptionsInputs<GConfig extends IVirtualCustomElementNodeConfig> =
  InferVirtualCustomElementNodeOptionsInputsFromInputs<InferVirtualCustomElementNodeConfigInputs<GConfig>>;

