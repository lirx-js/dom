import { IVirtualCustomElementNodeConfigInputs } from './inputs/virtual-custom-element-node-config-inputs.type';
import { IVirtualCustomElementNodeConfigOutputs } from './outputs/virtual-custom-element-node-config-outputs.type';

export interface IVirtualCustomElementNodeConfig {
  element?: Element;
  inputs?: IVirtualCustomElementNodeConfigInputs;
  outputs?: IVirtualCustomElementNodeConfigOutputs;
}
