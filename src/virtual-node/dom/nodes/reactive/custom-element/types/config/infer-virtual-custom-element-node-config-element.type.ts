import { IVirtualCustomElementNodeConfig } from './virtual-custom-element-node-config.type';

export type InferVirtualCustomElementNodeConfigElement<GConfig extends IVirtualCustomElementNodeConfig> =
  GConfig['element'] extends HTMLElement
    ? GConfig['element']
    : HTMLElement;
