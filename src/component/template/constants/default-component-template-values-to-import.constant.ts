import { toObservableThrowIfUndefined } from '../../../misc/to-observable';
import { VirtualReactiveElementNode } from '../../../virtual-node/dom/nodes/reactive/element/virtual-reactive-element-node.class';
import { VirtualReactiveForLoopNode } from '../../../virtual-node/dom/nodes/reactive/for-loop/virtual-reactive-for-loop-node.class';
import { VirtualReactiveIfNode } from '../../../virtual-node/dom/nodes/reactive/if/virtual-reactive-if-node.class';
import { VirtualReactiveSwitchNode } from '../../../virtual-node/dom/nodes/reactive/switch/virtual-reactive-switch-node.class';
import { VirtualReactiveTextNode } from '../../../virtual-node/dom/nodes/reactive/text/virtual-reactive-text-node.class';
import { VirtualTextNode } from '../../../virtual-node/dom/nodes/static/text/virtual-text-node';

export const DEFAULT_COMPONENT_TEMPLATE_VALUES_TO_IMPORT = {
  VirtualTextNode,
  VirtualReactiveElementNode,
  VirtualReactiveTextNode,
  VirtualReactiveIfNode,
  VirtualReactiveSwitchNode,
  VirtualReactiveForLoopNode,
  toObservableThrowIfUndefined,
};
