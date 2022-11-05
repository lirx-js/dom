import { getElementTagName } from '../../../../../../misc/dom/get-element-tag-name';
import { createMissingAttributeError } from '../../../../../misc/errors/create-missing-attribute-error';
import { ILinesOrNull } from '../../../../../misc/lines/lines-or-null.type';
import { ILines } from '../../../../../misc/lines/lines.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../primary/primary-transpilers.type';
import { transpileReactiveHTMLElementToJSLines } from '../../../element/transpile-reactive-html-element-to-js-lines';
import {
  extractRXAttributesAndLetPropertiesFromReactiveHTMLAttribute,
} from '../helpers/extract-rx-attributes-and-let-properties-from-reactive-html-attribute';
import { generateLetPropertyLinesForInjectTemplate } from '../rx-inject-template/generate-let-property-lines-for-inject-template';
import { transpileReactiveHTMLRXInjectSlotChildNodesToLines } from './transpile-reactive-html-rx-inject-slot-child-nodes-to-lines';

/*
Syntax:

<rx-inject-slot
  name="slotName"
>
  default content
</rx-inject-slot>

// <div *inject-slot="slotName">
//   default content
// </div>

 */

const TAG_NAME: string = 'rx-inject-slot';
const COMMAND_NAME: string = '*inject-slot';

const SLOT_NAME_ATTRIBUTE_NAME: string = 'name';

const ATTRIBUTE_NAMES: Set<string> = new Set<string>([
  SLOT_NAME_ATTRIBUTE_NAME,
]);

export interface ITranspileReactiveHTMLRXInjectSlotToLinesOptions extends IHavingPrimaryTranspilersOptions {
  node: Element;
}

export function transpileReactiveHTMLRXInjectSlotToLines(
  {
    node,
    ...options
  }: ITranspileReactiveHTMLRXInjectSlotToLinesOptions,
): ILinesOrNull {
  const name: string = getElementTagName(node);
  if (name === TAG_NAME) {
    const { attributes, letProperties } = extractRXAttributesAndLetPropertiesFromReactiveHTMLAttribute(
      node.attributes,
      ATTRIBUTE_NAMES,
    );

    const slotName: string | undefined = attributes.get(SLOT_NAME_ATTRIBUTE_NAME);

    if (slotName === void 0) {
      throw createMissingAttributeError(SLOT_NAME_ATTRIBUTE_NAME, node);
    }

    const letPropertiesLines: ILines = generateLetPropertyLinesForInjectTemplate(letProperties, node);

    return transpileReactiveHTMLRXInjectSlotChildNodesToLines({
      ...options,
      slotName,
      nodes: node.childNodes,
      letPropertiesLines,
    });
  } else if (node.hasAttribute(COMMAND_NAME)) {
    const slotName: string = node.getAttribute(COMMAND_NAME) as string;
    node.removeAttribute(COMMAND_NAME);

    const element = document.createElement(TAG_NAME);
    element.setAttribute(SLOT_NAME_ATTRIBUTE_NAME, slotName);
    while (node.firstChild !== null) {
      element.appendChild(node.firstChild);
    }

    node.appendChild(element);

    return transpileReactiveHTMLElementToJSLines({
      ...options,
      node,
    });
  } else {
    return null;
  }
}
