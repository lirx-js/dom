import { ISource } from '@lirx/core';
import { InferVirtualCustomElementNodeConfigOutputs } from '../../config/outputs/infer-virtual-custom-element-node-config-outputs.type';
import { IVirtualCustomElementNodeConfigOutputs } from '../../config/outputs/virtual-custom-element-node-config-outputs.type';
import { IVirtualCustomElementNodeConfig } from '../../config/virtual-custom-element-node-config.type';

export interface ICreateOutputSourceFunction<GValue> {
  (): ISource<GValue>;
}

export type InferVirtualCustomElementNodeOptionsOutputsFromOutputs<GOutputs extends IVirtualCustomElementNodeConfigOutputs> = {
  [Key in keyof GOutputs]:
  | [GOutputs[Key][0], ICreateOutputSourceFunction<GOutputs[Key][1]>?]
  | GOutputs[Key][0];
};

export type InferVirtualCustomElementNodeOptionsOutputs<GConfig extends IVirtualCustomElementNodeConfig> =
  InferVirtualCustomElementNodeOptionsOutputsFromOutputs<InferVirtualCustomElementNodeConfigOutputs<GConfig>>;

