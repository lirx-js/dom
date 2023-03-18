import { IComponentConfig } from '../../../types/config/component-config.type';
import { InferComponentConfigData } from '../../../types/config/infer-component-config-data.type';
import { IResolveCreateComponentInitOptions, resolveCreateComponentInit } from '../../functions/resolve-create-component-init';

export interface IResolveCreateShadowComponentInitOptions<GConfig extends IComponentConfig> extends IResolveCreateComponentInitOptions<GConfig> {
}

export function resolveCreateShadowComponentInit<GConfig extends IComponentConfig>(
  options: IResolveCreateShadowComponentInitOptions<GConfig>,
): InferComponentConfigData<GConfig> {
  return resolveCreateComponentInit<GConfig>(options);
}
