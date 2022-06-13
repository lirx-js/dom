import {
  IVirtualCustomElementNodeOptions,
} from '../../../virtual-node/dom/nodes/reactive/custom-element/types/options/virtual-custom-element-node-options.type';
import { IComponentConfig } from '../config/component-config.type';
import { InferComponentConfigData } from '../config/infer-component-config-data.type';
import { IComponentStyle } from './component-style.type';
import { IComponentTemplate } from './component-template.type';
import { InferComponentInitInterface } from './infer-component-init-interface.type';

export type ICreateComponentOptions<GConfig extends IComponentConfig> = {
    template?: IComponentTemplate<InferComponentConfigData<GConfig>>;
    styles?: readonly IComponentStyle[];
  }
  & Pick<IVirtualCustomElementNodeOptions<GConfig>, 'name' | 'extends' | 'inputs' | 'outputs'>
  & InferComponentInitInterface<GConfig>
  ;
