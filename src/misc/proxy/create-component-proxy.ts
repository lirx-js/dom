import {
  createObservableProxy,
  idle,
  IObservableProxy,
  mapObservablePipe,
  pipeObservable,
  shareObservablePipe,
} from '@lirx/core';

export function createComponentProxy<GComponent extends HTMLElement>(
  component: GComponent,
): IObservableProxy<GComponent> {
  return createObservableProxy<GComponent>(pipeObservable(idle(), [
    mapObservablePipe<any, GComponent>(() => component),
    shareObservablePipe<GComponent>(),
  ]));
}
