import { IVirtualCustomElementNodeConfigInputs } from './virtual-custom-element-node-config-inputs.type';
import { IVirtualCustomElementNodeConfig } from '../virtual-custom-element-node-config.type';

export type InferVirtualCustomElementNodeConfigInputs<GConfig extends IVirtualCustomElementNodeConfig> =
  GConfig['inputs'] extends IVirtualCustomElementNodeConfigInputs
    ? GConfig['inputs']
    : [];
