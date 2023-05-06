import { IObservable, IObserver, IUnsubscribeOfObservable } from '@lirx/core';
import { IUnsubscribe } from '@lirx/utils';
import { VirtualNode } from '../../virtual-node.class';

export function virtualNodeSubscribeToObservableWithObservableOfObservers<GValue>(
  node: VirtualNode,
  observable$: IObservable<GValue>,
  observer$: IObservable<IObserver<GValue>>,
): IUnsubscribe {
  // const [emit, unsubscribeOfObservableOfObserver] = mapObservableToObserver(node.onConnected$(observer$), (observer: IObserver<GValue>) => {
  //   return observer;
  // });
  //
  // const unsubscribeOfConnected = node.onConnected$(observable$)(emit);
  //
  // return (): void => {
  //   unsubscribeOfConnected();
  //   unsubscribeOfObservableOfObserver();
  // };

  let running: boolean = true;

  /* OBSERVABLE OF OBSERVER */

  let _unsubscribeOfObservableOfObserver: IUnsubscribeOfObservable | undefined;

  const unsubscribeOfObservableOfObserver = (): void => {
    if (_unsubscribeOfObservableOfObserver !== void 0) {
      _unsubscribeOfObservableOfObserver();
    }
  };

  /* EVENT */

  const subscribeToObservable = (
    observer: IObserver<GValue>,
  ): void => {
    unsubscribeOfObservable();
    _unsubscribeOfObservable = observable$(observer);
  };

  let _unsubscribeOfObservable: IUnsubscribeOfObservable | undefined;

  const unsubscribeOfObservable = (): void => {
    if (_unsubscribeOfObservable !== void 0) {
      _unsubscribeOfObservable();
    }
  };

  /* CONNECTED */

  const unsubscribeOfConnected = node.isConnected$((connected: boolean): void => {
    if (connected) {
      _unsubscribeOfObservableOfObserver = observer$(subscribeToObservable);
    } else {
      unsubscribeOfObservableOfObserver();
      _unsubscribeOfObservableOfObserver = void 0;
    }
  });

  return (): void => {
    if (running) {
      running = false;
      unsubscribeOfConnected();
      unsubscribeOfObservableOfObserver();
      unsubscribeOfObservable();
    }
  };
}
