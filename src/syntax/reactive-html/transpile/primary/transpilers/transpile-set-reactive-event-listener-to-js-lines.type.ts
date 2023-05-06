import { ILines } from '../../../../misc/lines/lines.type';

export interface ITranspileSetReactiveEventListenerToJSLinesOptions {
  node: ILines;
  name: ILines;
  value: ILines;
  observableMode: boolean;
}

export interface ITranspileSetReactiveEventListenerToJSLinesFunction {
  (
    options: ITranspileSetReactiveEventListenerToJSLinesOptions,
  ): ILines;
}

export interface ITranspileSetReactiveEventListenerToJSLinesTrait {
  transpileSetReactiveEventListenerToJSLines: ITranspileSetReactiveEventListenerToJSLinesFunction;
}
