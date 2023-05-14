import { InferVirtualCustomElementNodeConfigInputs } from '../config/inputs/infer-virtual-custom-element-node-config-inputs.type';
import { IVirtualCustomElementNodeConfigInputs } from '../config/inputs/virtual-custom-element-node-config-inputs.type';
import { IVirtualCustomElementNodeConfig } from '../config/virtual-custom-element-node-config.type';

export type InferVirtualCustomElementNodeInputKeysFromInputs<GInputs extends IVirtualCustomElementNodeConfigInputs> = ({
  [Key in keyof GInputs]: GInputs[Key][0];
})[number];

export type InferVirtualCustomElementNodeInputKeys<GConfig extends IVirtualCustomElementNodeConfig> =
  InferVirtualCustomElementNodeInputKeysFromInputs<InferVirtualCustomElementNodeConfigInputs<GConfig>>;
