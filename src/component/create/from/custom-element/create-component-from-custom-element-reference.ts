import { createNamesMismatchError } from '../../../../misc/errors/create-names-mismatch-error';
import {
  IVirtualCustomElementNodeSlotsMap,
} from '../../../../virtual-node/dom/nodes/reactive/custom-element/slots/virtual-custom-element-node-slots-map.type';
import { VirtualCustomElementNode } from '../../../../virtual-node/dom/nodes/reactive/custom-element/virtual-custom-element-node.class';
import { ICreateComponentFromCustomElementNameOptions } from './create-component-from-custom-element-name';
import {
  ICustomElementComponent,
  ICustomElementConfig,
  ICustomElementConstructor,
  ICustomElementVirtualCustomElementNode,
} from './custom-element.types';
import { createCustomElementNotDefinedError } from '../../../../misc/errors/create-custom-element-not-defined-error';

export interface ICreateComponentFromCustomElementReferenceOptions extends ICreateComponentFromCustomElementNameOptions {
  mustHaveSameConstructor?: boolean;
}

export function createComponentFromCustomElementReference<GElement extends HTMLElement>(
  name: string,
  getCustomElementConstructor: () => ICustomElementConstructor<GElement>,
  {
    mustBeDefined = true,
    mustHaveSameConstructor = true,
  }: ICreateComponentFromCustomElementReferenceOptions = {},
): ICustomElementComponent<GElement> {
  return {
    name,
    create: (
      slots: IVirtualCustomElementNodeSlotsMap = new Map(),
    ): ICustomElementVirtualCustomElementNode<GElement> => {
      const customElementConstructor: CustomElementConstructor | undefined = window.customElements.get(name);

      if (
        mustBeDefined
        && (customElementConstructor === void 0)
      ) {
        throw createCustomElementNotDefinedError(name);
      } else if (
        mustHaveSameConstructor
        && (customElementConstructor !== getCustomElementConstructor())
      ) {
        throw createNamesMismatchError(name);
      } else {
        return new VirtualCustomElementNode<ICustomElementConfig<GElement>>({
          name,
          slots,
        });
      }
    },
  };
}
