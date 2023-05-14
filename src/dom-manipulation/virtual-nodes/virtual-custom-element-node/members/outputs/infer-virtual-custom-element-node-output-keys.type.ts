import { InferVirtualCustomElementNodeConfigOutputs } from '../config/outputs/infer-virtual-custom-element-node-config-outputs.type';
import { IVirtualCustomElementNodeConfigOutputs } from '../config/outputs/virtual-custom-element-node-config-outputs.type';
import { IVirtualCustomElementNodeConfig } from '../config/virtual-custom-element-node-config.type';

export type InferVirtualCustomElementNodeOutputKeysFromOutputs<GOutputs extends IVirtualCustomElementNodeConfigOutputs> = ({
  [Key in keyof GOutputs]: GOutputs[Key][0];
})[number];

export type InferVirtualCustomElementNodeOutputKeys<GConfig extends IVirtualCustomElementNodeConfig> =
  InferVirtualCustomElementNodeOutputKeysFromOutputs<InferVirtualCustomElementNodeConfigOutputs<GConfig>>;
