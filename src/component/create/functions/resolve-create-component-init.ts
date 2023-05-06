import { VirtualCustomElementNode } from '../../../dom-manipulation/virtual-nodes/virtual-custom-element-node/virtual-custom-element-node.class';
import { IComponentConfig } from '../../types/config/component-config.type';
import { InferComponentConfigData } from '../../types/config/infer-component-config-data.type';
import { IComponentInitFunction } from '../../types/options/component-init-function.type';

export interface IResolveCreateComponentInitOptions<GConfig extends IComponentConfig> {
  node: VirtualCustomElementNode<GConfig>;
  init?: IComponentInitFunction<GConfig> | undefined;
}

export function resolveCreateComponentInit<GConfig extends IComponentConfig>(
  {
    node,
    init,
  }: IResolveCreateComponentInitOptions<GConfig>,
): InferComponentConfigData<GConfig> {
  return (init === void 0)
    ? {}
    : (
      init(node) ?? {}
    ) as InferComponentConfigData<GConfig>;
}
