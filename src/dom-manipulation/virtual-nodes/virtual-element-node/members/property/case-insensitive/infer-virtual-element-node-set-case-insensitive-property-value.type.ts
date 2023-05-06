import { InferCaseInsensitiveObjectKey } from '../../../../../../misc/types/infer-case-insensitive-object-key.type';

export type InferVirtualElementNodeSetCaseInsensitivePropertyValue<GElementNode extends Element, GPropertyKey extends string> =
  GElementNode[InferCaseInsensitiveObjectKey<GElementNode, GPropertyKey>];

