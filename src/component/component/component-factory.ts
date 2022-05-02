import { freeze } from '@lirx/core';
import { defineCustomElement } from '../../light-dom/custom-element/define-custom-element';
import {
  CUSTOM_ELEMENT_CONSTRUCTOR_DETAILS,
} from '../../light-dom/node/create/element-node/custom-element/details/custom-element-constructor-details.constant';
import {
  ICustomElementConstructorDetails,
} from '../../light-dom/node/create/element-node/custom-element/details/custom-element-constructor-details.type';
import {
  attachNodeChildrenToNewDocumentFragment,
} from '../../light-dom/node/move/derived/batch/attach-node-children-to-new-document-fragment';
import { HTMLElementConstructor } from '../../light-dom/types/html-element-constructor.type';
import { isFunction } from '../../misc/is/is-function';
import { injectComponentStyles } from '../component-style/misc/inject-component-style';
import { IComponentOptions } from './component-options.type';
import { IComponent } from './component.type';

/** INIT **/

function initComponent<GData extends object>(
  instance: IComponent<GData>,
  {
    template,
    styles,
  }: IComponentOptions<GData>,
): void {
  const $content: DocumentFragment = attachNodeChildrenToNewDocumentFragment(instance);

  const data: GData = freeze(
    isFunction(instance.onCreate)
      ? instance.onCreate($content)
      : Object.create(null),
  ) as GData;

  if (styles !== void 0) {
    injectComponentStyles(styles, instance);
  }

  if (template !== void 0) {
    // TODO test if it's faster to use a document fragment
    template(
      instance,
      data,
      $content,
    );
  }
}

/** FACTORY **/

export function componentFactory<GBaseClass extends HTMLElementConstructor, GData extends object>(
  baseClass: GBaseClass,
  options: IComponentOptions<GData>,
) {
  const details: ICustomElementConstructorDetails = {
    name: options.name,
    extends: options.extends,
  };

  const _class = class extends baseClass {
    static readonly [CUSTOM_ELEMENT_CONSTRUCTOR_DETAILS]: ICustomElementConstructorDetails = details;

    constructor(...args: any[]) {
      super(...args);
      // delegates DOM update (style and content) after the element is fully created
      queueMicrotask(() => {
        initComponent<GData>(this, options);
      });
    }
  };

  defineCustomElement(
    options.name,
    _class,
    {
      extends: options.extends,
    },
  );

  return _class;
}

