import { getAttributeValue } from '../../../../../../light-dom/attribute/get-attribute-value';
import { hasAttribute } from '../../../../../../light-dom/attribute/has-attribute';
import { removeAttribute } from '../../../../../../light-dom/attribute/remove-attribute';
import { getChildNodes } from '../../../../../../light-dom/node/properties/get-child-nodes';
import { getTagName } from '../../../../../../light-dom/node/properties/get-tag-name';
import { isElementNode } from '../../../../../../light-dom/node/type/is-element-node';
import { isTextNode } from '../../../../../../light-dom/node/type/is-text-node';
import { generateOptionalTemplateVariableName } from '../../../../../helpers/generate-template-variable-name';
import { scopeLines } from '../../../../../helpers/lines-formatting-helpers';
import { NULL_TEMPLATE } from '../../../../../helpers/null-template.constant';
import { ILines, ILinesOrNull } from '../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../require-external/require-external-function.type';
import {
  extractRXAttributesFromReactiveHTMLAttribute,
  IMappedAttributes,
} from '../helpers/extract-rx-attributes-from-reactive-html-attribute';
import {
  generateReactiveDOMJSLinesForLocalTemplateFromRXContainerElement,
  IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForLocalTemplateFromRXContainerElement,
} from '../helpers/generate-reactive-dom-js-lines-for-local-template-from-rx-container-element';
import {
  generateReactiveDOMJSLinesForRXIf,
  IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForRXIf,
} from './generate-reactive-dom-js-lines-for-rx-if';
import {
  transpileReactiveHTMLRXIfFalseToReactiveDOMJSLines,
} from './rx-if-false/transpile-reactive-html-rx-if-false-to-reactive-dom-js-lines';
import {
  IRequireExternalFunctionKeyForTranspileReactiveHTMLRXIfTrueToReactiveDOMJSLines,
  transpileReactiveHTMLRXIfTrueToReactiveDOMJSLines,
} from './rx-if-true/transpile-reactive-html-rx-if-true-to-reactive-dom-js-lines';

/*
Syntax:

<rx-if
  condition="conditionObservable"
  true="templateReferenceNameTrue"
  false="templateReferenceNameFalse"
></rx-if>

 */

/*
Syntax - alternative:

<element
  *if="conditionObservable"
>
  ...content
</element>

====> equivalent

<rx-template
  name="uuid"
>
  ...content
</rx-template>
<rx-if
  condition="conditionObservable"
  true="uuid"
></rx-if>

 */

const TAG_NAME: string = 'rx-if';
const COMMAND_NAME: string = '*if';

const CONDITION_ATTRIBUTE_NAME: string = 'condition';
const TEMPLATE_TRUE_ATTRIBUTE_NAME: string = 'true';
const TEMPLATE_FALSE_ATTRIBUTE_NAME: string = 'false';

const LOCAL_TEMPLATE_NAME: string = 'template';

const LOCAL_TEMPLATE_TRUE_NAME: string = 'template_true';
const LOCAL_TEMPLATE_FALSE_NAME: string = 'template_false';

const ATTRIBUTE_NAMES: Set<string> = new Set<string>([
  CONDITION_ATTRIBUTE_NAME,
  TEMPLATE_TRUE_ATTRIBUTE_NAME,
  TEMPLATE_FALSE_ATTRIBUTE_NAME,
]);

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLRXIfToReactiveDOMJSLines =
  | IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForRXIf
  | IRequireExternalFunctionKeyForTranspileReactiveHTMLRXIfTrueToReactiveDOMJSLines
  | IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForLocalTemplateFromRXContainerElement
  ;

export function transpileReactiveHTMLRXIfToReactiveDOMJSLines(
  node: Element,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLRXIfToReactiveDOMJSLines>,
): ILinesOrNull {
  const name: string = getTagName(node);
  if (name === TAG_NAME) {
    const attributes: IMappedAttributes = extractRXAttributesFromReactiveHTMLAttribute(
      node.attributes,
      ATTRIBUTE_NAMES,
    );
    const condition: string | undefined = attributes.get(CONDITION_ATTRIBUTE_NAME);

    if (condition === void 0) {
      throw new Error(`Missing attribute '${CONDITION_ATTRIBUTE_NAME}'`);
    }

    let templateTrue: string = generateOptionalTemplateVariableName(attributes.get(TEMPLATE_TRUE_ATTRIBUTE_NAME));
    let templateFalse: string = generateOptionalTemplateVariableName(attributes.get(TEMPLATE_FALSE_ATTRIBUTE_NAME));

    const childNodes: ChildNode[] = getChildNodes(node);
    const childLines: ILines = [];

    for (let i = 0, l = childNodes.length; i < l; i++) {
      const childNode: ChildNode = childNodes[i];
      if (isElementNode(childNode)) {
        const result: ILinesOrNull = transpileReactiveHTMLRXIfTrueToReactiveDOMJSLines(
          childNode,
          LOCAL_TEMPLATE_TRUE_NAME,
          requireExternalFunction,
        );
        if (result === null) {
          const result: ILinesOrNull = transpileReactiveHTMLRXIfFalseToReactiveDOMJSLines(
            childNode,
            LOCAL_TEMPLATE_FALSE_NAME,
            requireExternalFunction,
          );
          if (result === null) {
            throw new Error(`Found invalid element '${getTagName(childNode)}'`);
          } else if (templateFalse === NULL_TEMPLATE) {
            templateFalse = LOCAL_TEMPLATE_FALSE_NAME;
            childLines.push(...result);
          } else {
            throw new Error(`The template '${TEMPLATE_FALSE_ATTRIBUTE_NAME}' is already defined`);
          }
        } else if (templateTrue === NULL_TEMPLATE) {
          templateTrue = LOCAL_TEMPLATE_TRUE_NAME;
          childLines.push(...result);
        } else {
          throw new Error(`The template '${TEMPLATE_TRUE_ATTRIBUTE_NAME}' is already defined`);
        }
      } else if (isTextNode(childNode) && (childNode.data.trim() !== '')) {
        throw new Error(`The content of ${TAG_NAME} should not contain any Text Node`);
      }
    }

    if (
      (templateTrue === NULL_TEMPLATE)
      && (templateFalse === NULL_TEMPLATE)
    ) {
      throw new Error(`At least '${TEMPLATE_TRUE_ATTRIBUTE_NAME}' or '${TEMPLATE_FALSE_ATTRIBUTE_NAME}' attribute must be present`);
    }

    const lines: ILines = generateReactiveDOMJSLinesForRXIf(
      condition,
      templateTrue,
      templateFalse,
      requireExternalFunction,
    );

    return (
      (childLines.length > 0)
        ? scopeLines([
          ...childLines,
          ...lines,
        ])
        : lines
    );
  } else if (hasAttribute(node, COMMAND_NAME)) {
    const condition: string = getAttributeValue(node, COMMAND_NAME) as string;
    removeAttribute(node, COMMAND_NAME);

    return scopeLines([
      ...generateReactiveDOMJSLinesForLocalTemplateFromRXContainerElement(
        node,
        LOCAL_TEMPLATE_NAME,
        null,
        requireExternalFunction,
      ),
      ...generateReactiveDOMJSLinesForRXIf(
        condition,
        LOCAL_TEMPLATE_NAME,
        NULL_TEMPLATE,
        requireExternalFunction,
      ),
    ]);
  } else {
    return null;
  }
}


