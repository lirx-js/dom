import {
  IGenericComponentTemplateWithImportsAsFirstArgument,
} from '../../transpilers/reactive-html/html/component/component-template-with-imports-as-first-argument/component-template-with-imports-as-first-argument.type';
import { IComponentTemplate } from '../types/options/component-template.type';
import { ICompileReactiveHTMLAsComponentTemplateOptions } from './compile-reactive-html-as-component-template';
import { generateApplyNodeModifierFunction } from './generate-apply-node-modifier-function';
import { generateCreateCustomElementFunction } from './generate-create-custom-element-function';

export interface IConvertRawComponentTemplateToComponentTemplateOptions extends Omit<ICompileReactiveHTMLAsComponentTemplateOptions, 'html'> {
  template: IGenericComponentTemplateWithImportsAsFirstArgument;
}

export function convertRawComponentTemplateToComponentTemplate<GData extends object>(
  {
    template,
    customElements,
    modifiers,
  }: IConvertRawComponentTemplateToComponentTemplateOptions,
): IComponentTemplate<GData> {
  const createCustomElement = generateCreateCustomElementFunction(customElements);
  const applyNodeModifier = generateApplyNodeModifierFunction(modifiers);

  const valuesToImport = {
    createCustomElement,
    applyNodeModifier,
  };

  return (...args: Parameters<IComponentTemplate<GData>>): ReturnType<IComponentTemplate<GData>> => {
    return template(
      valuesToImport,
      ...args,
    );
  };
}
