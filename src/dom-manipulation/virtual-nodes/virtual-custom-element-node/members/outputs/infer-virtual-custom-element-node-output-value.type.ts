import { InferVirtualCustomElementNodeConfigOutputs } from '../config/outputs/infer-virtual-custom-element-node-config-outputs.type';
import { IVirtualCustomElementNodeConfigOutputs } from '../config/outputs/virtual-custom-element-node-config-outputs.type';
import { IVirtualCustomElementNodeConfig } from '../config/virtual-custom-element-node-config.type';
import {
  InferVirtualCustomElementNodeOutputKeys,
  InferVirtualCustomElementNodeOutputKeysFromOutputs,
} from './infer-virtual-custom-element-node-output-keys.type';

export type InferVirtualCustomElementNodeOutputValueFromOutputs<GOutputs extends IVirtualCustomElementNodeConfigOutputs, GKey extends InferVirtualCustomElementNodeOutputKeysFromOutputs<GOutputs>> = ({
  [Key in keyof GOutputs]: GKey extends GOutputs[Key][0]
    ? GOutputs[Key][1]
    : never;
})[number];

export type InferVirtualCustomElementNodeOutputValue<GConfig extends IVirtualCustomElementNodeConfig, GKey extends InferVirtualCustomElementNodeOutputKeys<GConfig>> =
  InferVirtualCustomElementNodeOutputValueFromOutputs<InferVirtualCustomElementNodeConfigOutputs<GConfig>, GKey>;
