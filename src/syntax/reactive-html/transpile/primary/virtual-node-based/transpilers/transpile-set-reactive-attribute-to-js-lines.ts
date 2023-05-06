import { inlineLastLines } from '../../../../../misc/lines/functions/after-last-line';
import { ILines } from '../../../../../misc/lines/lines.type';
import {
  ITranspileSetReactiveAttributeToJSLinesFunction,
  ITranspileSetReactiveAttributeToJSLinesOptions,
} from '../../transpilers/transpile-set-reactive-attribute-to-js-lines.type';
import { transpileToObservableToJSLines } from './transpile-to-observable-to-js-lines';

export const transpileSetReactiveAttributeToJSLines: ITranspileSetReactiveAttributeToJSLinesFunction = (
  {
    node,
    name,
    value,
  }: ITranspileSetReactiveAttributeToJSLinesOptions,
): ILines => {
  return inlineLastLines(
    node,
    [`.setReactiveAttribute(`],
    name,
    [', '],
    transpileToObservableToJSLines({ value }),
    [');'],
  );
};


