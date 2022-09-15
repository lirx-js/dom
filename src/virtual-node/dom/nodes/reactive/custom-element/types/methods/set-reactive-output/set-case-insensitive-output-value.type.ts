import { IVirtualCustomElementNodeConfig } from '../../config/virtual-custom-element-node-config.type';
import { InferVirtualCustomElementNodeSetReactiveOutputKeys } from './infer-virtual-custom-element-node-set-reactive-output-keys.type';
import {
  InferVirtualCustomElementNodeSetReactiveOutputValueFromKey,
} from './infer-virtual-custom-element-node-set-reactive-output-value-from-key.type';

export type ISetCaseInsensitiveOutputValue<// generics
  GConfig extends IVirtualCustomElementNodeConfig,
  GKey extends string
  //
  > =
  GKey extends InferVirtualCustomElementNodeSetReactiveOutputKeys<GConfig>
    ? InferVirtualCustomElementNodeSetReactiveOutputValueFromKey<GConfig, GKey>
    : any;
