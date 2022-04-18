import { filterObservablePipe, IObservable, pipeObservable } from '@lirx/core';
import { getParentNode } from '../../properties/get-parent-node';
import { INodePositionChangeValue, onNodePositionChangeListener } from './on-node-position-change-listener';

export function onNodeParentChangeListener(target: Node): IObservable<INodePositionChangeValue> {
  return pipeObservable(onNodePositionChangeListener(target), [
    filterObservablePipe((previousParentNode: INodePositionChangeValue) => {
      return (getParentNode(target) !== previousParentNode);
    }),
  ]);
}
