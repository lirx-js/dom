import { IComponentConfig } from '../../../types/config/component-config.type';
import { applyCreateComponentStyles, IApplyCreateComponentStylesOptions } from '../../functions/apply-create-component-styles';

export interface IApplyCreateShadowComponentStylesOptions<GConfig extends IComponentConfig> extends IApplyCreateComponentStylesOptions<GConfig> {

}

export function applyCreateShadowComponentStyles<GConfig extends IComponentConfig>(
  options: IApplyCreateShadowComponentStylesOptions<GConfig>,
): void {
  return applyCreateComponentStyles(options);
}

// export function applyCreateShadowComponentStyles<GConfig extends IComponentConfig>(
//   {
//     node,
//     ...options
//   }: IApplyCreateShadowComponentStylesOptions<GConfig>,
// ): void {
//   return applyCreateComponentStyles({
//     ...options,
//     node: node.shadowRoot as any,
//   });
// }
