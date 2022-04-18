import { getAttributeValue } from '../../../../../../light-dom/attribute/get-attribute-value';
import { hasAttribute } from '../../../../../../light-dom/attribute/has-attribute';
import { removeAttribute } from '../../../../../../light-dom/attribute/remove-attribute';
import { getChildNodes } from '../../../../../../light-dom/node/properties/get-child-nodes';
import { getTagName } from '../../../../../../light-dom/node/properties/get-tag-name';
import { ILinesOrNull } from '../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../require-external/require-external-function.type';
import { generateReactiveDOMJSLinesForLocalTemplateFromNodes } from './generate-reactive-dom-js-lines-for-local-template-from-nodes';
import {
  generateReactiveDOMJSLinesForLocalTemplateFromRXContainerElement,
  IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForLocalTemplateFromRXContainerElement,
} from './generate-reactive-dom-js-lines-for-local-template-from-rx-container-element';

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLRXChildTemplateToReactiveDOMJSLines = IRequireExternalFunctionKeyForGenerateReactiveDOMJSLinesForLocalTemplateFromRXContainerElement;

export function transpileReactiveHTMLRXChildTemplateToReactiveDOMJSLines(
  node: Element,
  tagName: string,
  getTagTemplateArgument: (node: Element) => ILinesOrNull,
  commandName: string,
  getCommandTemplateArgument: (attributeValue: string) => ILinesOrNull,
  templateName: string,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLRXChildTemplateToReactiveDOMJSLines>,
): ILinesOrNull {
  const name: string = getTagName(node);
  if (name === tagName) {
    return [
      `// ${tagName}`,
      ...generateReactiveDOMJSLinesForLocalTemplateFromNodes(
        getChildNodes(node),
        templateName,
        getTagTemplateArgument(node),
        requireExternalFunction,
      ),
    ];
  } else if (hasAttribute(node, commandName)) {
    const value: string = getAttributeValue(node, commandName) as string;
    removeAttribute(node, commandName);

    return [
      `// ${tagName}`,
      ...generateReactiveDOMJSLinesForLocalTemplateFromRXContainerElement(
        node,
        templateName,
        getCommandTemplateArgument(value),
        requireExternalFunction,
      ),
    ];
  } else {
    return null;
  }
}


