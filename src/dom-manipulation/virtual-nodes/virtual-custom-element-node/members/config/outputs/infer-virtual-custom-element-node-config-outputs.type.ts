import { IVirtualCustomElementNodeConfigOutputs } from './virtual-custom-element-node-config-outputs.type';
import { IVirtualCustomElementNodeConfig } from '../virtual-custom-element-node-config.type';

export type InferVirtualCustomElementNodeConfigOutputs<GConfig extends IVirtualCustomElementNodeConfig> =
  GConfig['outputs'] extends IVirtualCustomElementNodeConfigOutputs
    ? GConfig['outputs']
    : [];
