import { InferCaseInsensitiveObjectKey } from '../../../../../../misc/types/infer-case-insensitive-object-key.type';
import { IGenericVirtualElementNode } from '../../../generic-virtual-element-node.type';
import { VirtualElementNode } from '../../../virtual-element-node.class';

export function getCaseInsensitiveVirtualElementNodePropertyKey<GElementNode extends Element, GPropertyKey extends string>(
  node: VirtualElementNode<GElementNode>,
  propertyKey: GPropertyKey,
): InferCaseInsensitiveObjectKey<GElementNode, GPropertyKey> {
  const map: ILowerCasePropertyKeysMap = getCachedLowerCaseVirtualElementNodePropertyKeysMap(node);

  const _propertyKey: string | undefined = map.get(propertyKey.toLowerCase());
  if (_propertyKey === void 0) {
    throw new Error(`Property '${propertyKey}' not found`);
  } else {
    return _propertyKey as InferCaseInsensitiveObjectKey<GElementNode, GPropertyKey>;
  }
}

/*--------------------*/

type ILowerCasePropertyKeysMap = ReadonlyMap<string, string>;

const LOWER_CASE_VIRTUAL_ELEMENT_NODE_PROPERTY_KEYS_MAP = new WeakMap<IGenericVirtualElementNode, ReadonlyMap<string, string>>();

function getCachedLowerCaseVirtualElementNodePropertyKeysMap(
  node: IGenericVirtualElementNode,
): ILowerCasePropertyKeysMap {
  let map: ILowerCasePropertyKeysMap | undefined = LOWER_CASE_VIRTUAL_ELEMENT_NODE_PROPERTY_KEYS_MAP.get(node);
  if (map === void 0) {
    map = getCachedLowerCaseObjectPropertyKeysMap(Object.getPrototypeOf(node.elementNode));
    LOWER_CASE_VIRTUAL_ELEMENT_NODE_PROPERTY_KEYS_MAP.set(node, map);
  }
  return map;
}

/*---*/

const LOWER_CASE_OBJECT_PROPERTY_KEYS_MAP = new WeakMap<object, ILowerCasePropertyKeysMap>();

function getCachedLowerCaseObjectPropertyKeysMap(
  input: object,
): ILowerCasePropertyKeysMap {
  let map: ILowerCasePropertyKeysMap | undefined = LOWER_CASE_OBJECT_PROPERTY_KEYS_MAP.get(input);
  if (map === void 0) {
    // console.log('gen map for', input);

    const entries: [string, string][] = [];
    for (const key in input) {
      entries.push([
        key.toLowerCase(),
        key,
      ]);
    }

    map = new Map<string, string>(entries);

    LOWER_CASE_OBJECT_PROPERTY_KEYS_MAP.set(input, map);
  }
  return map;
}
