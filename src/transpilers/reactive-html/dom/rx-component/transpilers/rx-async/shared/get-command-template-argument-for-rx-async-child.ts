import { wrapLinesWithCurlyBrackets } from '../../../../../../misc/lines/functions/wrap-lines-with-curly-brackets';
import { ILinesOrNull } from '../../../../../../misc/lines/lines-or-null.type';

export function getCommandTemplateArgumentForRXAsyncChild(
  attributeValue: string | null,
): ILinesOrNull {
  return attributeValue === ''
    ? null
    : wrapLinesWithCurlyBrackets([
      (attributeValue === 'value')
        ? 'value'
        : `value: ${attributeValue}`,
    ], false);
}
