import {
  DEFAULT_COMPONENT_TEMPLATE_VALUES_TO_IMPORT,
} from '../../../../../component/template/constants/default-component-template-values-to-import.constant';
import { indentLines } from '../../../../misc/lines/functions/indent-lines';
import { ILines } from '../../../../misc/lines/lines.type';
import { PRIMARY_TRANSPILERS_FOR_VIRTUAL_NODE_CONSTANT } from '../../../primary/virtual-node/primary-transpilers-for-virtual-node.constant';
import {
  ITranspileReactiveHTMLToJSLinesAsComponentTemplateModuleOptions,
  transpileReactiveHTMLToJSLinesAsComponentTemplateModule,
} from './transpile-reactive-html-to-js-lines-as-component-template-module';

export interface ITranspileReactiveHTMLToComponentTemplateModuleOptions extends Omit<ITranspileReactiveHTMLToJSLinesAsComponentTemplateModuleOptions, 'transpilers' | 'importLines' | 'functionImportLines'> {
}

export function transpileReactiveHTMLToComponentTemplateModule(
  options: ITranspileReactiveHTMLToComponentTemplateModuleOptions,
): ILines {
  const importLines: ILines = Object.keys(DEFAULT_COMPONENT_TEMPLATE_VALUES_TO_IMPORT)
    .map((value: string): string => {
      return `${value},`;
    });

  const functionImportLines: ILines = [
    `{`,
    ...indentLines([
      `createCustomElement,`,
      `applyNodeModifier,`,
    ]),
    `},`,
  ];

  return transpileReactiveHTMLToJSLinesAsComponentTemplateModule({
    ...options,
    transpilers: PRIMARY_TRANSPILERS_FOR_VIRTUAL_NODE_CONSTANT,
    importLines,
    functionImportLines,
  });
}
