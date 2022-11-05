import { getElementTagName } from '../../../../../../misc/dom/get-element-tag-name';
import { isElementNode } from '../../../../../../misc/dom/is/is-element-node';
import { isTextNode } from '../../../../../../misc/dom/is/is-text-node';
import { createInvalidElementFoundError } from '../../../../../misc/errors/create-invalid-element-found-error';
import { createMissingAttributeError } from '../../../../../misc/errors/create-missing-attribute-error';
import { createShouldNotContainTextNodeError } from '../../../../../misc/errors/create-should-not-contain-text-node-error';
import { createSwitchDefaultAlreadyDefinedError } from '../../../../../misc/errors/create-switch-default-already-defined-error';
import { ILinesOrNull } from '../../../../../misc/lines/lines-or-null.type';
import { ILines } from '../../../../../misc/lines/lines.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../primary/primary-transpilers.type';
import {
  extractRXAttributesFromReactiveHTMLAttribute,

} from '../helpers/extract-rx-attributes-from-reactive-html-attribute';
import { IMappedAttributes } from '../helpers/mapped-attributes.type';
import { generateJSLinesForRXSwitch } from './generate-reactive-dom-js-lines-for-rx-switch';
import { transpileReactiveHTMLRXSwitchCaseToJSLines } from './rx-switch-case/transpile-reactive-html-rx-switch-case-to-js-lines';
import { transpileReactiveHTMLRXSwitchDefaultToJSLines } from './rx-switch-default/transpile-reactive-html-rx-switch-default-to-js-lines';
import { SWITCH_DEFAULT_NAME } from './switch-default-name.constant';
import { SWITCH_MAP_NAME } from './switch-map-name.constant';

const TAG_NAME: string = 'rx-switch';

const EXPRESSION_ATTRIBUTE_NAME: string = 'expression';

const ATTRIBUTE_NAMES: Set<string> = new Set<string>([
  EXPRESSION_ATTRIBUTE_NAME,
]);

export interface ITranspileReactiveHTMLRXSwitchToJSLinesOptions extends IHavingPrimaryTranspilersOptions {
  node: Element;
}

export function transpileReactiveHTMLRXSwitchToJSLines(
  {
    node,
    ...options
  }: ITranspileReactiveHTMLRXSwitchToJSLinesOptions,
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

    const existingSwitchCaseValues: Set<string> = new Set<string>();

    const childNodes: ArrayLike<ChildNode> = node.childNodes;
    const childLines: ILines = [];
    let switchDefaultFound: boolean = false;

    for (let i = 0, l = childNodes.length; i < l; i++) {
      const childNode: ChildNode = childNodes[i];
      if (isElementNode(childNode)) {
        const result: ILinesOrNull = transpileReactiveHTMLRXSwitchCaseToJSLines({
          ...options,
          node: childNode,
          switchMapName: SWITCH_MAP_NAME,
          existingSwitchCaseValues,
        });
        if (result === null) {
          const result: ILinesOrNull = transpileReactiveHTMLRXSwitchDefaultToJSLines({
            ...options,
            node: childNode,
            switchDefaultName: SWITCH_DEFAULT_NAME,
          });
          if (result === null) {
            throw createInvalidElementFoundError(childNode);
          } else {
            if (switchDefaultFound) {
              throw createSwitchDefaultAlreadyDefinedError(node);
            } else {
              switchDefaultFound = true;
              childLines.push(...result);
            }
          }
        } else {
          childLines.push(...result);
        }
      } else if (isTextNode(childNode) && (childNode.data.trim() !== '')) {
        throw createShouldNotContainTextNodeError(node);
      }
    }

    return generateJSLinesForRXSwitch({
      ...options,
      expression,
      childLines,
      switchMapName: SWITCH_MAP_NAME,
      switchDefaultName: SWITCH_DEFAULT_NAME,
    });
  } else {
    return null;
  }
}


