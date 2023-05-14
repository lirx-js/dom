import { InferVirtualCustomElementNodeConfigOutputs } from '../../config/outputs/infer-virtual-custom-element-node-config-outputs.type';
import { IVirtualCustomElementNodeConfigOutputs } from '../../config/outputs/virtual-custom-element-node-config-outputs.type';
import { IVirtualCustomElementNodeConfig } from '../../config/virtual-custom-element-node-config.type';

export type InferVirtualCustomElementNodeCaseInsensitiveOutputValueFromOutputs<GOutputs extends IVirtualCustomElementNodeConfigOutputs, GKey extends string> = ({
  [Key in keyof GOutputs]: Lowercase<GKey> extends Lowercase<GOutputs[Key][0]>
    ? GOutputs[Key][1]
    : never;
})[number];

export type InferVirtualCustomElementNodeCaseInsensitiveOutputValue<GConfig extends IVirtualCustomElementNodeConfig, GKey extends string> =
  InferVirtualCustomElementNodeCaseInsensitiveOutputValueFromOutputs<InferVirtualCustomElementNodeConfigOutputs<GConfig>, GKey>;

