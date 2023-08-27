import { InferCaseInsensitiveKeyMapGetReturn } from '../../../../../../misc/classes/case-insensitive-key-map.class';
import { InferElementKeys } from '../infer-element-keys.type';

export type InferCaseInsensitivePropertyKeyOfVirtualReactiveElementNode<GElementNode extends Element, GCaseInsensitiveKey extends string> =
  InferCaseInsensitiveKeyMapGetReturn<InferElementKeys<GElementNode>, GCaseInsensitiveKey>;
