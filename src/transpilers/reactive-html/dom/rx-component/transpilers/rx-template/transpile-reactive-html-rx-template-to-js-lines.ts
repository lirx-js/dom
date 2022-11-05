import { getElementTagName } from '../../../../../../misc/dom/get-element-tag-name';
import { createDuplicateTemplateError } from '../../../../../misc/errors/create-duplicate-template-error';
import { createInvalidAttributeFoundError } from '../../../../../misc/errors/create-invalid-attribute-found-error';
import { createMissingAttributeError } from '../../../../../misc/errors/create-missing-attribute-error';
import { indentLines } from '../../../../../misc/lines/functions/indent-lines';
import { ILinesOrNull } from '../../../../../misc/lines/lines-or-null.type';
import { generateTemplateVariableName } from '../../../../../misc/templates/generate-template-variable-name';
import { IHavingPrimaryTranspilersOptions } from '../../../../primary/primary-transpilers.type';
import { transpileReactiveHTMLNodesToJSLines } from '../../../nodes/transpile-reactive-html-nodes-to-js-lines';
import { extractLetPropertyFromReactiveHTMLAttribute, ILetProperty } from '../helpers/extract-let-property-from-reactive-html-attribute';
import { generateJSLinesForRXTemplate } from './generate-js-lines-for-rx-template';
import { generateLetPropertyLinesForTemplate } from './generate-let-property-lines-for-template';

/*
Syntax:

<rx-template
  name="templateReference"
  let-var1
  let-var2
>
  ...content
</rx-template>

 */

const TAG_NAME: string = 'rx-template';

const TEMPLATE_NAME_ATTRIBUTE_NAME: string = 'name';

export interface ITranspileReactiveHTMLRXTemplateToJSLinesOptions extends IHavingPrimaryTranspilersOptions {
  node: Element;
}

export function transpileReactiveHTMLRXTemplateToJSLines(
  {
    node,
    ...options
  }: ITranspileReactiveHTMLRXTemplateToJSLinesOptions,
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
        if (attribute.name === TEMPLATE_NAME_ATTRIBUTE_NAME) {
          templateName = attribute.value;
        } else {
          throw createInvalidAttributeFoundError(attribute);
        }
      } else {
        letProperties.push(letProperty);
      }
    }

    if (templateName === void 0) {
      throw createMissingAttributeError(TEMPLATE_NAME_ATTRIBUTE_NAME, node);
    }

    const letPropertiesLines: ILinesOrNull = generateLetPropertyLinesForTemplate(letProperties);

    const transpiledChildren: ILinesOrNull = transpileReactiveHTMLNodesToJSLines({
      ...options,
      nodes: node.childNodes,
    });

    return [
      `// template`,
      `const ${generateTemplateVariableName(templateName)} = (`,
      ...indentLines(
        generateJSLinesForRXTemplate({
          ...options,
          argumentsLines: letPropertiesLines,
          bodyLines: transpiledChildren,
        }),
      ),
      `);`,
    ];
  } else {
    return null;
  }
}


