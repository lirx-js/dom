import { IUnsubscribe } from '@lirx/unsubscribe';
import {
  VirtualComponentNode,
} from '../../../../../../dom-manipulation/virtual-nodes/virtual-component-node/virtual-component-node.class';
import { inlineLastLines } from '../../../../../misc/lines/functions/after-last-line';
import { ILines } from '../../../../../misc/lines/lines.type';
import {
  ITranspileSetReactiveInputToJSLinesFunction,
  ITranspileSetReactiveInputToJSLinesOptions,
} from '../../transpilers/transpile-set-reactive-input-to-js-lines.type';
import {
  bindCaseInsensitiveInputWithObservableLike,
  InferBindCaseInsensitiveInputWithObservableLikeValue,
} from '../../../../../../dom-manipulation/virtual-nodes/virtual-component-node/data/inputs/case-insensitive/bind/bind-case-insensitive-input-with-observable-like';

export const transpileAOTSetReactiveInputToJSLines: ITranspileSetReactiveInputToJSLinesFunction = (
  {
    node,
    name,
    value,
  }: ITranspileSetReactiveInputToJSLinesOptions,
): ILines => {
  return inlineLastLines(
    [`aot_16(`],
    node,
    [', '],
    name,
    [', '],
    value,
    [');'],
  );
};

export function aot_16<GData extends object, GCaseInsensitiveKey extends string>(
  node: VirtualComponentNode<any, GData>,
  caseInsensitiveKey: GCaseInsensitiveKey,
  value$: InferBindCaseInsensitiveInputWithObservableLikeValue<GData, GCaseInsensitiveKey>,
): IUnsubscribe {
  return bindCaseInsensitiveInputWithObservableLike<GData, GCaseInsensitiveKey>(
    node,
    caseInsensitiveKey,
    value$,
  );
}

