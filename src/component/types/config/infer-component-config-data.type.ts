import { IComponentConfig } from './component-config.type';

export type InferComponentConfigData<GConfig extends IComponentConfig> =
  GConfig['data'] extends object
    ? GConfig['data']
    : object;
