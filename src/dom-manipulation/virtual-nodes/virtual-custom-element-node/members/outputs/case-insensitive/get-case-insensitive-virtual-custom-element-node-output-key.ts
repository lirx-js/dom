import { IGenericVirtualCustomElementNode } from '../../../generic-virtual-custom-element-node.type';
import { VirtualCustomElementNode } from '../../../virtual-custom-element-node.class';
import { IVirtualCustomElementNodeConfig } from '../../config/virtual-custom-element-node-config.type';
import { getVirtualCustomElementNodeOutputsMap } from './get-virtual-custom-element-node-outputs-map';
import { InferCaseInsensitiveOutputKey } from './infer-case-insensitive-output-key.type';

export function getCaseInsensitiveVirtualCustomElementNodeOutputKey<GConfig extends IVirtualCustomElementNodeConfig, GKey extends string>(
  node: VirtualCustomElementNode<GConfig>,
  key: GKey,
): InferCaseInsensitiveOutputKey<GConfig, GKey> {
  const map: ILowerCaseKeysMap = getCachedLowerCaseVirtualCustomElementNodeOutputKeysMap(node);

  const _key: string | undefined = map.get(key.toLowerCase());
  if (_key === void 0) {
    throw new Error(`Output '${key}' not found`);
  } else {
    return _key as InferCaseInsensitiveOutputKey<GConfig, GKey>;
  }
}

/*--------------------*/

type ILowerCaseKeysMap = ReadonlyMap<string, string>;

const LOWER_CASE_VIRTUAL_CUSTOM_ELEMENT_NODE_OUTPUT_KEYS_MAP = new WeakMap<IGenericVirtualCustomElementNode, ReadonlyMap<string, string>>();

function getCachedLowerCaseVirtualCustomElementNodeOutputKeysMap(
  node: IGenericVirtualCustomElementNode,
): ILowerCaseKeysMap {
  let map: ILowerCaseKeysMap | undefined = LOWER_CASE_VIRTUAL_CUSTOM_ELEMENT_NODE_OUTPUT_KEYS_MAP.get(node);
  if (map === void 0) {
    map = new Map(
      Array.from(
        getVirtualCustomElementNodeOutputsMap(node).keys(),
        (key: string) => [key.toLowerCase(), key],
      ),
    );
    LOWER_CASE_VIRTUAL_CUSTOM_ELEMENT_NODE_OUTPUT_KEYS_MAP.set(node, map);
  }
  return map;
}

