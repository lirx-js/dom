import { inlineLastLines } from '../../../../../misc/lines/functions/after-last-line';
import { indentLines } from '../../../../../misc/lines/functions/indent-lines';
import { ILines } from '../../../../../misc/lines/lines.type';
import {
  ITranspileCreateReactiveIfNodeToJSLinesFunction,
  ITranspileCreateReactiveIfNodeToJSLinesOptions,
} from '../../transpilers/transpile-create-reactive-if-node-to-js-lines.type';
import { transpileToObservableToJSLines } from './transpile-to-observable-to-js-lines';

export const transpileCreateReactiveIfNodeToJSLines: ITranspileCreateReactiveIfNodeToJSLinesFunction = (
  {
    condition,
    templateTrue,
    templateFalse,
  }: ITranspileCreateReactiveIfNodeToJSLinesOptions,
): ILines => {
  return [
    `new VirtualReactiveIfNode(`,
    ...indentLines([
      ...inlineLastLines(
        transpileToObservableToJSLines({ value: condition }),
        [','],
      ),
      ...inlineLastLines(
        // (templateTrue === null) ? ['null'] : templateTrue,
        templateTrue,
        [','],
      ),
      ...inlineLastLines(
        // (templateFalse === null) ? ['null'] : templateFalse,
        templateFalse,
        [','],
      ),
    ]),
    `)`,
  ];
};


