import {
  IVirtualCustomElementNodeSlotsMap,
} from '../../virtual-node/dom/nodes/reactive/custom-element/slots/virtual-custom-element-node-slots-map.type';
import { VirtualDOMNode } from '../../virtual-node/dom/virtual-dom-node.class';
import { IComponentTemplate } from '../types/options/component-template.type';

export const INJECT_CONTENT_TEMPLATE: IComponentTemplate<any> = (
  parentNode: VirtualDOMNode,
  $: any,
  slots: IVirtualCustomElementNodeSlotsMap,
): void => {
  if (slots.has('*')) {
    slots.get('*')!(parentNode);
  }
};
