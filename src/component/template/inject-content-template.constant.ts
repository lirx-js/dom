import {
  IVirtualCustomElementNodeSlotsMap,
} from '../../dom-manipulation/virtual-nodes/virtual-custom-element-node/members/slots/virtual-custom-element-node-slots-map.type';
import { VirtualDOMNode } from '../../dom-manipulation/virtual-nodes/virtual-dom-node/virtual-dom-node.class';
import { IComponentTemplate } from '../types/options/component-template.type';

export const INJECT_CONTENT_TEMPLATE: IComponentTemplate<any> = (
  parentNode: VirtualDOMNode,
  $: any,
  slots: IVirtualCustomElementNodeSlotsMap,
): void => {
  if (slots.has('*')) {
    slots.get('*')!(parentNode, {});
  }
};
