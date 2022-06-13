import {
  IVirtualCustomElementNodeSlotsMap,
} from '../../../virtual-node/dom/nodes/reactive/custom-element/slots/virtual-custom-element-node-slots-map.type';
import { VirtualDOMNode } from '../../../virtual-node/dom/virtual-dom-node.class';

export interface IComponentTemplate<GData extends object> {
  (
    parentNode: VirtualDOMNode,
    $: GData,
    slots: IVirtualCustomElementNodeSlotsMap,
  ): void;
}

export type IGenericComponentTemplate = IComponentTemplate<object>;
