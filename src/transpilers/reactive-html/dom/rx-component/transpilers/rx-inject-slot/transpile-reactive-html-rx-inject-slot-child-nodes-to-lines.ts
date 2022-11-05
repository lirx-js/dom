import { ILinesOrNull } from '../../../../../misc/lines/lines-or-null.type';
import { ILines } from '../../../../../misc/lines/lines.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../primary/primary-transpilers.type';
import { transpileReactiveHTMLNodesToJSLines } from '../../../nodes/transpile-reactive-html-nodes-to-js-lines';
import { generateJSLinesForRXInjectSlot, IGenerateJSLinesForRXInjectSlotOptions } from './generate-js-lines-for-rx-inject-slot';

export interface ITranspileReactiveHTMLRXInjectSlotChildNodesToLinesOptions extends //
  IHavingPrimaryTranspilersOptions,
  Omit<IGenerateJSLinesForRXInjectSlotOptions, 'defaultLines'>
//
{
  nodes: ArrayLike<Node>;
}

export function transpileReactiveHTMLRXInjectSlotChildNodesToLines(
  options: ITranspileReactiveHTMLRXInjectSlotChildNodesToLinesOptions,
): ILines {
  const defaultLines: ILinesOrNull = transpileReactiveHTMLNodesToJSLines(options);

  return generateJSLinesForRXInjectSlot({
    ...options,
    defaultLines,
  });
}
