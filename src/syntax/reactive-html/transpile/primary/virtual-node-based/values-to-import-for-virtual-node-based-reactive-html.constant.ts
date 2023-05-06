import { toObservableThrowIfUndefined } from '@lirx/core';
import {
  virtualCustomElementNodeSetCaseInsensitiveReactiveInputLike,
} from '../../../../../dom-manipulation/virtual-nodes/virtual-custom-element-node/members/inputs/case-insensitive/virtual-custom-element-node-set-case-insensitive-reactive-input-like';
import {
  virtualCustomElementNodeSetCaseInsensitiveReactiveOutput,
} from '../../../../../dom-manipulation/virtual-nodes/virtual-custom-element-node/members/outputs/case-insensitive/virtual-custom-element-node-set-case-insensitive-reactive-output';
import {
  virtualCustomElementNodeSetCaseInsensitiveReactiveOutputFromObservable,
} from '../../../../../dom-manipulation/virtual-nodes/virtual-custom-element-node/members/outputs/case-insensitive/virtual-custom-element-node-set-case-insensitive-reactive-output-from-observable';
import {
  virtualElementNodeAppendClassName,
} from '../../../../../dom-manipulation/virtual-nodes/virtual-element-node/members/class-name/virtual-element-node-append-class-name';
import {
  virtualReactiveElementNodeSetCaseInsensitiveReactiveProperty,
} from '../../../../../dom-manipulation/virtual-nodes/virtual-element-node/members/property/case-insensitive/virtual-reactive-element-node-set-case-insensitive-reactive-property';
import {
  VirtualReactiveAsyncNode,
} from '../../../../../dom-manipulation/virtual-nodes/virtual-reactive-async-node/virtual-reactive-async-node.class';
import {
  VirtualReactiveElementNode,
} from '../../../../../dom-manipulation/virtual-nodes/virtual-reactive-element-node/virtual-reactive-element-node.class';
import {
  VirtualReactiveForLoopNode,
} from '../../../../../dom-manipulation/virtual-nodes/virtual-reactive-for-loop-node/virtual-reactive-for-loop-node.class';
import {
  VirtualReactiveIfNode,
} from '../../../../../dom-manipulation/virtual-nodes/virtual-reactive-if-node/virtual-reactive-if-node.class';
import {
  VirtualReactiveSwitchNode,
} from '../../../../../dom-manipulation/virtual-nodes/virtual-reactive-switch-node/virtual-reactive-switch-node.class';
import {
  VirtualReactiveTextNode,
} from '../../../../../dom-manipulation/virtual-nodes/virtual-reactive-text-node/virtual-reactive-text-node.class';
import { VirtualTextNode } from '../../../../../dom-manipulation/virtual-nodes/virtual-text-node/virtual-text-node';

export const VALUES_TO_IMPORT_FOR_VIRTUAL_NODE_BASED_REACTIVE_HTML = {
  VirtualTextNode,
  VirtualReactiveElementNode,
  VirtualReactiveTextNode,
  VirtualReactiveIfNode,
  VirtualReactiveSwitchNode,
  VirtualReactiveForLoopNode,
  VirtualReactiveAsyncNode,
  toObservableThrowIfUndefined,
  virtualElementNodeAppendClassName,
  // getCaseInsensitiveVirtualElementNodePropertyKey,
  virtualReactiveElementNodeSetCaseInsensitiveReactiveProperty,
  virtualCustomElementNodeSetCaseInsensitiveReactiveInputLike,
  virtualCustomElementNodeSetCaseInsensitiveReactiveOutput,
  virtualCustomElementNodeSetCaseInsensitiveReactiveOutputFromObservable,
};
