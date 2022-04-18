import { ILinesOrNull } from '../../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../../require-external/require-external-function.type';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLRXChildTemplateToReactiveDOMJSLines,
  transpileReactiveHTMLRXChildTemplateToReactiveDOMJSLines,
} from '../../helpers/transpile-reactive-html-rx-child-template-to-reactive-dom-js-lines';

const TAG_NAME: string = 'rx-if-false';
const COMMAND_NAME: string = '*if-false';

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLRXIfFalseToReactiveDOMJSLines = IRequireExternalFunctionKeyForTranspileReactiveHTMLRXChildTemplateToReactiveDOMJSLines;

export function transpileReactiveHTMLRXIfFalseToReactiveDOMJSLines(
  node: Element,
  templateName: string,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLRXIfFalseToReactiveDOMJSLines>,
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


