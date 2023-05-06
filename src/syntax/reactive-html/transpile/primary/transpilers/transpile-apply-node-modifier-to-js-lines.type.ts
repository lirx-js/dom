import { ILines } from '../../../../misc/lines/lines.type';

export interface ITranspileApplyNodeModifierToJSLinesOptions {
  name: string;
  node: ILines;
  value: ILines;
}

export interface ITranspileApplyNodeModifierToJSLinesFunction {
  (
    options: ITranspileApplyNodeModifierToJSLinesOptions,
  ): ILines;
}

export interface ITranspileApplyNodeModifierToJSLinesTrait {
  transpileApplyNodeModifierToJSLines: ITranspileApplyNodeModifierToJSLinesFunction;
}
