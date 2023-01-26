import { ILines } from '../../../misc/lines/lines.type';
import { ILinesMap } from '../../../misc/misc/generate-js-lines-for-lines-map';

export type ITranspileCreateReactiveCustomElementNodeToJSLinesOptionsSlotsMap = ILinesMap;

export interface ITranspileCreateReactiveCustomElementNodeToJSLinesOptions {
  name: string,
  slots: ITranspileCreateReactiveCustomElementNodeToJSLinesOptionsSlotsMap;
}

export interface ITranspileCreateReactiveCustomElementNodeToJSLinesFunction {
  (
    options: ITranspileCreateReactiveCustomElementNodeToJSLinesOptions,
  ): ILines;
}

export interface ITranspileCreateReactiveCustomElementNodeToJSLinesTrait {
  transpileCreateReactiveCustomElementNodeToJSLines: ITranspileCreateReactiveCustomElementNodeToJSLinesFunction;
}
