import { IObservableLike, toObservableThrowIfUndefined } from '@lirx/core';
import { INotAnObservable } from '@lirx/core/src/others/observable-like/observable-like.type';
import {
  IVirtualReactiveSwitchNodeTemplate,
  VirtualReactiveSwitchNode,
} from '../../../../../../dom-manipulation/virtual-nodes/virtual-reactive-switch-node/virtual-reactive-switch-node.class';
import { inlineLastLines } from '../../../../../misc/lines/functions/after-last-line';
import { indentLines } from '../../../../../misc/lines/functions/indent-lines';
import { ILines } from '../../../../../misc/lines/lines.type';
import { generateJSLinesForLinesMap } from '../../../../../misc/misc/generate-js-lines-for-lines-map';
import {
  ITranspileCreateReactiveSwitchNodeToJSLinesFunction,
  ITranspileCreateReactiveSwitchNodeToJSLinesOptions,
} from '../../transpilers/transpile-create-reactive-switch-node-to-js-lines.type';

export const transpileAOTCreateReactiveSwitchNodeToJSLines: ITranspileCreateReactiveSwitchNodeToJSLinesFunction = (
  {
    expression,
    templatesMap,
    defaultTemplate,
  }: ITranspileCreateReactiveSwitchNodeToJSLinesOptions,
): ILines => {
  return [
    `aot_8(`,
    ...indentLines([
      ...inlineLastLines(
        expression,
        [','],
      ),
      ...inlineLastLines(
        generateJSLinesForLinesMap({
          linesMap: templatesMap,
        }),
        [','],
      ),
      ...(
        ((defaultTemplate === null) || (defaultTemplate.length === 0))
          ? []
          : inlineLastLines(
            defaultTemplate,
            [','],
          )
      ),
    ]),
    `)`,
  ];
};

export function aot_8<GValue extends INotAnObservable<GValue>>(
  value$: IObservableLike<GValue>,
  templatesMap: ReadonlyMap<GValue, IVirtualReactiveSwitchNodeTemplate>,
  defaultTemplate?: IVirtualReactiveSwitchNodeTemplate,
): VirtualReactiveSwitchNode<GValue> {
  return new VirtualReactiveSwitchNode<GValue>(
    toObservableThrowIfUndefined(value$),
    templatesMap,
    defaultTemplate,
  );
}
