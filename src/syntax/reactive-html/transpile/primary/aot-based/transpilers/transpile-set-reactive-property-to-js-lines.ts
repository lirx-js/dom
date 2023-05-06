import { IObservable } from '@lirx/core';
import { IUnsubscribe } from '@lirx/utils';
import {
  InferVirtualElementNodeSetCaseInsensitivePropertyValue,
} from '../../../../../../dom-manipulation/virtual-nodes/virtual-element-node/members/property/case-insensitive/infer-virtual-element-node-set-case-insensitive-property-value.type';
import {
  virtualReactiveElementNodeSetCaseInsensitiveReactiveProperty,
} from '../../../../../../dom-manipulation/virtual-nodes/virtual-element-node/members/property/case-insensitive/virtual-reactive-element-node-set-case-insensitive-reactive-property';
import {
  VirtualReactiveElementNode,
} from '../../../../../../dom-manipulation/virtual-nodes/virtual-reactive-element-node/virtual-reactive-element-node.class';
import { inlineLastLines } from '../../../../../misc/lines/functions/after-last-line';
import { ILines } from '../../../../../misc/lines/lines.type';
import {
  ITranspileSetReactivePropertyToJSLinesFunction,
  ITranspileSetReactivePropertyToJSLinesOptions,
} from '../../transpilers/transpile-set-reactive-property-to-js-lines.type';

export const transpileAOTSetReactivePropertyToJSLines: ITranspileSetReactivePropertyToJSLinesFunction = (
  {
    node,
    name,
    value,
  }: ITranspileSetReactivePropertyToJSLinesOptions,
): ILines => {
  return inlineLastLines(
    [`aot_19(`],
    node,
    [', '],
    name,
    [', '],
    value,
    [');'],
  );
};

export function aot_19<GElementNode extends Element, GPropertyKey extends string>(
  node: VirtualReactiveElementNode<GElementNode>,
  propertyKey: GPropertyKey,
  value$: IObservable<InferVirtualElementNodeSetCaseInsensitivePropertyValue<GElementNode, GPropertyKey>>,
): IUnsubscribe {
  return virtualReactiveElementNodeSetCaseInsensitiveReactiveProperty<GElementNode, GPropertyKey>(
    node,
    propertyKey,
    value$,
  );
}


