import { IObservableLike, unknownToObservableNotUndefined } from '@lirx/core';
import { IUnsubscribe } from '@lirx/unsubscribe';
import {
  IAttributeWriteValue,
} from '../../../../../../dom-manipulation/virtual-nodes/virtual-element-node/members/attribute/attribute-value.type';
import {
  IGenericVirtualReactiveElementNode,
} from '../../../../../../dom-manipulation/virtual-nodes/virtual-reactive-element-node/generic-virtual-reactive-element-node.type';
import { inlineLastLines } from '../../../../../misc/lines/functions/after-last-line';
import { ILines } from '../../../../../misc/lines/lines.type';
import {
  ITranspileSetReactiveAttributeToJSLinesFunction,
  ITranspileSetReactiveAttributeToJSLinesOptions,
} from '../../transpilers/transpile-set-reactive-attribute-to-js-lines.type';

export const transpileAOTSetReactiveAttributeToJSLines: ITranspileSetReactiveAttributeToJSLinesFunction = (
  {
    node,
    name,
    value,
  }: ITranspileSetReactiveAttributeToJSLinesOptions,
): ILines => {
  return inlineLastLines(
    [`aot_11(`],
    node,
    [', '],
    name,
    [', '],
    value,
    [');'],
  );
};

export function aot_11(
  node: IGenericVirtualReactiveElementNode,
  name: string,
  value$: IObservableLike<IAttributeWriteValue>,
): IUnsubscribe {
  return node.setReactiveAttribute(
    name,
    unknownToObservableNotUndefined(value$),
  );
}
