import { VirtualCustomElementNode } from '../../../dom-manipulation/virtual-nodes/virtual-custom-element-node/virtual-custom-element-node.class';
import { IComponentConfig } from '../../types/config/component-config.type';
import { IComponentStyle } from '../../types/options/component-style.type';

export interface IApplyCreateComponentStylesOptions<GConfig extends IComponentConfig> {
  node: VirtualCustomElementNode<GConfig>;
  styles?: (readonly IComponentStyle[]) | undefined;
}

export function applyCreateComponentStyles<GConfig extends IComponentConfig>(
  {
    node,
    styles,
  }: IApplyCreateComponentStylesOptions<GConfig>,
): void {
  if (styles !== void 0) {
    for (let i = 0, l = styles.length; i < l; i++) {
      styles[i](node);
    }
  }
}
