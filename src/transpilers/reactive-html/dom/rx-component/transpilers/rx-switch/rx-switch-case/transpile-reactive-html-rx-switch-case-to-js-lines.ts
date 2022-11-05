import { getElementTagName } from '../../../../../../../misc/dom/get-element-tag-name';
import { throwIfHasChildNodes } from '../../../../../../../misc/dom/throw-if-has-child-nodes';
import { createMissingAttributeError } from '../../../../../../misc/errors/create-missing-attribute-error';
import { createSwitchCaseAlreadyDefinedError } from '../../../../../../misc/errors/create-switch-case-already-defined-error';
import { wrapLinesWithCurlyBrackets } from '../../../../../../misc/lines/functions/wrap-lines-with-curly-brackets';
import { ILinesOrNull } from '../../../../../../misc/lines/lines-or-null.type';
import { generateOptionalTemplateVariableName } from '../../../../../../misc/templates/generate-template-variable-name';
import { IHavingPrimaryTranspilersOptions } from '../../../../../primary/primary-transpilers.type';
import {
  extractRXAttributesFromReactiveHTMLAttribute,

} from '../../helpers/extract-rx-attributes-from-reactive-html-attribute';
import {
  generateJSLinesForLocalTemplateFromRXContainerElement,
} from '../../helpers/generate-js-lines-for-local-template-from-rx-container-element';
import { IMappedAttributes } from '../../helpers/mapped-attributes.type';
import { generateJSLinesForRXSwitchCase } from './generate-js-lines-for-rx-switch-case';

const TAG_NAME: string = 'rx-switch-case';
const COMMAND_NAME: string = '*switch-case';

const SWITCH_CASE_ATTRIBUTE_NAME: string = 'case';
const TEMPLATE_ATTRIBUTE_NAME: string = 'template';

const LOCAL_TEMPLATE_NAME: string = 'template';

const ATTRIBUTE_NAMES: Set<string> = new Set<string>([
  SWITCH_CASE_ATTRIBUTE_NAME,
  TEMPLATE_ATTRIBUTE_NAME,
]);

export interface ITranspileReactiveHTMLRXSwitchCaseToJSLinesOptions extends IHavingPrimaryTranspilersOptions {
  node: Element;
  switchMapName: string;
  existingSwitchCaseValues: Set<string>;
}

export function transpileReactiveHTMLRXSwitchCaseToJSLines(
  {
    node,
    switchMapName,
    existingSwitchCaseValues,
    ...options
  }: ITranspileReactiveHTMLRXSwitchCaseToJSLinesOptions,
): ILinesOrNull {
  const name: string = getElementTagName(node);
  if (name === TAG_NAME) {
    const attributes: IMappedAttributes = extractRXAttributesFromReactiveHTMLAttribute(node.attributes, ATTRIBUTE_NAMES);
    const caseValue: string | undefined = attributes.get(SWITCH_CASE_ATTRIBUTE_NAME);
    const template: string | undefined = attributes.get(TEMPLATE_ATTRIBUTE_NAME);

    // TODO if "template" is undefined, replace "template" with the rx-switch-case content

    if (caseValue === void 0) {
      throw createMissingAttributeError(SWITCH_CASE_ATTRIBUTE_NAME, node);
    }

    if (existingSwitchCaseValues.has(caseValue)) {
      throw createSwitchCaseAlreadyDefinedError(caseValue, node.parentElement!);
    } else {
      existingSwitchCaseValues.add(caseValue);
    }

    throwIfHasChildNodes(node);

    return generateJSLinesForRXSwitchCase({
      switchMapName,
      caseValue,
      template: generateOptionalTemplateVariableName(template),
    });
  } else if (node.hasAttribute(COMMAND_NAME)) {
    const caseValue: string = node.getAttribute(COMMAND_NAME) as string;
    node.removeAttribute(COMMAND_NAME);

    return wrapLinesWithCurlyBrackets([
      ...generateJSLinesForLocalTemplateFromRXContainerElement({
        ...options,
        node,
        templateName: LOCAL_TEMPLATE_NAME,
        argumentsLines: null,
      }),
      ...generateJSLinesForRXSwitchCase({
        switchMapName,
        caseValue,
        template: LOCAL_TEMPLATE_NAME,
      }),
    ]);
  } else {
    return null;
  }
}


