import { ILinesOrNull } from '../../../../../../misc/lines/lines-or-null.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../../primary/primary-transpilers.type';
import { transpileReactiveHTMLRXChildTemplateToJSLines } from '../../helpers/transpile-reactive-html-rx-child-template-to-js-lines';

const TAG_NAME: string = 'rx-async-pending';
const COMMAND_NAME: string = '*async-pending';

export interface ITranspileReactiveHTMLRXAsyncPendingToJSLinesOptions extends IHavingPrimaryTranspilersOptions {
  node: Element;
  templateName: string;
}

export function transpileReactiveHTMLRXAsyncPendingToJSLines(
  options: ITranspileReactiveHTMLRXAsyncPendingToJSLinesOptions,
): ILinesOrNull {
  return transpileReactiveHTMLRXChildTemplateToJSLines({
    ...options,
    tagName: TAG_NAME,
    getTagTemplateArgument: () => null,
    commandName: COMMAND_NAME,
    getCommandTemplateArgument: () => null,
  });
}


