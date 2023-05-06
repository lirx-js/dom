import {
  IVirtualCustomElementNodeConfig,
} from '../../dom-manipulation/virtual-nodes/virtual-custom-element-node/members/config/virtual-custom-element-node-config.type';
import { IComponentCreateFunction, IGenericComponent } from '../types/component.type';

export type ICustomElementList = readonly IGenericComponent[];

export interface ICreateCustomElementFunction<GConfig extends IVirtualCustomElementNodeConfig> {
  (
    name: string,
    ...args: Parameters<IComponentCreateFunction<GConfig>>
  ): ReturnType<IComponentCreateFunction<GConfig>>;
}

export function generateCreateCustomElementFunction<GConfig extends IVirtualCustomElementNodeConfig>(
  customElements: ICustomElementList = [],
): ICreateCustomElementFunction<GConfig> {
  const customElementsMap = new Map<string, IGenericComponent>(
    customElements.map((customElement: IGenericComponent): [string, IGenericComponent] => {
      return [customElement.name, customElement];
    }),
  );

  return (
    name: string,
    ...args: Parameters<IComponentCreateFunction<GConfig>>
  ): ReturnType<IComponentCreateFunction<GConfig>> => {
    if (customElementsMap.has(name)) {
      return customElementsMap.get(name)!.create(...args);
    } else {
      throw new Error(`Missing import of custom element '${name}'`);
    }
  };
}
