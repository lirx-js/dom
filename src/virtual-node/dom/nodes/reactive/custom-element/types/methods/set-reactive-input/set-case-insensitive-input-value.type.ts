import { IVirtualCustomElementNodeConfig } from '../../config/virtual-custom-element-node-config.type';
import { InferVirtualCustomElementNodeSetReactiveInputKeys } from './infer-virtual-custom-element-node-set-reactive-input-keys.type';
import {
  InferVirtualCustomElementNodeSetReactiveInputValueFromKey,
} from './infer-virtual-custom-element-node-set-reactive-input-value-from-key.type';

export type ISetCaseInsensitiveInputValue<// generics
  GConfig extends IVirtualCustomElementNodeConfig,
  GKey extends string
  //
  > =
  GKey extends InferVirtualCustomElementNodeSetReactiveInputKeys<GConfig>
    ? InferVirtualCustomElementNodeSetReactiveInputValueFromKey<GConfig, GKey>
    : any;
