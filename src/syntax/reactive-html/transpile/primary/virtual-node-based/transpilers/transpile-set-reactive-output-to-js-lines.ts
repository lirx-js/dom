import { inlineLastLines } from '../../../../../misc/lines/functions/after-last-line';
import { ILines } from '../../../../../misc/lines/lines.type';
import {
  ITranspileSetReactiveOutputToJSLinesFunction,
  ITranspileSetReactiveOutputToJSLinesOptions,
} from '../../transpilers/transpile-set-reactive-output-to-js-lines.type';

export const transpileSetReactiveOutputToJSLines: ITranspileSetReactiveOutputToJSLinesFunction = (
  {
    node,
    name,
    value,
    observableMode,
  }: ITranspileSetReactiveOutputToJSLinesOptions,
): ILines => {
  return inlineLastLines(
    [
      observableMode
        ? `virtualCustomElementNodeSetCaseInsensitiveReactiveOutputFromObservable(`
        : `virtualCustomElementNodeSetCaseInsensitiveReactiveOutput(`,
    ],
    [],
    node,
    [', '],
    name,
    [', '],
    value,
    [');'],
  );
  // return inlineLastLines(
  //   node,
  //   [
  //     observableMode
  //       ? `.setCaseInsensitiveReactiveOutputFromObservable(`
  //       : `.setCaseInsensitiveReactiveOutput(`,
  //   ],
  //   name,
  //   [','],
  //   value,
  //   [');'],
  // );
};


