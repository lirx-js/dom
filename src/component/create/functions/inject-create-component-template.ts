import {
  IVirtualCustomElementNodeSlotsMap,
} from '../../../virtual-node/dom/nodes/reactive/custom-element/slots/virtual-custom-element-node-slots-map.type';
import { VirtualCustomElementNode } from '../../../virtual-node/dom/nodes/reactive/custom-element/virtual-custom-element-node.class';
import { applyTemplateForVirtualDOMNode } from '../../../virtual-node/functions/apply-template-for-virtual-dom-node';
import { IComponentConfig } from '../../types/config/component-config.type';
import { InferComponentConfigData } from '../../types/config/infer-component-config-data.type';
import { IComponentTemplate } from '../../types/options/component-template.type';

export interface IInjectCreateComponentTemplateOptions<GConfig extends IComponentConfig> {
  node: VirtualCustomElementNode<GConfig>;
  template?: IComponentTemplate<InferComponentConfigData<GConfig>> | undefined;
  $: InferComponentConfigData<GConfig>;
  slots: IVirtualCustomElementNodeSlotsMap;
}

export function injectCreateComponentTemplate<GConfig extends IComponentConfig>(
  {
    node,
    template,
    $,
    slots,
  }: IInjectCreateComponentTemplateOptions<GConfig>,
): void {
  if (template !== void 0) {
    if (node.isConnected) { // batch append child nodes to increase performances
      applyTemplateForVirtualDOMNode(
        node,
        template,
        [$, slots],
      );
    } else {
      template(node, $, slots);
    }
  }
}
