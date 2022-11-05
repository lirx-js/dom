import { getElementTagName } from '../../../../../../misc/dom/get-element-tag-name';
import { isElementNode } from '../../../../../../misc/dom/is/is-element-node';
import { isTextNode } from '../../../../../../misc/dom/is/is-text-node';
import {
  createAtLeastOneOfTheseAttributesIsRequiredError,
} from '../../../../../misc/errors/create-at-least-one-of-these-attributes-is-required-error';
import { createDuplicateTemplateError } from '../../../../../misc/errors/create-duplicate-template-error';
import { createInvalidElementFoundError } from '../../../../../misc/errors/create-invalid-element-found-error';
import { createMissingAttributeError } from '../../../../../misc/errors/create-missing-attribute-error';
import { createShouldNotContainTextNodeError } from '../../../../../misc/errors/create-should-not-contain-text-node-error';
import { wrapLinesWithCurlyBrackets } from '../../../../../misc/lines/functions/wrap-lines-with-curly-brackets';
import { ILinesOrNull } from '../../../../../misc/lines/lines-or-null.type';
import { ILines } from '../../../../../misc/lines/lines.type';
import { generateOptionalTemplateVariableName } from '../../../../../misc/templates/generate-template-variable-name';
import { NULL_TEMPLATE } from '../../../../../misc/templates/null-template.constant';
import { IHavingPrimaryTranspilersOptions } from '../../../../primary/primary-transpilers.type';
import {
  extractRXAttributesFromReactiveHTMLAttribute,

} from '../helpers/extract-rx-attributes-from-reactive-html-attribute';
import {
  generateJSLinesForLocalTemplateFromRXContainerElement,
} from '../helpers/generate-js-lines-for-local-template-from-rx-container-element';
import { IMappedAttributes } from '../helpers/mapped-attributes.type';
import { generateJSLinesForRXAsync } from './generate-js-lines-for-rx-async';
import {
  transpileReactiveHTMLRXAsyncFulfilledToJSLines,
} from './rx-async-fulfilled/transpile-reactive-html-rx-async-fulfilled-to-js-lines';
import { transpileReactiveHTMLRXAsyncPendingToJSLines } from './rx-async-pending/transpile-reactive-html-rx-async-pending-to-js-lines';
import { transpileReactiveHTMLRXAsyncRejectedToJSLines } from './rx-async-rejected/transpile-reactive-html-rx-async-rejected-to-js-lines';

/*
Syntax:

<rx-async
  expression="observable"
  pending="templatePending"
  fulfilled="templateFulfilled"
  rejected="templateRejected"
></rx-async>

 */

const TAG_NAME: string = 'rx-async';
const COMMAND_NAME: string = '*async';

const EXPRESSION_ATTRIBUTE_NAME: string = 'expression';
const TEMPLATE_PENDING_ATTRIBUTE_NAME: string = 'pending';
const TEMPLATE_FULFILLED_ATTRIBUTE_NAME: string = 'fulfilled';
const TEMPLATE_REJECTED_ATTRIBUTE_NAME: string = 'rejected';

const LOCAL_TEMPLATE_NAME: string = 'template';

const LOCAL_TEMPLATE_PENDING_NAME: string = 'template_pending';
const LOCAL_TEMPLATE_FULFILLED_NAME: string = 'template_fulfilled';
const LOCAL_TEMPLATE_REJECTED_NAME: string = 'template_rejected';

const ATTRIBUTE_NAMES: Set<string> = new Set<string>([
  EXPRESSION_ATTRIBUTE_NAME,
  TEMPLATE_PENDING_ATTRIBUTE_NAME,
  TEMPLATE_FULFILLED_ATTRIBUTE_NAME,
  TEMPLATE_REJECTED_ATTRIBUTE_NAME,
]);

export interface ITranspileReactiveHTMLRXAsyncToJSLinesOptions extends IHavingPrimaryTranspilersOptions {
  node: Element;
}

export function transpileReactiveHTMLRXAsyncToJSLines(
  {
    node,
    ...options
  }: ITranspileReactiveHTMLRXAsyncToJSLinesOptions,
): ILinesOrNull {
  const name: string = getElementTagName(node);
  if (name === TAG_NAME) {
    const attributes: IMappedAttributes = extractRXAttributesFromReactiveHTMLAttribute(
      node.attributes,
      ATTRIBUTE_NAMES,
    );
    const expression: string | undefined = attributes.get(EXPRESSION_ATTRIBUTE_NAME);

    if (expression === void 0) {
      throw createMissingAttributeError(EXPRESSION_ATTRIBUTE_NAME, node);
    }

    let templatePending: string = generateOptionalTemplateVariableName(attributes.get(TEMPLATE_PENDING_ATTRIBUTE_NAME));
    let templateFulfilled: string = generateOptionalTemplateVariableName(attributes.get(TEMPLATE_FULFILLED_ATTRIBUTE_NAME));
    let templateRejected: string = generateOptionalTemplateVariableName(attributes.get(TEMPLATE_REJECTED_ATTRIBUTE_NAME));

    const childNodes: ArrayLike<ChildNode> = node.childNodes;
    const childLines: ILines = [];

    for (let i = 0, l = childNodes.length; i < l; i++) {
      const childNode: ChildNode = childNodes[i];
      if (isElementNode(childNode)) {
        const result: ILinesOrNull = transpileReactiveHTMLRXAsyncPendingToJSLines({
          ...options,
          node: childNode,
          templateName: LOCAL_TEMPLATE_PENDING_NAME,
        });
        if (result === null) {
          const result: ILinesOrNull = transpileReactiveHTMLRXAsyncFulfilledToJSLines({
            ...options,
            node: childNode,
            templateName: LOCAL_TEMPLATE_FULFILLED_NAME,
          });
          if (result === null) {
            const result: ILinesOrNull = transpileReactiveHTMLRXAsyncRejectedToJSLines({
              ...options,
              node: childNode,
              templateName: LOCAL_TEMPLATE_REJECTED_NAME,
            });
            if (result === null) {
              throw createInvalidElementFoundError(childNode);
            } else if (templateRejected === NULL_TEMPLATE) {
              templateRejected = LOCAL_TEMPLATE_REJECTED_NAME;
              childLines.push(...result);
            } else {
              throw createDuplicateTemplateError(TEMPLATE_REJECTED_ATTRIBUTE_NAME, node);
            }
            // throw new Error(`Found invalid element '${getElementTagName(childNode)}'`);
          } else if (templateFulfilled === NULL_TEMPLATE) {
            templateFulfilled = LOCAL_TEMPLATE_FULFILLED_NAME;
            childLines.push(...result);
          } else {
            throw createDuplicateTemplateError(TEMPLATE_FULFILLED_ATTRIBUTE_NAME, node);
          }
        } else if (templatePending === NULL_TEMPLATE) {
          templatePending = LOCAL_TEMPLATE_PENDING_NAME;
          childLines.push(...result);
        } else {
          throw createDuplicateTemplateError(TEMPLATE_PENDING_ATTRIBUTE_NAME, node);
        }
      } else if (isTextNode(childNode) && (childNode.data.trim() !== '')) {
        throw createShouldNotContainTextNodeError(node);
      }
    }

    if (
      (templatePending === NULL_TEMPLATE)
      && (templateFulfilled === NULL_TEMPLATE)
      && (templateRejected === NULL_TEMPLATE)
    ) {
      throw createAtLeastOneOfTheseAttributesIsRequiredError([
        TEMPLATE_PENDING_ATTRIBUTE_NAME,
        TEMPLATE_FULFILLED_ATTRIBUTE_NAME,
        TEMPLATE_REJECTED_ATTRIBUTE_NAME,
      ], node);
    }

    const lines: ILines = generateJSLinesForRXAsync({
      ...options,
      expression,
      templatePending,
      templateFulfilled,
      templateRejected,
    });

    return (
      (childLines.length > 0)
        ? wrapLinesWithCurlyBrackets([
          ...childLines,
          ...lines,
        ], false)
        : lines
    );
  } else if (node.hasAttribute(COMMAND_NAME)) {
    const expression: string = node.getAttribute(COMMAND_NAME) as string;
    node.removeAttribute(COMMAND_NAME);

    return wrapLinesWithCurlyBrackets([
      ...generateJSLinesForLocalTemplateFromRXContainerElement({
        ...options,
        node,
        templateName: LOCAL_TEMPLATE_NAME,
        argumentsLines: null,
      }),
      ...generateJSLinesForRXAsync({
        ...options,
        expression,
        templatePending: NULL_TEMPLATE,
        templateFulfilled: LOCAL_TEMPLATE_NAME,
        templateRejected: NULL_TEMPLATE,
      }),
    ], false);
  } else {
    return null;
  }
}


