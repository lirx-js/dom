import { InferVirtualCustomElementNodeConfigInputs } from '../../config/inputs/infer-virtual-custom-element-node-config-inputs.type';
import { IVirtualCustomElementNodeConfigInputs } from '../../config/inputs/virtual-custom-element-node-config-inputs.type';
import { IVirtualCustomElementNodeConfig } from '../../config/virtual-custom-element-node-config.type';

export type InferCustomVirtualElementNodeSetCaseInsensitiveInputValueFromInputs<GInputs extends IVirtualCustomElementNodeConfigInputs, GKey extends string> = ({
  [Key in keyof GInputs]: Lowercase<GKey> extends Lowercase<GInputs[Key][0]>
    ? GInputs[Key][1]
    : never;
})[number];

export type InferCustomVirtualElementNodeSetCaseInsensitiveInputValue<GConfig extends IVirtualCustomElementNodeConfig, GKey extends string> =
  InferCustomVirtualElementNodeSetCaseInsensitiveInputValueFromInputs<InferVirtualCustomElementNodeConfigInputs<GConfig>, GKey>;

