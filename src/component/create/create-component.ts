import {
  IVirtualCustomElementNodeSlotsMap,
} from '../../virtual-node/dom/nodes/reactive/custom-element/slots/virtual-custom-element-node-slots-map.type';
import {
  IVirtualCustomElementNodeOptions,
} from '../../virtual-node/dom/nodes/reactive/custom-element/types/options/virtual-custom-element-node-options.type';
import { VirtualCustomElementNode } from '../../virtual-node/dom/nodes/reactive/custom-element/virtual-custom-element-node.class';
import { applyTemplateForVirtualDOMNode } from '../../virtual-node/functions/apply-template-for-virtual-dom-node';
import { IComponent, IComponentCreateFunction } from '../types/component.type';
import { IComponentConfig } from '../types/config/component-config.type';
import { InferComponentConfigData } from '../types/config/infer-component-config-data.type';
import { ICreateComponentOptions } from '../types/options/create-component-options.type';

export function createComponent<GConfig extends IComponentConfig>(
  {
    name,
    extends: _extends,
    inputs,
    outputs,
    init,
    template,
    styles = [],
  }: ICreateComponentOptions<GConfig>,
): IComponent<GConfig> {

  const create: IComponentCreateFunction<GConfig> = (
    slots: IVirtualCustomElementNodeSlotsMap = new Map(),
  ): VirtualCustomElementNode<GConfig> => {

    const node = new VirtualCustomElementNode<GConfig>({
      name,
      extends: _extends,
      slots,
      inputs,
      outputs,
    } as IVirtualCustomElementNodeOptions<GConfig>);

    const $: InferComponentConfigData<GConfig> = (init === void 0)
      ? {}
      : (
        init(node) ?? {}
      ) as InferComponentConfigData<GConfig>;

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

    for (let i = 0, l = styles.length; i < l; i++) {
      styles[i](node);
    }

    return node;
  };

  return {
    name,
    create,
  };
}

/*---------------*/

// interface ConfigA {
//   element: HTMLButtonElement;
//   inputs: [
//     ['i-a', boolean],
//   ],
//   outputs: [
//     ['o-a', number],
//   ],
//   // data: {
//   //   dataA: string;
//   // };
// }
//
// const a = createComponent<ConfigA>({
//   name: 'test',
//   inputs: [
//     ['i-a', true],
//   ],
//   outputs: [
//     'o-a',
//   ],
//   init: (): any => {
//
//   },
// });
