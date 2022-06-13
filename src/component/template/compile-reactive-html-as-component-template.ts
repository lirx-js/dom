import { IGenericVirtualDOMNodeModifier } from '../../modifiers/virtual-dom-node/virtual-dom-node-modifier.type';
import { indentLines } from '../../transpilers/misc/lines/functions/indent-lines';
import { linesToString } from '../../transpilers/misc/lines/functions/lines-to-string';
import { ILines } from '../../transpilers/misc/lines/lines.type';
import {
  IComponentTemplateWithImportsAsFirstArgument,
} from '../../transpilers/reactive-html/html/component/component-template-with-imports-as-first-argument/component-template-with-imports-as-first-argument.type';
import {
  transpileReactiveHTMLToJSLinesAsComponentTemplateWithImportsAsFirstArgument,
} from '../../transpilers/reactive-html/html/component/component-template-with-imports-as-first-argument/transpile-reactive-html-to-js-lines-as-component-template-with-imports-as-first-argument';
import { ITranspileReactiveHTMLToJSLinesOptions } from '../../transpilers/reactive-html/html/transpile-reactive-html-to-js-lines';

import {
  PRIMARY_TRANSPILERS_FOR_VIRTUAL_NODE_CONSTANT,
} from '../../transpilers/reactive-html/primary/virtual-node/primary-transpilers-for-virtual-node.constant';
import { IComponentTemplate } from '../types/options/component-template.type';
import { DEFAULT_COMPONENT_TEMPLATE_VALUES_TO_IMPORT } from './constants/default-component-template-values-to-import.constant';
import { generateApplyNodeModifierFunction } from './generate-apply-node-modifier-function';
import { generateCreateCustomElementFunction, ICustomElementList } from './generate-create-custom-element-function';

export interface ICompileReactiveHTMLAsComponentTemplateOptions extends Omit<ITranspileReactiveHTMLToJSLinesOptions, 'transpilers'> {
  customElements?: ICustomElementList;
  modifiers?: readonly IGenericVirtualDOMNodeModifier[];
}

export function compileReactiveHTMLAsComponentTemplate<GData extends object>(
  {
    customElements,
    modifiers,
    ...options
  }: ICompileReactiveHTMLAsComponentTemplateOptions,
): IComponentTemplate<GData> {
  const createCustomElement = generateCreateCustomElementFunction(customElements);
  const applyNodeModifier = generateApplyNodeModifierFunction(modifiers);

  const valuesToImport = {
    ...DEFAULT_COMPONENT_TEMPLATE_VALUES_TO_IMPORT,
    createCustomElement,
    applyNodeModifier,
  };

  const functionImportLines: ILines = [
    `{`,
    ...indentLines(
      Object.keys(valuesToImport).map((value: string): string => {
        return `${value},`;
      }),
    ),
    `},`,
  ];

  const lines: ILines = transpileReactiveHTMLToJSLinesAsComponentTemplateWithImportsAsFirstArgument({
    ...options,
    functionImportLines,
    transpilers: PRIMARY_TRANSPILERS_FOR_VIRTUAL_NODE_CONSTANT,
  });

  const compiledReactiveHTML: string = linesToString(lines);

  // console.log(compiledReactiveHTML);

  const fnc = new Function(
    '...a',
    `return(${compiledReactiveHTML})(...a);`,
  ) as IComponentTemplateWithImportsAsFirstArgument<GData>;

  return (...args: Parameters<IComponentTemplate<GData>>): ReturnType<IComponentTemplate<GData>> => {
    return fnc(valuesToImport, ...args);
  };
}


