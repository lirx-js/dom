import { ILinesOrNull } from '../../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../../require-external/require-external-function.type';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLRXChildTemplateToReactiveDOMJSLines,
  transpileReactiveHTMLRXChildTemplateToReactiveDOMJSLines,
} from '../../helpers/transpile-reactive-html-rx-child-template-to-reactive-dom-js-lines';

const TAG_NAME: string = 'rx-async-pending';
const COMMAND_NAME: string = '*async-pending';

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLRXAsyncPendingToReactiveDOMJSLines = IRequireExternalFunctionKeyForTranspileReactiveHTMLRXChildTemplateToReactiveDOMJSLines;

export function transpileReactiveHTMLRXAsyncPendingToReactiveDOMJSLines(
  node: Element,
  templateName: string,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLRXAsyncPendingToReactiveDOMJSLines>,
): ILinesOrNull {
  return transpileReactiveHTMLRXChildTemplateToReactiveDOMJSLines(
    node,
    TAG_NAME,
    () => null,
    COMMAND_NAME,
    () => null,
    templateName,
    requireExternalFunction,
  );
}


