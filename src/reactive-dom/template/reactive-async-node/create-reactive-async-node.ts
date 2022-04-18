import {
  createNotification, defaultNotificationObserver, futureUnsubscribe,
  IDefaultNotificationsUnion,
  INotification,
  IObservable,
  IObserver,
  IUnsubscribe,
} from '@lirx/core';
import { createReferenceNode } from '../../../light-dom/node/create/reference-node/create-reference-node';
import {
  attachOptionalReactiveHTMLTemplateToReferenceNode,
} from '../../../light-dom/node/create/reference-node/functions/attach/attach-optional-reactive-html-template-to-reference-node';
import { moveNodesWithReferenceNode } from '../../../light-dom/node/create/reference-node/functions/move/move-nodes-with-reference-node';
import { IReferenceNodeChildren } from '../../../light-dom/node/create/reference-node/reference-node-children.type';
import { IReferenceNode } from '../../../light-dom/node/create/reference-node/reference-node.type';
import { detachManyNodes } from '../../../light-dom/node/move/derived/batch/detach-many-nodes';
import { IGenericReactiveHTMLTemplateOrNull } from '../../../light-dom/template/reactive-html-template.type';
import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to/subscribe-on-node-connected-to';
import { createIncrementalUUID } from '../../../misc/uuid/incremental-uuid';

type IReactiveAsyncNodeNotifications<GValue> =
  | INotification<'pending', void>
  | INotification<'fulfilled', GValue>
  | INotification<'rejected', unknown>
  ;

const STATIC_PENDING_NOTIFICATION = createNotification<'pending', void>('pending', void 0);

function defaultNotificationsObservableToReactiveAsyncNodeNotificationsObservable<GValue>(
  subscribe: IObservable<IDefaultNotificationsUnion<GValue>>,
): IObservable<IReactiveAsyncNodeNotifications<GValue>> {
  return (emit: IObserver<IReactiveAsyncNodeNotifications<GValue>>): IUnsubscribe => {
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

const INCREMENTAL_ASYNC_UUID = createIncrementalUUID('ASYNC');

export function createReactiveAsyncNode<GValue>(
  subscribe: IObservable<IDefaultNotificationsUnion<GValue>>,
  templatePending: IGenericReactiveHTMLTemplateOrNull = null,
  templateFulfilled: IGenericReactiveHTMLTemplateOrNull = null,
  templateRejected: IGenericReactiveHTMLTemplateOrNull = null,
  transparent?: boolean,
): IReferenceNode {
  const referenceNode: IReferenceNode = createReferenceNode(INCREMENTAL_ASYNC_UUID(), transparent);

  let nodes: IReferenceNodeChildren = [];

  moveNodesWithReferenceNode(
    referenceNode,
    () => nodes,
  );

  const _subscribe: IObservable<IReactiveAsyncNodeNotifications<GValue>> = defaultNotificationsObservableToReactiveAsyncNodeNotificationsObservable<GValue>(subscribe);

  const getTemplate = (
    {
      name,
    }: IReactiveAsyncNodeNotifications<GValue>,
  ): IGenericReactiveHTMLTemplateOrNull => {
    switch (name) {
      case 'pending':
        return templatePending;
      case 'fulfilled':
        return templateFulfilled;
      case 'rejected':
        return templateRejected;
    }
  };

  subscribeOnNodeConnectedTo<IReactiveAsyncNodeNotifications<GValue>>(referenceNode, _subscribe, (notification: IReactiveAsyncNodeNotifications<GValue>): void => {
    detachManyNodes(nodes); // with events fine because we are connected, so parent cannot be a document fragment
    nodes = attachOptionalReactiveHTMLTemplateToReferenceNode(
      getTemplate(notification),
      {
        value: notification.value,
      },
      referenceNode,
    );
  });

  return referenceNode;
}
