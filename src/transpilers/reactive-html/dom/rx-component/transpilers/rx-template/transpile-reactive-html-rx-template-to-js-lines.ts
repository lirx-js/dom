import { getElementTagName } from '../../../../../../misc/dom/get-element-tag-name';
import { createMissingAttributeError } from '../../../../../misc/errors/create-missing-attribute-error';
import { indentLines } from '../../../../../misc/lines/functions/indent-lines';
import { ILinesOrNull } from '../../../../../misc/lines/lines-or-null.type';
import { generateTemplateVariableName } from '../../../../../misc/templates/generate-template-variable-name';
import { IHavingPrimaryTranspilersOptions } from '../../../../primary/primary-transpilers.type';
import {
  extractRXAttributesAndLetPropertiesFromReactiveHTMLAttribute,
} from '../helpers/extract-attributes/extract-rx-attributes-and-let-properties-from-reactive-html-attribute';
import { generateJSLinesForRXTemplateFromNodes } from '../helpers/for-rx-template/generate-js-lines-for-rx-template-from-nodes';
import { generateLetPropertyLinesForTemplate } from '../helpers/for-rx-template/let-properties/generate-let-property-lines-for-template';

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

const ATTRIBUTE_NAMES: Set<string> = new Set<string>([
  TEMPLATE_NAME_ATTRIBUTE_NAME,
]);

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
    const { attributes, letProperties } = extractRXAttributesAndLetPropertiesFromReactiveHTMLAttribute(
      node.attributes,
      ATTRIBUTE_NAMES,
    );

    const templateName: string | undefined = attributes.get(TEMPLATE_NAME_ATTRIBUTE_NAME);

    if (templateName === void 0) {
      throw createMissingAttributeError(TEMPLATE_NAME_ATTRIBUTE_NAME, node);
    }

    return [
      `// template`,
      `const ${generateTemplateVariableName(templateName)} = (`,
      ...indentLines(
        generateJSLinesForRXTemplateFromNodes({
          ...options,
          nodes: node.childNodes,
          argumentsLines: generateLetPropertyLinesForTemplate(letProperties),
        }),
      ),
      `);`,
    ];
  } else {
    return null;
  }
}


