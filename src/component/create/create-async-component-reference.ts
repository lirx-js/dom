import { fulfilled$$, IDefaultNotificationsUnion, IObservable, singleN, throwError } from '@lirx/core';
import { createNamesMismatchError } from '../errors/create-names-mismatch-error';
import {
  IVirtualCustomElementNodeSlotsMap
} from '../../dom-manipulation/virtual-nodes/virtual-custom-element-node/members/slots/virtual-custom-element-node-slots-map.type';
import {
  IVirtualCustomElementNodeConfig
} from '../../dom-manipulation/virtual-nodes/virtual-custom-element-node/members/config/virtual-custom-element-node-config.type';
import { VirtualCustomElementNode } from '../../dom-manipulation/virtual-nodes/virtual-custom-element-node/virtual-custom-element-node.class';
import { IComponent } from '../types/component.type';

export type IAsyncComponent<GConfig extends IVirtualCustomElementNodeConfig> = IObservable<IDefaultNotificationsUnion<IComponent<GConfig>>>;

export type ICreateAsyncComponentReferenceResult<GConfig extends IVirtualCustomElementNodeConfig> = [
  component$: IAsyncComponent<GConfig>,
  component: IComponent<GConfig>,
];

export function createAsyncComponentReference<GConfig extends IVirtualCustomElementNodeConfig>(
  name: string,
  component$: IAsyncComponent<GConfig>,
): ICreateAsyncComponentReferenceResult<GConfig> {
  let _component: IComponent<GConfig> | undefined;

  const _component$ = fulfilled$$(component$, (component: IComponent<GConfig>): IAsyncComponent<GConfig> => {
    if (_component === void 0) {
      if (component.name === name) {
        _component = component;
        return singleN(component);
      } else {
        return throwError(createNamesMismatchError(name, component.name));
      }
    } else if (component === _component) {
      return singleN(component);
    } else {
      return throwError(new Error(`The component '${name}' received two different references`));
    }
  });

  const _proxyComponent: IComponent<GConfig> = {
    name,
    create: (
      slots?: IVirtualCustomElementNodeSlotsMap,
    ): VirtualCustomElementNode<GConfig> => {
      if (_component === void 0) {
        throw new Error(`The component '${name}' is not loaded`);
      } else {
        return _component.create(slots);
      }
    },
  };

  return [
    _component$,
    _proxyComponent,
  ];
}
