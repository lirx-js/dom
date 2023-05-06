import { IGenericVirtualCustomElementNode } from '../../../generic-virtual-custom-element-node.type';
import { VirtualCustomElementNode } from '../../../virtual-custom-element-node.class';
import { IVirtualCustomElementNodeConfig } from '../../config/virtual-custom-element-node-config.type';
import { getVirtualCustomElementNodeInputsMap } from './get-virtual-custom-element-node-inputs-map';
import { InferCaseInsensitiveInputKey } from './infer-case-insensitive-input-key.type';

export function getCaseInsensitiveVirtualCustomElementNodeInputKey<GConfig extends IVirtualCustomElementNodeConfig, GKey extends string>(
  node: VirtualCustomElementNode<GConfig>,
  key: GKey,
): InferCaseInsensitiveInputKey<GConfig, GKey> {
  const map: ILowerCaseKeysMap = getCachedLowerCaseVirtualCustomElementNodeInputKeysMap(node);

  const _key: string | undefined = map.get(key.toLowerCase());
  if (_key === void 0) {
    throw new Error(`Input '${key}' not found`);
  } else {
    return _key as InferCaseInsensitiveInputKey<GConfig, GKey>;
  }
}

/*--------------------*/

type ILowerCaseKeysMap = ReadonlyMap<string, string>;

const LOWER_CASE_VIRTUAL_CUSTOM_ELEMENT_NODE_INPUT_KEYS_MAP = new WeakMap<IGenericVirtualCustomElementNode, ReadonlyMap<string, string>>();

function getCachedLowerCaseVirtualCustomElementNodeInputKeysMap(
  node: IGenericVirtualCustomElementNode,
): ILowerCaseKeysMap {
  let map: ILowerCaseKeysMap | undefined = LOWER_CASE_VIRTUAL_CUSTOM_ELEMENT_NODE_INPUT_KEYS_MAP.get(node);
  if (map === void 0) {
    map = new Map(
      Array.from(
        getVirtualCustomElementNodeInputsMap(node).keys(),
        (key: string) => [key.toLowerCase(), key],
      ),
    );
    LOWER_CASE_VIRTUAL_CUSTOM_ELEMENT_NODE_INPUT_KEYS_MAP.set(node, map);
  }
  return map;
}

