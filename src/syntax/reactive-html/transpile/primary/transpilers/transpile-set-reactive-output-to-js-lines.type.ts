import { ILines } from '../../../../misc/lines/lines.type';

export interface ITranspileSetReactiveOutputToJSLinesOptions {
  node: ILines;
  name: ILines;
  value: ILines;
  observableMode: boolean;
}

export interface ITranspileSetReactiveOutputToJSLinesFunction {
  (
    options: ITranspileSetReactiveOutputToJSLinesOptions,
  ): ILines;
}

export interface ITranspileSetReactiveOutputToJSLinesTrait {
  transpileSetReactiveOutputToJSLines: ITranspileSetReactiveOutputToJSLinesFunction;
}
