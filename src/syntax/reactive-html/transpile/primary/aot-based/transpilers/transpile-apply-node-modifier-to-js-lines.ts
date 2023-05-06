import { inlineLastLines } from '../../../../../misc/lines/functions/after-last-line';
import { ILines } from '../../../../../misc/lines/lines.type';
import {
  ITranspileApplyNodeModifierToJSLinesFunction,
  ITranspileApplyNodeModifierToJSLinesOptions,
} from '../../transpilers/transpile-apply-node-modifier-to-js-lines.type';

export const transpileAOTApplyNodeModifierToJSLines: ITranspileApplyNodeModifierToJSLinesFunction = (
  {
    name,
    node,
    value,
  }: ITranspileApplyNodeModifierToJSLinesOptions,
): ILines => {
  return inlineLastLines(
    [`applyNodeModifier(`],
    [JSON.stringify(name)],
    [', '],
    node,
    [', '],
    value,
    [')'],
  );
};


