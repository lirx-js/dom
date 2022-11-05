import { getElementTagName } from '../../../../../../misc/dom/get-element-tag-name';
import { throwIfHasChildNodes } from '../../../../../../misc/dom/throw-if-has-child-nodes';
import { createDuplicateTemplateError } from '../../../../../misc/errors/create-duplicate-template-error';
import { createInvalidAttributeFoundError } from '../../../../../misc/errors/create-invalid-attribute-found-error';
import { createMissingAttributeError } from '../../../../../misc/errors/create-missing-attribute-error';
import { indentLines } from '../../../../../misc/lines/functions/indent-lines';
import { ILinesOrNull } from '../../../../../misc/lines/lines-or-null.type';
import { ILines } from '../../../../../misc/lines/lines.type';
import { generateTemplateVariableName } from '../../../../../misc/templates/generate-template-variable-name';
import { IHavingPrimaryTranspilersOptions } from '../../../../primary/primary-transpilers.type';
import { extractLetPropertyFromReactiveHTMLAttribute, ILetProperty } from '../helpers/extract-let-property-from-reactive-html-attribute';
import { generateLetPropertyLinesForInjectTemplate } from './generate-let-property-lines-for-inject-template';

/*
Syntax:

<rx-inject-template
  template="templateReference"
  let-var1="data1"
  let-var2="data2"
></rx-inject-template>

 */

const TAG_NAME: string = 'rx-inject-template';

const TEMPLATE_ATTRIBUTE_NAME: string = 'template';

export interface ITranspileReactiveHTMLRXInjectTemplateToLinesOptions extends IHavingPrimaryTranspilersOptions {
  node: Element;
}

export function transpileReactiveHTMLRXInjectTemplateToLines(
  {
    node,
    ...options
  }: ITranspileReactiveHTMLRXInjectTemplateToLinesOptions,
): ILinesOrNull {
  const name: string = getElementTagName(node);
  if (name === TAG_NAME) {
    // TODO use extractRXAttributesAndLetPropertiesFromReactiveHTMLAttribute
    
    let templateName!: string;
    const letProperties: ILetProperty[] = [];

    const attributes: Attr[] = Array.from(node.attributes);
    for (let i = 0, l = attributes.length; i < l; i++) {
      const attribute: Attr = attributes[i];
      const letProperty: ILetProperty | null = extractLetPropertyFromReactiveHTMLAttribute(attribute);
      if (letProperty === null) {
        if (attribute.name === TEMPLATE_ATTRIBUTE_NAME) {
          templateName = attribute.value;
        } else {
          throw createInvalidAttributeFoundError(attribute);
        }
      } else {
        letProperties.push(letProperty);
      }
    }

    if (templateName === void 0) {
      throw createMissingAttributeError(TEMPLATE_ATTRIBUTE_NAME, node);
    }

    throwIfHasChildNodes(node);

    const letPropertiesLines: ILines = generateLetPropertyLinesForInjectTemplate(letProperties, node);

    return [
      `// inject template`,
      `${generateTemplateVariableName(templateName)}(`,
      ...indentLines([
        `parentNode,`,
        ...letPropertiesLines,
      ]),
      `);`,
    ];
  } else {
    return null;
  }
}

