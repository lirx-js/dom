import {
  generateCreateCustomElementFunctionFromCustomElementsList,
} from '../../../light-dom/node/create/element-node/custom-element/generate-create-custom-element-function-from-custom-elements-list';
import {
  ICreateCustomElementFunction,
} from '../../../light-dom/node/create/element-node/custom-element/types/create-custom-element-function.type';
import {
  ICustomElementConstructorOrView,
} from '../../../light-dom/node/create/element-node/custom-element/types/custom-element-constructor-or-view.type';
import {
  generateGetNodeModifierFunctionFromModifiersList
} from '../../../light-dom/node/modify/node/generate-get-node-modifier-function-from-modifiers-list';
import { IGetNodeModifierFunction } from '../../../light-dom/node/modify/node/get-node-modifier-function.type';
import { IGenericNodeModifier } from '../../../light-dom/node/modify/node/node-modifier.type';
import { IRawComponentTemplateFunction } from '../../../transpilers/reactive-html/html/types/raw-component-template-function.type';
import { IComponentTemplate } from '../component-template.type';

export interface IConvertRawComponentTemplateToComponentTemplateOptions<GData extends object> {
  template: IRawComponentTemplateFunction<GData>;
  customElements?: ArrayLike<ICustomElementConstructorOrView>;
  modifiers?: ArrayLike<IGenericNodeModifier>;
}

export function convertRawComponentTemplateToComponentTemplate<GData extends object>(
  {
    template,
    customElements = [],
    modifiers = [],
  }: IConvertRawComponentTemplateToComponentTemplateOptions<GData>,
): IComponentTemplate<GData> {
  const createCustomElement: ICreateCustomElementFunction = generateCreateCustomElementFunctionFromCustomElementsList(customElements);
  const getNodeModifier: IGetNodeModifierFunction = generateGetNodeModifierFunctionFromModifiersList(modifiers);
  return <GParentNode extends Node>(
    parentNode: GParentNode,
    $: GData,
    $content: DocumentFragment,
  ): GParentNode => {
    return template<GParentNode>(
      parentNode,
      $,
      $content,
      createCustomElement,
      getNodeModifier,
    );
  };
}
