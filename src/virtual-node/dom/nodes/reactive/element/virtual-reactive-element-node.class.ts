import { fromEventTarget, IObservable } from '@lirx/core';
import { IUnsubscribe } from '@lirx/utils';
import { HTML_NAMESPACE_URI_CONSTANT } from '../../../../../misc/namespace-uri/html-namespace-uri.constant';
import { MATH_ML_NAMESPACE_URI_CONSTANT } from '../../../../../misc/namespace-uri/math-ml-namespace-uri.constant';
import { SVG_NAMESPACE_URI_CONSTANT } from '../../../../../misc/namespace-uri/svg-namespace-uri.constant';
import { IAttributeValue } from '../../static/element/attribute/attribute-value.type';
import {
  ISetStyleProperty,
  ISetStylePropertyOrNull,
  ISetStylePropertyOrStringOrNull,
} from '../../static/element/style/style-property.type';
import { ISetCaseInsensitivePropertyValue, VirtualElementNode } from '../../static/element/virtual-element-node.class';
import { IClassNamesList } from './class/class-names-list.type';
import { differClassNames } from './class/differ-class-names';
import { differStylePropertiesMap } from './style/differ-style-map';
import { IStylePropertiesMap } from './style/style-properties-map.type';
import { IStylePropertyAndValueTuple } from './style/style-property-and-value-tuple';


/**
 * Represents an abstract Element in an abstract DOM, having "dynamic" properties (based on Observables).
 */
export class VirtualReactiveElementNode<GElementNode extends Element> extends VirtualElementNode<GElementNode> {

  /**
   * Creates an HTML VirtualReactiveElementNode
   */
  static createHTML<GKey extends keyof HTMLElementTagNameMap>(
    name: GKey,
    options?: ElementCreationOptions,
  ): VirtualReactiveElementNode<HTMLElementTagNameMap[GKey]>;
  static createHTML<GElementNode extends HTMLElement>(
    name: string,
    options?: ElementCreationOptions,
  ): VirtualReactiveElementNode<GElementNode>;
  static createHTML(
    name: string,
    options?: ElementCreationOptions,
  ): VirtualReactiveElementNode<HTMLElement> {
    return new (this)<HTMLElement>(
      HTML_NAMESPACE_URI_CONSTANT,
      name,
      options,
    );
  }

  /**
   * Creates a SVG VirtualReactiveElementNode
   */
  static createSVG<GKey extends keyof SVGElementTagNameMap>(
    name: GKey,
    options?: ElementCreationOptions,
  ): VirtualReactiveElementNode<SVGElementTagNameMap[GKey]>;
  static createSVG<GElementNode extends SVGElement>(
    name: string,
    options?: ElementCreationOptions,
  ): VirtualReactiveElementNode<GElementNode>;
  static createSVG(
    name: string,
    options?: ElementCreationOptions,
  ): VirtualReactiveElementNode<SVGElement> {
    return new (this)<SVGElement>(
      SVG_NAMESPACE_URI_CONSTANT,
      name,
      options,
    );
  }

  /**
   * Creates a MathML VirtualReactiveElementNode
   */
  static createMathML<GElementNode extends Element>(
    name: string,
    options?: ElementCreationOptions,
  ): VirtualReactiveElementNode<GElementNode> {
    return new (this)<GElementNode>(
      MATH_ML_NAMESPACE_URI_CONSTANT,
      name,
      options,
    );
  }

  /* EVENT LISTENER */

  /**
   * Creates an EventListener of type "type" on the element of this node, represented as an Observable.
   */
  on$<GEvent extends Event>(
    type: string,
    options?: boolean | AddEventListenerOptions,
  ): IObservable<GEvent> {
    return fromEventTarget<string, GEvent>(
      this._elementNode as any,
      type,
      options,
    );
  }

  /* PROPERTY */

  /**
   * Subscribes to "value$", and sets the property "propertyKey" of the element of this node, with the incoming values.
   */
  setReactiveProperty<GPropertyKey extends string>(
    propertyKey: GPropertyKey,
    value$: IObservable<ISetCaseInsensitivePropertyValue<GElementNode, GPropertyKey>>,
  ): IUnsubscribe {
    return this.onConnected$(value$)((value: ISetCaseInsensitivePropertyValue<GElementNode, GPropertyKey>): void => {
      this.setCaseInsensitiveProperty<GPropertyKey>(propertyKey, value);
    });
  }

  // setReactiveProperty<GPropertyKey extends keyof GElementNode>(
  //   propertyKey: GPropertyKey,
  //   value$: IObservable<GElementNode[GPropertyKey]>,
  // ): void {
  //   this.onConnected$(value$)((value: GElementNode[GPropertyKey]): void => {
  //     this.setProperty<GPropertyKey>(propertyKey, value);
  //   });
  // }

  /* ATTRIBUTE */

  /**
   * Subscribes to "value$", and sets the attribute "name" of the element of this node, with the incoming values.
   */
  setReactiveAttribute(
    name: string,
    value$: IObservable<IAttributeValue>,
  ): IUnsubscribe {
    return this.onConnected$(value$)((value: IAttributeValue): void => {
      this.setAttribute(name, value);
    });
  }

  /* CLASS */

  /**
   * Subscribes to "enabled$", and sets the css class "name" of the element of this node, with the incoming values.
   */
  setReactiveClass(
    name: string,
    enabled$: IObservable<boolean>,
  ): IUnsubscribe {
    return this.onConnected$(enabled$)((enabled: boolean): void => {
      this.setClass(name, enabled);
    });
  }

  /**
   * Subscribes to "classNamesList$", and sets the css classes of the element of this node, with the incoming values.
   */
  setReactiveClassNamesList(
    classNamesList$: IObservable<IClassNamesList>,
  ): IUnsubscribe {
    let previousClassNames: IClassNamesList = new Set<string>();

    return this.onConnected$(classNamesList$)((classNamesList: IClassNamesList): void => {
      const nextClassNames: string[] = differClassNames(previousClassNames, classNamesList);

      const iterator: IterableIterator<string> = previousClassNames.values();
      let result: IteratorResult<string>;
      while (!(result = iterator.next()).done) {
        this.setClass(result.value, false);
      }

      for (let i = 0, l = nextClassNames.length; i < l; i++) {
        this.setClass(nextClassNames[i], true);
      }

      previousClassNames = new Set<string>(classNamesList);
    });
  }

  /* STYLE */

  /**
   * Subscribes to "enabled$", and sets the style property "name" of the element of this node, with the incoming values.
   */
  setReactiveStyleProperty(
    name: string,
    styleProperty$: IObservable<ISetStylePropertyOrStringOrNull>,
  ): IUnsubscribe {
    return this.onConnected$(styleProperty$)((styleProperty: ISetStylePropertyOrStringOrNull): void => {
      this.setStyleProperty(name, styleProperty);
    });
  }

  /**
   * Subscribes to "stylePropertiesMap$", and sets the style properties of the element of this node, with the incoming values.
   */
  setReactiveStylePropertiesMap(
    stylePropertiesMap$: IObservable<IStylePropertiesMap>,
  ): IUnsubscribe {
    let previousStyles: IStylePropertiesMap = new Map<string, ISetStyleProperty>();

    return this.onConnected$(stylePropertiesMap$)((stylePropertiesMap: IStylePropertiesMap): void => {
      const nextStyles: IStylePropertyAndValueTuple[] = differStylePropertiesMap(previousStyles, stylePropertiesMap);

      const iterator: IterableIterator<string> = previousStyles.keys();
      let result: IteratorResult<string>;
      while (!(result = iterator.next()).done) {
        this.setStyleProperty(result.value, null);
      }

      for (let i = 0, l = nextStyles.length; i < l; i++) {
        const [name, property]: [string, ISetStylePropertyOrNull] = nextStyles[i];
        this.setStyleProperty(name, property);
      }

      previousStyles = new Map<string, ISetStyleProperty>(stylePropertiesMap);
    });
  }
}

