import { unknownToObservableNotUndefined } from '@lirx/core';
import {
  virtualElementNodeAppendClassName,
} from '../../../../../dom-manipulation/virtual-nodes/virtual-element-node/members/class-name/virtual-element-node-append-class-name';
import {
  VirtualReactiveAsyncNode,
} from '../../../../../dom-manipulation/virtual-nodes/virtual-reactive-async-node/virtual-reactive-async-node.class';
import {
  virtualReactiveElementNodeSetCaseInsensitiveReactiveProperty,
} from '../../../../../dom-manipulation/virtual-nodes/virtual-reactive-element-node/members/property/case-insensitive/virtual-reactive-element-node-set-case-insensitive-reactive-property';
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
import { SHARED_VALUES_TO_IMPORT } from '../shared/values-to-import/shared-values-to-import.constant';
import {
  bindCaseInsensitiveInputWithObservableLike,
} from '../../../../../dom-manipulation/virtual-nodes/virtual-component-node/data/inputs/case-insensitive/bind/bind-case-insensitive-input-with-observable-like';
import {
  bindCaseInsensitiveOutputWithObserverLike,
} from '../../../../../dom-manipulation/virtual-nodes/virtual-component-node/data/outputs/case-insensitive/bind/bind-case-insensitive-output-with-observer-like';
import {
  bindCaseInsensitiveOutputWithObservableOfObserver,
} from '../../../../../dom-manipulation/virtual-nodes/virtual-component-node/data/outputs/case-insensitive/bind/bind-case-insensitive-output-with-observable-of-observer';

export const VALUES_TO_IMPORT_FOR_VIRTUAL_NODE_BASED_REACTIVE_HTML = {
  ...SHARED_VALUES_TO_IMPORT,
  VirtualTextNode,
  VirtualReactiveElementNode,
  VirtualReactiveTextNode,
  VirtualReactiveIfNode,
  VirtualReactiveSwitchNode,
  VirtualReactiveForLoopNode,
  VirtualReactiveAsyncNode,
  unknownToObservableNotUndefined,
  virtualElementNodeAppendClassName,
  virtualReactiveElementNodeSetCaseInsensitiveReactiveProperty,
  bindCaseInsensitiveInputWithObservableLike,
  bindCaseInsensitiveOutputWithObservableOfObserver,
  bindCaseInsensitiveOutputWithObserverLike,
};
