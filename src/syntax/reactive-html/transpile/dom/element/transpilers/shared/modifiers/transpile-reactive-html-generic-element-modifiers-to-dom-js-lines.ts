import { ILines } from '../../../../../../../misc/lines/lines.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../../primary/primary-transpilers.type';
import { IModifierProperty } from './extract-modifier-property-from-reactive-html-attribute';
import { generateJSLinesForModifierProperty } from './generate-js-lines-for-modifier-property';

export interface ITranspileReactiveHTMLGenericElementModifiersToJSLinesOptions extends IHavingPrimaryTranspilersOptions {
  modifiers: IModifierProperty[];
  lines: ILines;
}

export function transpileReactiveHTMLGenericElementModifiersToJSLines(
  {
    modifiers,
    lines,
    ...options
  }: ITranspileReactiveHTMLGenericElementModifiersToJSLinesOptions,
): ILines {
  return modifiers
    .sort((a: IModifierProperty, b: IModifierProperty): number => {
      return a.weight - b.weight;
    })
    .reduce((lines: ILines, modifierProperty: IModifierProperty): ILines => {
      return generateJSLinesForModifierProperty({
        ...options,
        modifierProperty,
        lines,
      });
    }, lines);
}
