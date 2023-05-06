import { VirtualCustomElementNode } from '../../../dom-manipulation/virtual-nodes/virtual-custom-element-node/virtual-custom-element-node.class';
import { IComponentConfig } from '../config/component-config.type';
import { InferComponentInitFunctionReturn } from './infer-component-init-function-return.type';

export interface IComponentInitFunction<GConfig extends IComponentConfig> {
  (
    node: VirtualCustomElementNode<GConfig>,
  ): InferComponentInitFunctionReturn<GConfig['data']>;
}
