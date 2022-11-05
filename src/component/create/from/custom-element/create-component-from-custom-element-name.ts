import {
  IVirtualCustomElementNodeSlotsMap,
} from '../../../../virtual-node/dom/nodes/reactive/custom-element/slots/virtual-custom-element-node-slots-map.type';
import { VirtualCustomElementNode } from '../../../../virtual-node/dom/nodes/reactive/custom-element/virtual-custom-element-node.class';
import { ICustomElementComponent, ICustomElementConfig, ICustomElementVirtualCustomElementNode } from './custom-element.types';
import { createCustomElementNotDefinedError } from '../../../../misc/errors/create-custom-element-not-defined-error';

export interface ICreateComponentFromCustomElementNameOptions {
  mustBeDefined?: boolean;
}

export function createComponentFromCustomElementName<GElement extends HTMLElement>(
  name: string,
  {
    mustBeDefined = true,
  }: ICreateComponentFromCustomElementNameOptions = {},
): ICustomElementComponent<GElement> {
  return {
    name,
    create: (
      slots: IVirtualCustomElementNodeSlotsMap = new Map(),
    ): ICustomElementVirtualCustomElementNode<GElement> => {
      if (
        mustBeDefined
        && (window.customElements.get(name) === void 0)
      ) {
        throw createCustomElementNotDefinedError(name);
      } else {
        return new VirtualCustomElementNode<ICustomElementConfig<GElement>>({
          name,
          slots,
        });
      }
    },
  };
}
