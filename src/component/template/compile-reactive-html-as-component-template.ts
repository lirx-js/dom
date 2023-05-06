import { IGenericVirtualDOMNodeModifier } from '../../dom-manipulation/modifiers/virtual-dom-node-modifier/virtual-dom-node-modifier.type';
import { indentLines } from '../../syntax/misc/lines/functions/indent-lines';
import { linesToString } from '../../syntax/misc/lines/functions/lines-to-string';
import { ILines } from '../../syntax/misc/lines/lines.type';
import { generateJsLinesForValuesToImportFromObject } from '../../syntax/misc/misc/generate-js-lines-for-values-to-import-from-object';
import {
  IComponentTemplateWithImportsAsFirstArgument,
} from '../../syntax/reactive-html/transpile/html/component/component-template-with-imports-as-first-argument/component-template-with-imports-as-first-argument.type';
import {
  transpileReactiveHTMLToJSLinesAsComponentTemplateWithImportsAsFirstArgument,
} from '../../syntax/reactive-html/transpile/html/component/component-template-with-imports-as-first-argument/transpile-reactive-html-to-js-lines-as-component-template-with-imports-as-first-argument';
import { ITranspileReactiveHTMLToJSLinesOptions } from '../../syntax/reactive-html/transpile/html/transpile-reactive-html-to-js-lines';

import {
  PRIMARY_TRANSPILERS_FOR_VIRTUAL_NODE_BASED_REACTIVE_HTML,
} from '../../syntax/reactive-html/transpile/primary/virtual-node-based/primary-transpilers-for-virtual-node-based-reactive-html.constant';
import {
  VALUES_TO_IMPORT_FOR_VIRTUAL_NODE_BASED_REACTIVE_HTML,
} from '../../syntax/reactive-html/transpile/primary/virtual-node-based/values-to-import-for-virtual-node-based-reactive-html.constant';
import { IComponentTemplate } from '../types/options/component-template.type';
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
    ...VALUES_TO_IMPORT_FOR_VIRTUAL_NODE_BASED_REACTIVE_HTML,
    createCustomElement,
    applyNodeModifier,
  };

  const functionImportLines: ILines = [
    `{`,
    ...indentLines(
      generateJsLinesForValuesToImportFromObject(valuesToImport),
    ),
    `},`,
  ];

  const lines: ILines = transpileReactiveHTMLToJSLinesAsComponentTemplateWithImportsAsFirstArgument({
    ...options,
    functionImportLines: functionImportLines,
    transpilers: PRIMARY_TRANSPILERS_FOR_VIRTUAL_NODE_BASED_REACTIVE_HTML,
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


