import { createListenerBuilderFunctions, createListenerMap } from '@lirx/core';
import { IParentNode } from '../../properties/get-parent-node';

export type INodePositionChangeValue = null | IParentNode;

const ON_NODE_POSITION_CHANGE_LISTENERS = createListenerMap<Node, INodePositionChangeValue>();

export const {
  listener: onNodePositionChangeListener,
  dispatch: dispatchNodePositionChange,
} = createListenerBuilderFunctions(ON_NODE_POSITION_CHANGE_LISTENERS);



