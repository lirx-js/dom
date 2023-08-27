import { inlineLastLines } from '../../../../../misc/lines/functions/after-last-line';
import { ILines } from '../../../../../misc/lines/lines.type';
import {
  ITranspileSetReactiveClassToJSLinesFunction,
  ITranspileSetReactiveClassToJSLinesOptions,
} from '../../transpilers/transpile-set-reactive-class-to-js-lines.type';
import { transpileUnknownToObservableToJSLines } from './transpile-unknown-to-observable-to-js-lines';

export const transpileSetReactiveClassToJSLines: ITranspileSetReactiveClassToJSLinesFunction = (
  {
    node,
    name,
    value,
  }: ITranspileSetReactiveClassToJSLinesOptions,
): ILines => {
  return inlineLastLines(
    node,
    [`.setReactiveClass(`],
    name,
    [', '],
    transpileUnknownToObservableToJSLines({ value }),
    [');'],
  );
};


