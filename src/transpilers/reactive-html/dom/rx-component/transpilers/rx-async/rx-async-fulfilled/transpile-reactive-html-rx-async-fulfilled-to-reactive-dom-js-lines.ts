import { ILinesOrNull } from '../../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../../require-external/require-external-function.type';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLRXChildTemplateToReactiveDOMJSLines,
  transpileReactiveHTMLRXChildTemplateToReactiveDOMJSLines,
} from '../../helpers/transpile-reactive-html-rx-child-template-to-reactive-dom-js-lines';
import {
  getCommentTemplateArgumentForTranspileReactiveHTMLRXAsyncFulfilledOrRejectedToReactiveDOMJSLines,
} from '../shared/get-command-template-argument-for-transpile-reactive-html-rx-async-fulfilled-or-rejected-to-reactive-dom-js-lines';
import {
  getTagTemplateArgumentForTranspileReactiveHTMLRXAsyncFulfilledOrRejectedToReactiveDOMJSLines,
} from '../shared/get-tag-template-argument-for-transpile-reactive-html-rx-async-fulfilled-or-rejected-to-reactive-dom-js-lines';

const TAG_NAME: string = 'rx-async-fulfilled';
const COMMAND_NAME: string = '*async-fulfilled';

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLRXAsyncFulfilledToReactiveDOMJSLines = IRequireExternalFunctionKeyForTranspileReactiveHTMLRXChildTemplateToReactiveDOMJSLines;

export function transpileReactiveHTMLRXAsyncFulfilledToReactiveDOMJSLines(
  node: Element,
  templateName: string,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLRXAsyncFulfilledToReactiveDOMJSLines>,
): ILinesOrNull {
  return transpileReactiveHTMLRXChildTemplateToReactiveDOMJSLines(
    node,
    TAG_NAME,
    getTagTemplateArgumentForTranspileReactiveHTMLRXAsyncFulfilledOrRejectedToReactiveDOMJSLines,
    COMMAND_NAME,
    getCommentTemplateArgumentForTranspileReactiveHTMLRXAsyncFulfilledOrRejectedToReactiveDOMJSLines,
    templateName,
    requireExternalFunction,
  );
}


