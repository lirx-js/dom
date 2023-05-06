import { inlineLastLines } from '../../../../../misc/lines/functions/after-last-line';
import { ILines } from '../../../../../misc/lines/lines.type';
import {
  ITranspileSetReactivePropertyToJSLinesFunction,
  ITranspileSetReactivePropertyToJSLinesOptions,
} from '../../transpilers/transpile-set-reactive-property-to-js-lines.type';
import { transpileToObservableToJSLines } from './transpile-to-observable-to-js-lines';

export const transpileSetReactivePropertyToJSLines: ITranspileSetReactivePropertyToJSLinesFunction = (
  {
    node,
    name,
    value,
  }: ITranspileSetReactivePropertyToJSLinesOptions,
): ILines => {
  // return inlineLastLines(
  //   node,
  //   [`.setReactiveProperty(`],
  //   inlineLastLines(
  //     [`getCaseInsensitiveVirtualElementNodePropertyKey(`],
  //     node,
  //     [', '],
  //     name,
  //     [')'],
  //   ),
  //   [', '],
  //   transpileToObservableToJSLines({ value }),
  //   [');'],
  // );
  return inlineLastLines(
    [`virtualReactiveElementNodeSetCaseInsensitiveReactiveProperty(`],
    node,
    [', '],
    name,
    [', '],
    transpileToObservableToJSLines({ value }),
    [');'],
  );
};


