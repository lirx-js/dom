import { IComponentConfig } from '../../../types/config/component-config.type';
import { IInjectCreateComponentTemplateOptions, injectCreateComponentTemplate } from '../../functions/inject-create-component-template';

export interface IInjectCreateShadowComponentTemplateOptions<GConfig extends IComponentConfig> extends IInjectCreateComponentTemplateOptions<GConfig> {
}

export function injectCreateShadowComponentTemplate<GConfig extends IComponentConfig>(
  {
    node,
    ...options
  }: IInjectCreateShadowComponentTemplateOptions<GConfig>,
): void {
  return injectCreateComponentTemplate<GConfig>({
    ...options,
    node: node.shadowRoot as any,
  });
}

// export interface IInjectCreateShadowComponentTemplateOptions<GConfig extends IComponentConfig> extends Omit<IInjectCreateComponentTemplateOptions<GConfig>, 'node'> {
//   rootNode: VirtualRootNode<ShadowRoot>;
// }
//
//
// export function injectCreateShadowComponentTemplate<GConfig extends IComponentConfig>(
//   {
//     rootNode,
//     ...options
//   }: IInjectCreateShadowComponentTemplateOptions<GConfig>,
// ): void {
//   return injectCreateComponentTemplate<GConfig>({
//     ...options,
//     node: rootNode as any,
//   });
// }
