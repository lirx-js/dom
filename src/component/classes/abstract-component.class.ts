import {
  IVirtualComponentNodeSlotsMap,
} from '../../dom-manipulation/virtual-nodes/virtual-component-node/types/slots/virtual-component-node-slots-map.type';

import { IComponentVirtualComponentNode } from './types/component-virtual-component-node.type';

export abstract class AbstractComponent<GElement extends Element, GData extends object> {
  readonly #name: string;

  protected constructor(
    name: string,
  ) {
    this.#name = name;
  }

  get name(): string {
    return this.#name;
  }

  abstract create(
    slots?: IVirtualComponentNodeSlotsMap,
  ): IComponentVirtualComponentNode<GElement, GData> ;
}

export type IGenericAbstractComponent = AbstractComponent<any, any>;
