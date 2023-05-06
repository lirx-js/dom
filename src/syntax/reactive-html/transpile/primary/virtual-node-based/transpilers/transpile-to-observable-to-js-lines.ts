import { inlineLastLines } from '../../../../../misc/lines/functions/after-last-line';
import { ILines } from '../../../../../misc/lines/lines.type';


export interface ITranspileToObservableToJSLinesOptions {
  value: ILines;
}

export interface ITranspileToObservableToJSLinesFunction {
  (
    options: ITranspileToObservableToJSLinesOptions,
  ): ILines;
}

// export interface ITranspileToObservableToJSLinesTrait {
//   transpileToObservableToJSLines: ITranspileToObservableToJSLinesFunction;
// }


export const transpileToObservableToJSLines: ITranspileToObservableToJSLinesFunction = (
  {
    value,
  }: ITranspileToObservableToJSLinesOptions,
): ILines => {
  return inlineLastLines(
    [`toObservableThrowIfUndefined(`],
    value,
    [')'],
  );
};




