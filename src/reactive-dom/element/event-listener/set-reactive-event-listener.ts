import { fromEventTarget, IObserver, IReadonlyEventTarget } from '@lirx/core';
import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to/subscribe-on-node-connected-to';

export function setReactiveEventListener<GType extends string, GEvent extends Event>(
  emit: IObserver<GEvent>,
  target: Node & IReadonlyEventTarget<Record<GType, GEvent>>,
  type: GType,
): void {
  subscribeOnNodeConnectedTo(target, fromEventTarget<GType, GEvent>(target, type), emit);
}

