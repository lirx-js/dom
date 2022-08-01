import { VirtualCustomElementNode } from '../../../virtual-node/dom/nodes/reactive/custom-element/virtual-custom-element-node.class';
import { IComponentConfig } from '../../types/config/component-config.type';
import { InferComponentConfigData } from '../../types/config/infer-component-config-data.type';
import { applyCreateComponentStyles, IApplyCreateComponentStylesOptions } from './apply-create-component-styles';
import { IInjectCreateComponentTemplateOptions, injectCreateComponentTemplate } from './inject-create-component-template';
import { IResolveCreateComponentInitOptions, resolveCreateComponentInit } from './resolve-create-component-init';

export interface IResolveCreateComponentOptions<GConfig extends IComponentConfig> extends // extends
  Pick<IResolveCreateComponentInitOptions<GConfig>, 'init'>,
  Pick<IInjectCreateComponentTemplateOptions<GConfig>, 'template' | 'slots'>,
  Pick<IApplyCreateComponentStylesOptions<GConfig>, 'styles'>
//
{
  node: VirtualCustomElementNode<GConfig>;
}

export function resolveCreateComponent<GConfig extends IComponentConfig>(
  {
    node,
    init,
    template,
    styles,
    slots,
  }: IResolveCreateComponentOptions<GConfig>,
): void {
  const $: InferComponentConfigData<GConfig> = resolveCreateComponentInit({
    node,
    init,
  });

  injectCreateComponentTemplate({
    node,
    template,
    $,
    slots,
  });

  applyCreateComponentStyles({
    node,
    styles,
  });
}