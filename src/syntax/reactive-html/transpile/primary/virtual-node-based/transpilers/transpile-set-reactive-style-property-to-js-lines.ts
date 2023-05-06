import { inlineLastLines } from '../../../../../misc/lines/functions/after-last-line';
import { ILines } from '../../../../../misc/lines/lines.type';
import {
  ITranspileSetReactiveStylePropertyToJSLinesFunction,
  ITranspileSetReactiveStylePropertyToJSLinesOptions,
} from '../../transpilers/transpile-set-reactive-style-property-to-js-lines.type';
import { transpileToObservableToJSLines } from './transpile-to-observable-to-js-lines';

export const transpileSetReactiveStylePropertyToJSLines: ITranspileSetReactiveStylePropertyToJSLinesFunction = (
  {
    node,
    name,
    value,
  }: ITranspileSetReactiveStylePropertyToJSLinesOptions,
): ILines => {
  return inlineLastLines(
    node,
    [`.setReactiveStyleProperty(`],
    name,
    [', '],
    transpileToObservableToJSLines({ value }),
    [');'],
  );
};


