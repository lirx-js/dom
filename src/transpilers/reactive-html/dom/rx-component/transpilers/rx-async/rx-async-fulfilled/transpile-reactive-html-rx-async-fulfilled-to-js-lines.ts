import { ILinesOrNull } from '../../../../../../misc/lines/lines-or-null.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../../primary/primary-transpilers.type';
import { transpileReactiveHTMLRXChildTemplateToJSLines } from '../../helpers/transpile-reactive-html-rx-child-template-to-js-lines';
import { getCommandTemplateArgumentForRXAsyncChild } from '../shared/get-command-template-argument-for-rx-async-child';
import { getTagTemplateArgumentForRXAsyncChild } from '../shared/get-tag-template-argument-for-rx-async-child';

const TAG_NAME: string = 'rx-async-fulfilled';
const COMMAND_NAME: string = '*async-fulfilled';

export interface ITranspileReactiveHTMLRXAsyncFulfilledToJSLinesOptions extends IHavingPrimaryTranspilersOptions {
  node: Element;
  templateName: string;
}

export function transpileReactiveHTMLRXAsyncFulfilledToJSLines(
  options: ITranspileReactiveHTMLRXAsyncFulfilledToJSLinesOptions,
): ILinesOrNull {
  return transpileReactiveHTMLRXChildTemplateToJSLines({
    ...options,
    tagName: TAG_NAME,
    getTagTemplateArgument: getTagTemplateArgumentForRXAsyncChild,
    commandName: COMMAND_NAME,
    getCommandTemplateArgument: getCommandTemplateArgumentForRXAsyncChild,
  });
}

