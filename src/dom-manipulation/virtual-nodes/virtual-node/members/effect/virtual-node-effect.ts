import { effect, IEffectOptions, IEffetFunction } from '@lirx/core';
import { IUnsubscribe } from '@lirx/utils';
import { VirtualNode } from '../../virtual-node.class';

export function virtualNodeEffect(
  node: VirtualNode,
  effectFunction: IEffetFunction,
  options?: IEffectOptions,
): IUnsubscribe {
  let _unsubscribeOfEffect: IUnsubscribe;

  const subscribeToEffect = (): void => {
    _unsubscribeOfEffect = effect(effectFunction, options);
  };

  const unsubscribeOfEffect = (): void => {
    if (_unsubscribeOfEffect !== void 0) {
      _unsubscribeOfEffect();
    }
  };

  const unsubscribeOfIsConnectedObservable = node.isConnected$((connected: boolean): void => {
    if (connected) {
      subscribeToEffect();
    } else {
      unsubscribeOfEffect();
    }
  });

  return (): void => {
    unsubscribeOfIsConnectedObservable();
    unsubscribeOfEffect();
  };
}
