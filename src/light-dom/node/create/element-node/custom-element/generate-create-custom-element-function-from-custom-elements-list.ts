import { createMissingComponentImportRXDOMError } from '../../../../../misc/errors/rx-dom-error-1--missing-component-import';
import { createCustomElementNotDefinedRXDOMError } from '../../../../../misc/errors/rx-dom-error-5--custom-element-not-defined';
import { createCustomElementsWithSameNameRXDOMError } from '../../../../../misc/errors/rx-dom-error-6--custom-elements-with-same-name';
import { createDifferentConstructorsRXDOMError } from '../../../../../misc/errors/rx-dom-error-7--different-constructors';
import { getCustomElementConstructorFromTagName } from '../../../../custom-element/get-custom-element-constructor-from-tag-name';
import { getCustomElementRegistry } from '../../../../custom-element/get-custom-element-registry';
import { getCustomElementTagName } from '../../../../custom-element/get-custom-element-tag-name';
import { isCustomElementDefined } from '../../../../custom-element/is-custom-element-defined';
import { HTMLElementConstructor } from '../../../../types/html-element-constructor.type';
import { createElement, ICreateElementOptions } from '../create-element';
import { ICustomElementConstructorDetails } from './details/custom-element-constructor-details.type';
import { getCustomElementConstructorDetailsOrThrow } from './details/get-custom-element-constructor-details-or-throw';
import { ICreateCustomElementFunction } from './types/create-custom-element-function.type';
import { ICustomElementConstructorOrView } from './types/custom-element-constructor-or-view.type';
import { ICustomElementConstructor } from './types/custom-element-constructor.type';
import { customElementRaw } from './views/build-in/custom-element-raw';
import { IGenericCustomElementView } from './views/custom-element-view.type';
import { isCustomElementView } from './views/is-custom-element-view';

export interface IGenerateCreateCustomElementFunctionFromCustomElementsListOptions {
  allowDeferred?: boolean;
}

export function generateCreateCustomElementFunctionFromCustomElementsList(
  customElements: ArrayLike<ICustomElementConstructorOrView>,
  {
    allowDeferred = false,
  }: IGenerateCreateCustomElementFunctionFromCustomElementsListOptions = {},
): ICreateCustomElementFunction {
  const customElementsMap = new Map<string, IGenericCustomElementView>();

  for (let i = 0, l = customElements.length; i < l; i++) {
    const customElementOrReference: ICustomElementConstructorOrView = customElements[i];

    const view: IGenericCustomElementView = isCustomElementView(customElementOrReference)
      ? customElementOrReference
      : customElementRaw(customElementOrReference);

    if (customElementsMap.has(view.tagName)) {
      createCustomElementsWithSameNameRXDOMError(view.tagName);
    } else {
      customElementsMap.set(view.tagName, view);
    }
  }

  return <GElement extends Element>(
    tagName: string,
    options?: ICreateElementOptions,
  ): GElement => {
    const customElementName: string = getCustomElementTagName(tagName, options);

    if (customElementsMap.has(customElementName)) {
      const customElementConstructor: HTMLElementConstructor | undefined = getCustomElementConstructorFromTagName(customElementName);

      if (customElementConstructor === void 0) {
        if (allowDeferred) {
          const element: GElement = createElement<GElement>(tagName, options);

          customElementsMap.get(customElementName)!.resolve()
            .then((): void => {
              if (isCustomElementDefined(tagName)) {
                getCustomElementRegistry().upgrade(element);
              } else {
                throw createCustomElementNotDefinedRXDOMError(customElementName);
              }
            });

          return element;
        } else {
          throw createCustomElementNotDefinedRXDOMError(customElementName);
        }
      } else {
        const details: ICustomElementConstructorDetails = getCustomElementConstructorDetailsOrThrow(customElementConstructor);

        if (details.extends !== void 0) {
          if (
            (options === void 0)
            || (options.is === void 0)
          ) {
            tagName = details.extends;
            options = {
              ...options,
              is: details.name,
            };
          }
        }

        customElementsMap.get(customElementName)!.resolve()
          .then((_customElementConstructor: ICustomElementConstructor): void => {
            if (_customElementConstructor !== customElementConstructor) {
              throw createDifferentConstructorsRXDOMError(customElementName);
            }
          });

        return createElement<GElement>(tagName, options);
      }
    } else {
      throw createMissingComponentImportRXDOMError(customElementName);
    }
  };
}
