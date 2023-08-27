import { inlineLastLines } from '../../../../../misc/lines/functions/after-last-line';
import { indentLines } from '../../../../../misc/lines/functions/indent-lines';
import { ILines } from '../../../../../misc/lines/lines.type';
import {
  ITranspileCreateReactiveForLoopNodeToJSLinesFunction,
  ITranspileCreateReactiveForLoopNodeToJSLinesOptions,
} from '../../transpilers/transpile-create-reactive-for-loop-node-to-js-lines.type';
import { transpileUnknownToObservableToJSLines } from './transpile-unknown-to-observable-to-js-lines';

export const transpileCreateReactiveForLoopNodeToJSLines: ITranspileCreateReactiveForLoopNodeToJSLinesFunction = (
  {
    items,
    template,
    trackBy,
  }: ITranspileCreateReactiveForLoopNodeToJSLinesOptions,
): ILines => {
  return [
    `new VirtualReactiveForLoopNode(`,
    ...indentLines([
      ...inlineLastLines(
        transpileUnknownToObservableToJSLines({ value: items }),
        [','],
      ),
      ...inlineLastLines(
        template,
        [','],
      ),
      ...(
        (trackBy === null)
          ? []
          : inlineLastLines(
            trackBy,
            [','],
          )
      ),
    ]),
    `)`,
  ];
};


