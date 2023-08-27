import { inlineLastLines } from '../../../../../misc/lines/functions/after-last-line';
import { indentLines } from '../../../../../misc/lines/functions/indent-lines';
import { ILines } from '../../../../../misc/lines/lines.type';
import {
  ITranspileCreateReactiveAsyncNodeToJSLinesFunction,
  ITranspileCreateReactiveAsyncNodeToJSLinesOptions,
} from '../../transpilers/transpile-create-reactive-async-node-to-js-lines.type';
import { transpileUnknownToObservableToJSLines } from './transpile-unknown-to-observable-to-js-lines';

export const transpileCreateReactiveAsyncNodeToJSLines: ITranspileCreateReactiveAsyncNodeToJSLinesFunction = (
  {
    expression,
    templatePending,
    templateFulfilled,
    templateRejected,
  }: ITranspileCreateReactiveAsyncNodeToJSLinesOptions,
): ILines => {
  return [
    `new VirtualReactiveAsyncNode(`,
    ...indentLines([
      ...inlineLastLines(
        transpileUnknownToObservableToJSLines({ value: expression }),
        [','],
      ),
      ...inlineLastLines(
        templatePending,
        [','],
      ),
      ...inlineLastLines(
        templateFulfilled,
        [','],
      ),
      ...inlineLastLines(
        templateRejected,
        [','],
      ),
    ]),
    `)`,
  ];
};


