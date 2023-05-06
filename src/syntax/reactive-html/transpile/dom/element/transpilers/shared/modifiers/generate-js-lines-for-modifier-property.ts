import { inlineLastLines } from '../../../../../../../misc/lines/functions/after-last-line';
import { wrapLinesWithCurlyBrackets } from '../../../../../../../misc/lines/functions/wrap-lines-with-curly-brackets';
import { ILines } from '../../../../../../../misc/lines/lines.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../../primary/primary-transpilers.type';
import { IModifierProperty } from './extract-modifier-property-from-reactive-html-attribute';

const TMP_NODE_NAME = '_node';

export interface IGenerateJSLinesForModifierPropertyOptions extends IHavingPrimaryTranspilersOptions {
  modifierProperty: IModifierProperty;
  lines: ILines;
}

export function generateJSLinesForModifierProperty(
  {
    modifierProperty,
    lines,
    transpilers,
  }: IGenerateJSLinesForModifierPropertyOptions,
): ILines {
  const {
    transpileApplyNodeModifierToJSLines,
  } = transpilers;

  return [
    `// modifier ${JSON.stringify(modifierProperty.name)}`,
    ...wrapLinesWithCurlyBrackets([
      `const ${TMP_NODE_NAME} = node;`,
      ...wrapLinesWithCurlyBrackets([
        ...inlineLastLines(
          [`const node = (`],
          transpileApplyNodeModifierToJSLines({
            name: modifierProperty.name,
            node: [TMP_NODE_NAME],
            value: [modifierProperty.value],
          }),
          [');'],
        ),
        ...lines,
      ]),
    ]),
  ];
}
