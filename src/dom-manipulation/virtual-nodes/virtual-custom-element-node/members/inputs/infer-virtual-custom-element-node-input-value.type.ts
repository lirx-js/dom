import { InferVirtualCustomElementNodeConfigInputs } from '../config/inputs/infer-virtual-custom-element-node-config-inputs.type';
import { IVirtualCustomElementNodeConfigInputs } from '../config/inputs/virtual-custom-element-node-config-inputs.type';
import { IVirtualCustomElementNodeConfig } from '../config/virtual-custom-element-node-config.type';
import {
  InferVirtualCustomElementNodeInputKeys,
  InferVirtualCustomElementNodeInputKeysFromInputs,
} from './infer-virtual-custom-element-node-input-keys.type';

export type InferVirtualCustomElementNodeInputValueFromInputs<GInputs extends IVirtualCustomElementNodeConfigInputs, GKey extends InferVirtualCustomElementNodeInputKeysFromInputs<GInputs>> = ({
  [Key in keyof GInputs]: GKey extends GInputs[Key][0]
    ? GInputs[Key][1]
    : never;
})[number];

export type InferVirtualCustomElementNodeInputValue<GConfig extends IVirtualCustomElementNodeConfig, GKey extends InferVirtualCustomElementNodeInputKeys<GConfig>> =
  InferVirtualCustomElementNodeInputValueFromInputs<InferVirtualCustomElementNodeConfigInputs<GConfig>, GKey>;
