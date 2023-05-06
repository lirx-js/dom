import { getElementTagName } from '../../../../../../../../dom-manipulation/helpers/misc/get-element-tag-name';
import { ILinesOrNull } from '../../../../../../../misc/lines/lines-or-null.type';
import { ILines } from '../../../../../../../misc/lines/lines.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../../primary/primary-transpilers.type';
import { generateJSLinesForRXTemplateFromNodes } from './generate-js-lines-for-rx-template-from-nodes';
import { generateJSLinesForRXTemplateFromRXContainerOrElement } from './generate-js-lines-for-rx-template-from-rx-container-or-element';

/* SHARED */

export interface ITranspileReactiveHTMLRXChildTemplateToJSLinesOptionsGenerateTemplateFunctionOptions {
  argumentsLines: ILinesOrNull;
}

export interface ITranspileReactiveHTMLRXChildTemplateToJSLinesOptionsGenerateTemplateFunction {
  (
    options: ITranspileReactiveHTMLRXChildTemplateToJSLinesOptionsGenerateTemplateFunctionOptions,
  ): ILines;
}

export interface ITranspileReactiveHTMLRXChildTemplateToJSLinesOptionsSharedFunctionOptions {
  generateTemplate: ITranspileReactiveHTMLRXChildTemplateToJSLinesOptionsGenerateTemplateFunction;
}

/* TAG */

export interface ITranspileReactiveHTMLRXChildTemplateToJSLinesOptionsOnTagFunctionOptions extends ITranspileReactiveHTMLRXChildTemplateToJSLinesOptionsSharedFunctionOptions {
  node: Element;
}

export interface ITranspileReactiveHTMLRXChildTemplateToJSLinesOptionsOnTagFunction {
  (
    options: ITranspileReactiveHTMLRXChildTemplateToJSLinesOptionsOnTagFunctionOptions,
  ): ILinesOrNull;
}

/* COMMAND */

export interface ITranspileReactiveHTMLRXChildTemplateToJSLinesOptionsOnCommandFunctionOptions extends ITranspileReactiveHTMLRXChildTemplateToJSLinesOptionsSharedFunctionOptions {
  node: Element;
  attributeValue: string;
}

export interface ITranspileReactiveHTMLRXChildTemplateToJSLinesOptionsOnCommandFunction {
  (
    options: ITranspileReactiveHTMLRXChildTemplateToJSLinesOptionsOnCommandFunctionOptions,
  ): ILinesOrNull;
}

/* OPTIONS */

export interface ITranspileReactiveHTMLRXChildTemplateToJSLinesOptions extends IHavingPrimaryTranspilersOptions {
  node: Element;
  tagName: string;
  commandName: string;
  templateName?: string;
  onTag: ITranspileReactiveHTMLRXChildTemplateToJSLinesOptionsOnTagFunction;
  onCommand: ITranspileReactiveHTMLRXChildTemplateToJSLinesOptionsOnCommandFunction;
}

export function transpileReactiveHTMLRXChildTemplateToJSLines(
  {
    node,
    tagName,
    commandName,
    templateName,
    onTag,
    onCommand,
    ...options
  }: ITranspileReactiveHTMLRXChildTemplateToJSLinesOptions,
): ILinesOrNull {
  const name: string = getElementTagName(node);

  const templateNameLines: ILines = (templateName === void 0)
    ? []
    : [`// ${templateName}`];

  if (name === tagName) {
    return onTag({
      node,
      generateTemplate: (
        {
          argumentsLines,
        }: ITranspileReactiveHTMLRXChildTemplateToJSLinesOptionsGenerateTemplateFunctionOptions,
      ): ILines => {
        return [
          ...templateNameLines,
          ...generateJSLinesForRXTemplateFromNodes({
            ...options,
            nodes: node.childNodes,
            argumentsLines,
          }),
        ];
      },
    });
  } else if (node.hasAttribute(commandName)) {
    const attributeValue: string = node.getAttribute(commandName) as string;
    node.removeAttribute(commandName);

    return onCommand({
      node,
      attributeValue,
      generateTemplate: (
        {
          argumentsLines,
        }: ITranspileReactiveHTMLRXChildTemplateToJSLinesOptionsGenerateTemplateFunctionOptions,
      ): ILines => {
        return [
          ...templateNameLines,
          ...generateJSLinesForRXTemplateFromRXContainerOrElement({
            ...options,
            node,
            argumentsLines,
          }),
        ];
      },
    });
  } else {
    return null;
  }
}
