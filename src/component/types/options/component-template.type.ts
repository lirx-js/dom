import {
  IVirtualCustomElementNodeSlotsMap,
} from '../../../dom-manipulation/virtual-nodes/virtual-custom-element-node/members/slots/virtual-custom-element-node-slots-map.type';
import { VirtualDOMNode } from '../../../dom-manipulation/virtual-nodes/virtual-dom-node/virtual-dom-node.class';

export interface IComponentTemplate<GData extends object> {
  (
    parentNode: VirtualDOMNode,
    $: GData,
    slots: IVirtualCustomElementNodeSlotsMap,
  ): void;
}

export type IGenericComponentTemplate = IComponentTemplate<object>;
