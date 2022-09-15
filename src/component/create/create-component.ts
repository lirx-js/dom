import {
  IVirtualCustomElementNodeSlotsMap,
} from '../../virtual-node/dom/nodes/reactive/custom-element/slots/virtual-custom-element-node-slots-map.type';
import {
  IVirtualCustomElementNodeOptions,
} from '../../virtual-node/dom/nodes/reactive/custom-element/types/options/virtual-custom-element-node-options.type';
import { VirtualCustomElementNode } from '../../virtual-node/dom/nodes/reactive/custom-element/virtual-custom-element-node.class';
import { IComponent, IComponentCreateFunction } from '../types/component.type';
import { IComponentConfig } from '../types/config/component-config.type';
import { ICreateComponentOptions } from '../types/options/create-component-options.type';
import { resolveCreateComponent } from './functions/resolve-create-component';

export function createComponent<GConfig extends IComponentConfig>(
  {
    name,
    ...options
  }: ICreateComponentOptions<GConfig>,
): IComponent<GConfig> {

  const create: IComponentCreateFunction<GConfig> = (
    slots: IVirtualCustomElementNodeSlotsMap = new Map(),
  ): VirtualCustomElementNode<GConfig> => {

    const node = new VirtualCustomElementNode<GConfig>({
      ...options,
      name,
      slots,
    } as IVirtualCustomElementNodeOptions<GConfig>);

    resolveCreateComponent({
      ...options,
      node,
      slots,
    });

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
