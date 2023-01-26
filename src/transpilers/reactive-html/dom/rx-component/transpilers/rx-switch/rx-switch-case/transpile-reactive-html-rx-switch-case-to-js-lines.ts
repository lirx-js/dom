import { throwIfHasChildNodes } from '../../../../../../../misc/dom/throw-if-has-child-nodes';
import { createMissingAttributeError } from '../../../../../../misc/errors/create-missing-attribute-error';
import { createMissingAttributeValueError } from '../../../../../../misc/errors/create-missing-attribute-value-error';
import { createSwitchCaseAlreadyDefinedError } from '../../../../../../misc/errors/create-switch-case-already-defined-error';
import { ILinesOrNull } from '../../../../../../misc/lines/lines-or-null.type';
import { ILines } from '../../../../../../misc/lines/lines.type';
import { generateTemplateVariableName } from '../../../../../../misc/templates/generate-template-variable-name';
import { IHavingPrimaryTranspilersOptions } from '../../../../../primary/primary-transpilers.type';
import {
  ITranspileCreateReactiveSwitchNodeToJSLinesOptionsTemplatesMap,
} from '../../../../../primary/transpilers/transpile-create-reactive-switch-node-to-js-lines.type';
import { extractRXAttributesFromReactiveHTMLAttribute } from '../../helpers/extract-attributes/extract-rx-attributes-from-reactive-html-attribute';
import { IMappedAttributes } from '../../helpers/extract-attributes/mapped-attributes.type';
import {
  ITranspileReactiveHTMLRXChildTemplateToJSLinesOptionsOnCommandFunction,
  ITranspileReactiveHTMLRXChildTemplateToJSLinesOptionsOnCommandFunctionOptions,
  ITranspileReactiveHTMLRXChildTemplateToJSLinesOptionsOnTagFunction,
  ITranspileReactiveHTMLRXChildTemplateToJSLinesOptionsOnTagFunctionOptions,
  transpileReactiveHTMLRXChildTemplateToJSLines,
} from '../../helpers/for-rx-template/transpile-reactive-html-rx-child-template-to-js-lines';

const TAG_NAME: string = 'rx-switch-case';
const COMMAND_NAME: string = '*switch-case';

const SWITCH_CASE_ATTRIBUTE_NAME: string = 'case';
const TEMPLATE_ATTRIBUTE_NAME: string = 'template';


const ATTRIBUTE_NAMES: Set<string> = new Set<string>([
  SWITCH_CASE_ATTRIBUTE_NAME,
  TEMPLATE_ATTRIBUTE_NAME,
]);

export interface ITranspileReactiveHTMLRXSwitchCaseToJSLinesOptions extends IHavingPrimaryTranspilersOptions {
  node: Element;
  templatesMap: ITranspileCreateReactiveSwitchNodeToJSLinesOptionsTemplatesMap;
}

export function transpileReactiveHTMLRXSwitchCaseToJSLines(
  options: ITranspileReactiveHTMLRXSwitchCaseToJSLinesOptions,
): ILinesOrNull {
  return transpileReactiveHTMLRXChildTemplateToJSLines({
    ...options,
    tagName: TAG_NAME,
    commandName: COMMAND_NAME,
    onTag: getOnTagFunctionForRXSwitchCase(options),
    onCommand: getOnCommandFunctionForRXSwitchCase(options),
  });
}

/** FUNCTIONS **/

/* TEMPLATE */

interface IGetOnTagFunctionForRXSwitchCaseOptions {
  templatesMap: ITranspileCreateReactiveSwitchNodeToJSLinesOptionsTemplatesMap;
}

function getOnTagFunctionForRXSwitchCase(
  {
    templatesMap,
  }: IGetOnTagFunctionForRXSwitchCaseOptions,
): ITranspileReactiveHTMLRXChildTemplateToJSLinesOptionsOnTagFunction {
  return (
    {
      node,
      generateTemplate,
    }: ITranspileReactiveHTMLRXChildTemplateToJSLinesOptionsOnTagFunctionOptions,
  ): ILinesOrNull => {
    let caseValue!: string;
    let template!: ILines;

    const attributes: IMappedAttributes = extractRXAttributesFromReactiveHTMLAttribute(
      node.attributes,
      ATTRIBUTE_NAMES,
    );

    /* CASE VALUE */
    const caseValueAttribute: string | undefined = attributes.get(SWITCH_CASE_ATTRIBUTE_NAME);

    if (caseValueAttribute === void 0) {
      throw createMissingAttributeError(SWITCH_CASE_ATTRIBUTE_NAME, node);
    } else {
      caseValue = caseValueAttribute;
    }

    /* TEMPLATE */
    const templateAttribute: string | undefined = attributes.get(TEMPLATE_ATTRIBUTE_NAME);

    if (templateAttribute === void 0) {
      template = generateTemplate({
        argumentsLines: null,
      });
    } else {
      template = [generateTemplateVariableName(templateAttribute)];
      throwIfHasChildNodes(node);
    }

    templatesMap.set(caseValue, template);

    return template;
  };
}

/* COMMAND */

interface IGetOnCommandFunctionForRXSwitchCaseOptions {
  templatesMap: ITranspileCreateReactiveSwitchNodeToJSLinesOptionsTemplatesMap;
}

function getOnCommandFunctionForRXSwitchCase(
  {
    templatesMap,
  }: IGetOnCommandFunctionForRXSwitchCaseOptions,
): ITranspileReactiveHTMLRXChildTemplateToJSLinesOptionsOnCommandFunction {
  return (
    {
      node,
      attributeValue: caseValue,
      generateTemplate,
    }: ITranspileReactiveHTMLRXChildTemplateToJSLinesOptionsOnCommandFunctionOptions,
  ): ILinesOrNull => {
    if (caseValue === '') {
      throw createMissingAttributeValueError(COMMAND_NAME, node);
    } else if (templatesMap.has(caseValue)) {
      throw createSwitchCaseAlreadyDefinedError(caseValue, node.parentElement!);
    } else {
      const template: ILines = generateTemplate({
        argumentsLines: null,
      });
      templatesMap.set(caseValue, template);
      return template;
    }
  };
}


