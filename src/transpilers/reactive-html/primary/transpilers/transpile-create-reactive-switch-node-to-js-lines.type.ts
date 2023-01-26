import { ILinesOrNull } from '../../../misc/lines/lines-or-null.type';
import { ILines } from '../../../misc/lines/lines.type';
import { ILinesMap } from '../../../misc/misc/generate-js-lines-for-lines-map';

export type ITranspileCreateReactiveSwitchNodeToJSLinesOptionsTemplatesMap = ILinesMap;

export interface ITranspileCreateReactiveSwitchNodeToJSLinesOptions {
  expression: ILines,
  templatesMap: ITranspileCreateReactiveSwitchNodeToJSLinesOptionsTemplatesMap;
  defaultTemplate: ILinesOrNull;
}

export interface ITranspileCreateReactiveSwitchNodeToJSLinesFunction {
  (
    options: ITranspileCreateReactiveSwitchNodeToJSLinesOptions,
  ): ILines;
}

export interface ITranspileCreateReactiveSwitchNodeToJSLinesTrait {
  transpileCreateReactiveSwitchNodeToJSLines: ITranspileCreateReactiveSwitchNodeToJSLinesFunction;
}
