import { ILines } from '../../../../misc/lines/lines.type';

export interface ITranspileCreateReactiveAsyncNodeToJSLinesOptions {
  expression: ILines;
  templatePending: ILines;
  templateFulfilled: ILines;
  templateRejected: ILines;
}

export interface ITranspileCreateReactiveAsyncNodeToJSLinesFunction {
  (
    options: ITranspileCreateReactiveAsyncNodeToJSLinesOptions,
  ): ILines;
}

export interface ITranspileCreateReactiveAsyncNodeToJSLinesTrait {
  transpileCreateReactiveAsyncNodeToJSLines: ITranspileCreateReactiveAsyncNodeToJSLinesFunction;
}
