import { fromEventTarget, IObservable, IObserver } from '@lirx/core';
import { IUnsubscribe } from '@lirx/utils';
import { HTML_NAMESPACE_URI_CONSTANT } from '../../misc/namespace-uri/html-namespace-uri.constant';
import { MATH_ML_NAMESPACE_URI_CONSTANT } from '../../misc/namespace-uri/math-ml-namespace-uri.constant';
import { SVG_NAMESPACE_URI_CONSTANT } from '../../misc/namespace-uri/svg-namespace-uri.constant';
import { IAttributeValue } from '../virtual-element-node/members/attribute/attribute-value.type';
import {
  ISetStyleProperty,
  ISetStylePropertyOrNull,
  ISetStylePropertyOrStringOrNull,
} from '../virtual-element-node/members/style/style-property.type';
import { VirtualElementNode } from '../virtual-element-node/virtual-element-node.class';
import { IClassNamesList } from './members/class/class-names-list.type';
import { differClassNames } from './members/class/differ-class-names';
import { differStylePropertiesMap } from './members/style/differ-style-map';
import { IStylePropertiesMap } from './members/style/style-properties-map.type';
import { IStylePropertyAndValueTuple } from './members/style/style-property-and-value-tuple';

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
  static createMathML<GElementNode extends MathMLElement>(
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

  /**
   * Creates an EventListener of type "type" on the element of this node, whose listener is an Observer.
   */
  setReactiveEventListener<GEvent extends Event>(
    type: string,
    observer: IObserver<GEvent>,
    options?: boolean | AddEventListenerOptions,
  ): IUnsubscribe {
    return this.on$<GEvent>(type, options)(observer);
  }

  // /**
  //  * Creates an EventListener of type "type" on the element of this node, whose listener is an Observable of Observer.
  //  */
  // setReactiveEventListenerFromObservable<GEvent extends Event>(
  //   type: string,
  //   observer$: IObservable<IObserver<GEvent>>,
  //   options?: boolean | AddEventListenerOptions,
  // ): IUnsubscribe {
  //   return this.bindObservableWithObservableOfObserver(
  //     this.on$<GEvent>(type, options),
  //     observer$,
  //   );
  // }

  /* PROPERTY */

  /**
   * Subscribes to "value$", and sets the property "propertyKey" of the element of this node, with the incoming values.
   */
  setReactiveProperty<GPropertyKey extends keyof GElementNode>(
    propertyKey: GPropertyKey,
    value$: IObservable<GElementNode[GPropertyKey]>,
  ): void {
    this.onConnected$(value$)((value: GElementNode[GPropertyKey]): void => {
      this.setProperty<GPropertyKey>(propertyKey, value);
    });
  }

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

