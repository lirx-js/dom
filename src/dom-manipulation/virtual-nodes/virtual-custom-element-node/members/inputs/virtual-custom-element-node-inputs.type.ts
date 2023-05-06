import { ObservablesMap } from '../../../../../misc/classes/observables-map.class';
import { InferVirtualCustomElementNodeConfigInputs } from '../config/inputs/infer-virtual-custom-element-node-config-inputs.type';
import { IVirtualCustomElementNodeConfig } from '../config/virtual-custom-element-node-config.type';

export type IVirtualCustomElementNodeInputs<GConfig extends IVirtualCustomElementNodeConfig> = ObservablesMap<InferVirtualCustomElementNodeConfigInputs<GConfig>>;

