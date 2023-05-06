import { ObserversMap } from '../../../../../misc/classes/observers-map.class';
import { InferVirtualCustomElementNodeConfigOutputs } from '../config/outputs/infer-virtual-custom-element-node-config-outputs.type';
import { IVirtualCustomElementNodeConfig } from '../config/virtual-custom-element-node-config.type';

export type IVirtualCustomElementNodeOutputs<GConfig extends IVirtualCustomElementNodeConfig> = ObserversMap<InferVirtualCustomElementNodeConfigOutputs<GConfig>>;

