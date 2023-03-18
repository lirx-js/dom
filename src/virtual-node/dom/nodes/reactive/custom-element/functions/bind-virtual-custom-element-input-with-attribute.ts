import { fromMutationObserver, merge, single, IMapFilterMapFunctionReturn, MAP_FILTER_DISCARD } from '@lirx/core';
import {
  InferTypedSourcesMapEntriesTupleKeys
} from '../../../../../../misc/typed-sources-map/types/infer-typed-sources-map-entries-tuple-keys.infer';
import {
  InferTypedSourcesMapEntriesTupleValueFromKey
} from '../../../../../../misc/typed-sources-map/types/infer-typed-sources-map-entries-tuple-value-from-key.infer';
import { IAttributeValue } from '../../../static/element/attribute/attribute-value.type';
import { InferVirtualCustomElementNodeConfigInputs } from '../types/config/infer-virtual-custom-element-node-config-inputs.type';
import { IVirtualCustomElementNodeConfig } from '../types/config/virtual-custom-element-node-config.type';
import { VirtualCustomElementNode } from '../virtual-custom-element-node.class';

export interface IAttributeValueToValueFunction<GValue> {
  (
    value: IAttributeValue,
  ): IMapFilterMapFunctionReturn<GValue>;
}

export interface IValueToAttributeValueFunction<GValue> {
  (
    value: GValue,
  ): IAttributeValue;
}

export type InferInputKeysFromVirtualCustomElementNodeConfig<GConfig extends IVirtualCustomElementNodeConfig> = InferTypedSourcesMapEntriesTupleKeys<InferVirtualCustomElementNodeConfigInputs<GConfig>>;
export type InferInputValueFromVirtualCustomElementNodeConfigAndKey<GConfig extends IVirtualCustomElementNodeConfig, GKey extends  InferInputKeysFromVirtualCustomElementNodeConfig<GConfig>> = InferTypedSourcesMapEntriesTupleValueFromKey<InferVirtualCustomElementNodeConfigInputs<GConfig>, GKey>;


export function bindVirtualCustomElementInputWithAttribute<GConfig extends IVirtualCustomElementNodeConfig, GKey extends  InferInputKeysFromVirtualCustomElementNodeConfig<GConfig>>(
  node: VirtualCustomElementNode<GConfig>,
  key: GKey,
  attributeValueToValueFunction: IAttributeValueToValueFunction<InferInputValueFromVirtualCustomElementNodeConfigAndKey<GConfig, GKey>>,
  valueToAttributeValueFunction?: IValueToAttributeValueFunction<InferInputValueFromVirtualCustomElementNodeConfigAndKey<GConfig, GKey>>,
): void {
  type GValue = InferInputValueFromVirtualCustomElementNodeConfigAndKey<GConfig, GKey>;

  const $value$ = node.inputs.getSource(key);

  const attributesChange$ = merge([
    single(null),
    fromMutationObserver(node.elementNode, {
      attributes: true,
      attributeFilter: [key],
    }),
  ]);

  node.onConnected$(attributesChange$)((): void => {
    const value: IMapFilterMapFunctionReturn<GValue> = attributeValueToValueFunction(node.getAttribute(key));
    if (
      (value !== MAP_FILTER_DISCARD)
      && (value !== $value$.getValue())
    ) {
      $value$.emit(value);
    }
  });

  if (valueToAttributeValueFunction !== void 0) {
    node.onConnected$($value$.subscribe)((value: GValue): void => {
      node.setAttribute(key, valueToAttributeValueFunction(value));
    });
  }
}
