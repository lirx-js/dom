import { VirtualCustomElementNode } from '../../../../virtual-node/dom/nodes/reactive/custom-element/virtual-custom-element-node.class';
import { IComponent } from '../../../types/component.type';

export interface ICustomElementConstructor<GElement extends HTMLElement> {
  new(...args: any[]): GElement;
}

export interface ICustomElementConfig<GElement extends HTMLElement> {
  element: GElement;
}

export type ICustomElementComponent<GElement extends HTMLElement> = IComponent<ICustomElementConfig<GElement>>;

export type ICustomElementVirtualCustomElementNode<GElement extends HTMLElement> = VirtualCustomElementNode<ICustomElementConfig<GElement>>;
