import { IObservableLike, toObservableThrowIfUndefined } from '@lirx/core';
import { IUnsubscribe } from '@lirx/utils';
import {
  IGenericVirtualReactiveElementNode,
} from '../../../../../../dom-manipulation/virtual-nodes/virtual-reactive-element-node/generic-virtual-reactive-element-node.type';
import {
  IClassNamesList,
} from '../../../../../../dom-manipulation/virtual-nodes/virtual-reactive-element-node/members/class/class-names-list.type';
import { inlineLastLines } from '../../../../../misc/lines/functions/after-last-line';
import { ILines } from '../../../../../misc/lines/lines.type';
import {
  ITranspileSetReactiveClassNamesListToJSLinesFunction,
  ITranspileSetReactiveClassNamesListToJSLinesOptions,
} from '../../transpilers/transpile-set-reactive-class-names-list-to-js-lines.type';

export const transpileAOTSetReactiveClassNamesListToJSLines: ITranspileSetReactiveClassNamesListToJSLinesFunction = (
  {
    node,
    value,
  }: ITranspileSetReactiveClassNamesListToJSLinesOptions,
): ILines => {
  return inlineLastLines(
    [`aot_12(`],
    node,
    [`, `],
    value,
    [');'],
  );
};

export function aot_12(
  node: IGenericVirtualReactiveElementNode,
  classNamesList$: IObservableLike<IClassNamesList>,
): IUnsubscribe {
  return node.setReactiveClassNamesList(
    toObservableThrowIfUndefined(classNamesList$),
  );
}
