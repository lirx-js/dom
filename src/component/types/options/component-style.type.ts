import {
  IGenericGenericVirtualCustomElementNode,
} from '../../../virtual-node/dom/nodes/reactive/custom-element/virtual-custom-element-node.class';

export interface IComponentStyle {
  (
    node: IGenericGenericVirtualCustomElementNode,
  ): void;
}
