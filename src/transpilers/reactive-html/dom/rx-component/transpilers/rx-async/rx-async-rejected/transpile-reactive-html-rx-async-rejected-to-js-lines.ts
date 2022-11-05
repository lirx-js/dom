import { ILinesOrNull } from '../../../../../../misc/lines/lines-or-null.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../../primary/primary-transpilers.type';
import { transpileReactiveHTMLRXChildTemplateToJSLines } from '../../helpers/transpile-reactive-html-rx-child-template-to-js-lines';
import { getTagTemplateArgumentForRXAsyncChild } from '../shared/get-tag-template-argument-for-rx-async-child';
import { getCommandTemplateArgumentForRXAsyncChild } from '../shared/get-command-template-argument-for-rx-async-child';

const TAG_NAME: string = 'rx-async-rejected';
const COMMAND_NAME: string = '*async-rejected';

export interface ITranspileReactiveHTMLRXAsyncRejectedToJSLinesOptions extends IHavingPrimaryTranspilersOptions {
  node: Element;
  templateName: string;
}

export function transpileReactiveHTMLRXAsyncRejectedToJSLines(
  options: ITranspileReactiveHTMLRXAsyncRejectedToJSLinesOptions,
): ILinesOrNull {
  return transpileReactiveHTMLRXChildTemplateToJSLines({
    ...options,
    tagName: TAG_NAME,
    getTagTemplateArgument: getTagTemplateArgumentForRXAsyncChild,
    commandName: COMMAND_NAME,
    getCommandTemplateArgument: getCommandTemplateArgumentForRXAsyncChild,
  });
}


