import { IObservableLike, toObservableThrowIfUndefined } from '@lirx/core';
import {
  VirtualReactiveTextNode,
} from '../../../../../../dom-manipulation/virtual-nodes/virtual-reactive-text-node/virtual-reactive-text-node.class';
import { inlineLastLines } from '../../../../../misc/lines/functions/after-last-line';
import { ILines } from '../../../../../misc/lines/lines.type';
import {
  ITranspileCreateReactiveTextNodeToJSLinesFunction,
  ITranspileCreateReactiveTextNodeToJSLinesOptions,
} from '../../transpilers/transpile-create-reactive-text-node-to-js-lines.type';

export const transpileAOTCreateReactiveTextNodeToJSLines: ITranspileCreateReactiveTextNodeToJSLinesFunction = (
  {
    value,
  }: ITranspileCreateReactiveTextNodeToJSLinesOptions,
): ILines => {
  return inlineLastLines(
    [`aot_9(`],
    value,
    [')'],
  );
};

export function aot_9(
  value$: IObservableLike<string>,
): VirtualReactiveTextNode {
  return new VirtualReactiveTextNode(
    toObservableThrowIfUndefined(value$),
  );
}
