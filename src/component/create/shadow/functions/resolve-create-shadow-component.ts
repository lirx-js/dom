import { VirtualCustomElementNode } from '../../../../dom-manipulation/virtual-nodes/virtual-custom-element-node/virtual-custom-element-node.class';
import { IComponentConfig } from '../../../types/config/component-config.type';
import { InferComponentConfigData } from '../../../types/config/infer-component-config-data.type';
import { IResolveCreateComponentInitOptions } from '../../functions/resolve-create-component-init';
import { applyCreateShadowComponentStyles, IApplyCreateShadowComponentStylesOptions } from './apply-create-shadow-component-styles';
import {
  IInjectCreateShadowComponentTemplateOptions,
  injectCreateShadowComponentTemplate,
} from './inject-create-shadow-component-template';
import { resolveCreateShadowComponentInit } from './resolve-create-shadow-component-init';

export interface IResolveCreateShadowComponentOptions<GConfig extends IComponentConfig> extends // extends
  Pick<IResolveCreateComponentInitOptions<GConfig>, 'init'>,
  Pick<IInjectCreateShadowComponentTemplateOptions<GConfig>, 'template' | 'slots'>,
  Pick<IApplyCreateShadowComponentStylesOptions<GConfig>, 'styles'>
//
{
  node: VirtualCustomElementNode<GConfig>;
}

export function resolveCreateShadowComponent<GConfig extends IComponentConfig>(
  {
    node,
    init,
    template,
    styles,
    slots,
  }: IResolveCreateShadowComponentOptions<GConfig>,
): void {
  node.attachShadow();

  const $: InferComponentConfigData<GConfig> = resolveCreateShadowComponentInit<GConfig>({
    node,
    init,
  });

  injectCreateShadowComponentTemplate<GConfig>({
    node,
    template,
    $,
    slots,
  });

  applyCreateShadowComponentStyles<GConfig>({
    node,
    styles,
  });
}
