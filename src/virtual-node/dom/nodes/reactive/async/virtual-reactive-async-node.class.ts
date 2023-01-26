import {
  createNotification, debounceMicrotask$$, debounceMicrotask$$$,
  defaultNotificationObserver,
  futureUnsubscribe,
  IDefaultNotificationsUnion,
  INotification,
  IObservable,
  IObserver,
  IUnsubscribe, TInferNotificationGName,
} from '@lirx/core';
import {
  IGenericVirtualReactiveDOMNodeTemplateOrNull,
  IVirtualReactiveDOMNodeTemplate,
} from '../../../types/virtual-reactive-dom-node-template.type';
import { VirtualContainerNode } from '../../static/container/virtual-container-node.class';

/*--------------------*/

type IVirtualReactiveAsyncNodeNotifications<GValue> =
  | INotification<'pending', void>
  | INotification<'fulfilled', GValue>
  | INotification<'rejected', unknown>
  ;

const STATIC_PENDING_NOTIFICATION = createNotification<'pending', void>('pending', void 0);

function defaultNotificationsObservableToVirtualReactiveAsyncNodeNotificationsObservable<GValue>(
  subscribe: IObservable<IDefaultNotificationsUnion<GValue>>,
): IObservable<IVirtualReactiveAsyncNodeNotifications<GValue>> {
  return (emit: IObserver<IVirtualReactiveAsyncNodeNotifications<GValue>>): IUnsubscribe => {
    let lastValue: GValue;

    return futureUnsubscribe((
      unsubscribe: IUnsubscribe,
    ): IUnsubscribe => {
      emit(STATIC_PENDING_NOTIFICATION);

      return subscribe(
        defaultNotificationObserver<GValue>(
          /* next */(value: GValue): void => {
            lastValue = value;
          },
          /* complete */(): void => {
            emit(createNotification<'fulfilled', GValue>('fulfilled', lastValue));
            unsubscribe();
          },
          /* error */(error: unknown): void => {
            emit(createNotification<'rejected', unknown>('rejected', error));
            unsubscribe();
          },
        ),
      );
    });
  };
}

/*--------------------*/

export type IVirtualReactiveAsyncNodePendingTemplate = IVirtualReactiveDOMNodeTemplate<{ value: undefined }>;
export type IVirtualReactiveAsyncNodeFulfilledTemplate<GValue> = IVirtualReactiveDOMNodeTemplate<{ value: GValue }>;
export type IVirtualReactiveAsyncNodeRejectedTemplate<GValue> = IVirtualReactiveDOMNodeTemplate<{ value: unknown }>;

/**
 * Represents an abstract Container Node in an abstract DOM,
 * whose content depends on the values sent by the Observable "value$".
 * Until a value is received, the template "templatePending" is used.
 * When a 'next' Notification followed by a 'complete' one is received, then "templateFulfilled" is used,
 * else an 'error' Notification is received, the "templateRejected" is used.
 * This is used as a conditionally displayed Node, depending on the state of a Notification Observable.
 * Usually, it helps to display async data with a loading step.
 */
export class VirtualReactiveAsyncNode<GValue> extends VirtualContainerNode {
  constructor(
    value$: IObservable<IDefaultNotificationsUnion<GValue>>,
    templatePending: IVirtualReactiveAsyncNodePendingTemplate | null = null,
    templateFulfilled: IVirtualReactiveAsyncNodeFulfilledTemplate<GValue> | null = null,
    templateRejected: IVirtualReactiveAsyncNodeRejectedTemplate<GValue> | null = null,
  ) {
    super();

    const state$: IObservable<IVirtualReactiveAsyncNodeNotifications<GValue>> = debounceMicrotask$$(
      defaultNotificationsObservableToVirtualReactiveAsyncNodeNotificationsObservable<GValue>(value$),
    );

    const getTemplate = (
      name: TInferNotificationGName<IVirtualReactiveAsyncNodeNotifications<GValue>>,
    ): IGenericVirtualReactiveDOMNodeTemplateOrNull => {
      switch (name) {
        case 'pending':
          return templatePending as IGenericVirtualReactiveDOMNodeTemplateOrNull;
        case 'fulfilled':
          return templateFulfilled as IGenericVirtualReactiveDOMNodeTemplateOrNull;
        case 'rejected':
          return templateRejected as IGenericVirtualReactiveDOMNodeTemplateOrNull;
      }
    };

    this.onConnected$<IVirtualReactiveAsyncNodeNotifications<GValue>>(state$)((
      {
        name,
        value,
      }: IVirtualReactiveAsyncNodeNotifications<GValue>,
    ): void => {
      this.detachChildren();

      const template: IGenericVirtualReactiveDOMNodeTemplateOrNull = getTemplate(name);
      if (template !== null) {
        template(this, {
          value,
        });
      }
    });
  }
}

