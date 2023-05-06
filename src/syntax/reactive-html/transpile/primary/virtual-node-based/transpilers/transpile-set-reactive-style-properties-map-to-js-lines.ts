import { inlineLastLines } from '../../../../../misc/lines/functions/after-last-line';
import { ILines } from '../../../../../misc/lines/lines.type';
import {
  ITranspileSetReactiveStylePropertiesMapToJSLinesFunction,
  ITranspileSetReactiveStylePropertiesMapToJSLinesOptions,
} from '../../transpilers/transpile-set-reactive-style-properties-map-to-js-lines.type';
import { transpileToObservableToJSLines } from './transpile-to-observable-to-js-lines';

export const transpileSetReactiveStylePropertiesMapToJSLines: ITranspileSetReactiveStylePropertiesMapToJSLinesFunction = (
  {
    node,
    value,
  }: ITranspileSetReactiveStylePropertiesMapToJSLinesOptions,
): ILines => {
  return inlineLastLines(
    node,
    [`.setReactiveStylePropertiesMap(`],
    transpileToObservableToJSLines({ value }),
    [');'],
  );
};


