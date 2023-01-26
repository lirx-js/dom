import { ILines } from '../lines.type';
import { wrapLinesWithBrackets } from './wrap-lines-with-brackets';

export function wrapLinesWithSquareBrackets(
  lines: ILines,
  inlineIfSingleLine?: boolean,
): ILines {
  return wrapLinesWithBrackets('[', lines, ']', inlineIfSingleLine);
}
