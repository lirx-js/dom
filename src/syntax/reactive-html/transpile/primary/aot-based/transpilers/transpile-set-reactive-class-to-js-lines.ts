import { IObservableLike, toObservableThrowIfUndefined } from '@lirx/core';
import { IUnsubscribe } from '@lirx/utils';
import {
  IGenericVirtualReactiveElementNode,
} from '../../../../../../dom-manipulation/virtual-nodes/virtual-reactive-element-node/generic-virtual-reactive-element-node.type';
import { inlineLastLines } from '../../../../../misc/lines/functions/after-last-line';
import { ILines } from '../../../../../misc/lines/lines.type';
import {
  ITranspileSetReactiveClassToJSLinesFunction,
  ITranspileSetReactiveClassToJSLinesOptions,
} from '../../transpilers/transpile-set-reactive-class-to-js-lines.type';

export const transpileAOTSetReactiveClassToJSLines: ITranspileSetReactiveClassToJSLinesFunction = (
  {
    node,
    name,
    value,
  }: ITranspileSetReactiveClassToJSLinesOptions,
): ILines => {
  return inlineLastLines(
    [`aot_13(`],
    node,
    [`, `],
    name,
    [', '],
    value,
    [');'],
  );
};

export function aot_13(
  node: IGenericVirtualReactiveElementNode,
  name: string,
  enabled$: IObservableLike<boolean>,
): IUnsubscribe {
  return node.setReactiveClass(
    name,
    toObservableThrowIfUndefined(enabled$),
  );
}
