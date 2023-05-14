import { IObservable, IObserver } from '@lirx/core';
import { IUnsubscribe } from '@lirx/utils';
import {
  virtualNodeSubscribeToObservableWithObservableOfObservers,
} from '../../../virtual-node/members/misc/virtual-node-subscribe-to-observable-with-observable-of-observers';
import { IGenericVirtualReactiveElementNode } from '../../generic-virtual-reactive-element-node.type';

export function virtualReactiveElementNodeSetReactiveEventListenerFromObservable<GEvent extends Event>(
  node: IGenericVirtualReactiveElementNode,
  type: string,
  observer$: IObservable<IObserver<GEvent>>,
  options?: boolean | AddEventListenerOptions,
): IUnsubscribe {
  return virtualNodeSubscribeToObservableWithObservableOfObservers(
    node,
    node.on$(type, options),
    observer$,
  );
}
