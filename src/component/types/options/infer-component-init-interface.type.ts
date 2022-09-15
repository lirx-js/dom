import { IComponentConfig } from '../config/component-config.type';
import { IComponentInitFunction } from './component-init-function.type';
import { PartialInterfaceIfDataIsUndefined } from './partial-interface-if-data-is-undefined.type';

export type InferComponentInitInterface<GConfig extends IComponentConfig> =
  PartialInterfaceIfDataIsUndefined<GConfig['data'], {
    init: IComponentInitFunction<GConfig>;
  }>;
