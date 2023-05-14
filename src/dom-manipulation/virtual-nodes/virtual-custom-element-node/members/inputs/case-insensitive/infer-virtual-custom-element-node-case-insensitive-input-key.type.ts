import { InferVirtualCustomElementNodeConfigInputs } from '../../config/inputs/infer-virtual-custom-element-node-config-inputs.type';
import { IVirtualCustomElementNodeConfigInputs } from '../../config/inputs/virtual-custom-element-node-config-inputs.type';
import { IVirtualCustomElementNodeConfig } from '../../config/virtual-custom-element-node-config.type';

export type InferVirtualCustomElementNodeCaseInsensitiveInputKeyFromInputs<GInputs extends IVirtualCustomElementNodeConfigInputs, GKey extends string> = ({
  [Key in keyof GInputs]: Lowercase<GKey> extends Lowercase<GInputs[Key][0]>
    ? GInputs[Key][0]
    : never;
})[number];

export type InferVirtualCustomElementNodeCaseInsensitiveInputKey<GConfig extends IVirtualCustomElementNodeConfig, GKey extends string> =
  InferVirtualCustomElementNodeCaseInsensitiveInputKeyFromInputs<InferVirtualCustomElementNodeConfigInputs<GConfig>, GKey>;