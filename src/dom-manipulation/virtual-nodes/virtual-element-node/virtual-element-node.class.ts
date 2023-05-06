import { linkDOMNodeWithVirtualDOMNode } from '../virtual-node/members/link/link-dom-node-with-virtual-dom-node';
import { VirtualDOMNode } from '../virtual-dom-node/virtual-dom-node.class';
import { IVirtualShadowRootNodeInit, VirtualShadowRootNode } from '../virtual-shadow-root-node/virtual-shadow-root-node.class';
import { IAttributeValue } from './members/attribute/attribute-value.type';
import { InferVirtualElementNodePropertyKeys } from './members/property/infer-virtual-element-node-property-keys.type';
import { IGetStylePropertyOptions, ISetStylePropertyOrStringOrNull, IStyleProperty } from './members/style/style-property.type';


/**
 * Represents an abstract Element in an abstract DOM.
 * This is used as a wrapper for an Element.
 */
export class VirtualElementNode<GElementNode extends Element> extends VirtualDOMNode {
  protected readonly _elementNode: GElementNode;
  protected _shadowRoot: VirtualShadowRootNode<this> | null;
  protected readonly _selfDOMNodes: [GElementNode]; // computed

  constructor(
    namespaceURI: string,
    name: string,
    options?: ElementCreationOptions,
  ) {
    super();
    this._elementNode = document.createElementNS(namespaceURI, name, options) as GElementNode;
    this._shadowRoot = null;
    this._selfDOMNodes = [
      this._elementNode,
    ];

    linkDOMNodeWithVirtualDOMNode(this._elementNode, this);
  }

  /**
   * Returns the Element of this node.
   */
  get elementNode(): GElementNode {
    return this._elementNode;
  }

  get shadowRoot(): VirtualShadowRootNode<this> | null {
    return this._shadowRoot;
  }

  override getSelfDOMNodes(): readonly Node[] {
    return this._selfDOMNodes;
  }

  override getParentDOMNode(): ParentNode {
    return this._elementNode;
  }

  override getReferenceDOMNode(): Node {
    return this._elementNode;
  }

  attachShadow(
    options?: IVirtualShadowRootNodeInit,
  ): VirtualShadowRootNode<this> {
    return this._shadowRoot = VirtualShadowRootNode.attachShadow<this>(this, options);
  }

  /* PROPERTY */

  /**
   * Returns the value of the property "propertyKey" of the element of this node.
   */
  getProperty<GPropertyKey extends InferVirtualElementNodePropertyKeys<GElementNode>>(
    propertyKey: GPropertyKey,
  ): GElementNode[GPropertyKey] {
    return this._elementNode[propertyKey];
  }

  /**
   * Sets the value of the property "propertyKey" of the element of this node.
   */
  setProperty<GPropertyKey extends InferVirtualElementNodePropertyKeys<GElementNode>>(
    propertyKey: GPropertyKey,
    value: GElementNode[GPropertyKey],
  ): void {
    this._elementNode[propertyKey] = value;
  }

  /* ATTRIBUTE */

  /**
   * Returns the value of the attribute "name" of the element of this node.
   * If the attribute is not set, the function returns null.
   */
  getAttribute(
    name: string,
  ): IAttributeValue {
    return this._elementNode.hasAttribute(name)
      ? this._elementNode.getAttribute(name)
      : null;
  }

  /**
   * Set the value of the attribute "name" of the element of this node.
   * If the value is null, the attribute is removed.
   */
  setAttribute(
    name: string,
    value: IAttributeValue,
  ): void {
    if (value === null) {
      this._elementNode.removeAttribute(name);
    } else {
      this._elementNode.setAttribute(name, value);
    }
  }

  /**
   * Returns an Iterator on the list of attributes of the element of this node.
   */
  * getAttributesIterator(): Generator<[string, string]> {
    for (let i = 0, l = this._elementNode.attributes.length; i < l; i++) {
      const attr: Attr = this._elementNode.attributes[i];
      yield [attr.name, attr.value];
    }
  }

  /* CLASS */

  /**
   * Returns true if the element of this node has the css class "name".
   * Else returns false.
   */
  hasClass(
    name: string,
  ): boolean {
    return this._elementNode.classList.contains(name);
  }

  /**
   * Sets the css class "name" of the element of this node.
   * If "enabled" is true, then the class is present, else if "enabled" is false, the class is removed.
   */
  setClass(
    name: string,
    enabled: boolean,
  ): void {
    this._elementNode.classList.toggle(name, enabled);
  }

  /**
   * Returns an Iterator on the list of css classes of the element of this node.
   */
  * getClassesIterator(): Generator<string> {
    for (let i = 0, l = this._elementNode.classList.length; i < l; i++) {
      yield this._elementNode.classList[i];
    }
  }

  /* STYLE */

  /**
   * Returns the style property with the name "name" of the element of this node.
   */
  getStyleProperty(
    name: string,
    {
      computed = false,
    }: IGetStylePropertyOptions = {},
  ): IStyleProperty {
    const style: CSSStyleDeclaration = computed
      ? getComputedStyle(this._elementNode as unknown as HTMLElement)
      : (this._elementNode as unknown as HTMLElement).style;
    return {
      value: style.getPropertyValue(name),
      priority: style.getPropertyPriority(name),
    };
  }

  /**
   * Sets the style property with the name "name" of the element of this node.
   */
  setStyleProperty(
    name: string,
    property: ISetStylePropertyOrStringOrNull,
  ): void {
    const style: CSSStyleDeclaration = (this._elementNode as unknown as HTMLElement).style;

    if (property === null) {
      style.removeProperty(
        name,
      );
    } else if (typeof property === 'string') {
      style.setProperty(
        name,
        property,
      );
    } else {
      style.setProperty(
        name,
        property.value,
        property.priority,
      );
    }
  }

  /**
   * Returns an Iterator on the list of style properties of the element of this node.
   */
  * getStylePropertiesIterator(): Generator<IStyleProperty> {
    const style: CSSStyleDeclaration = (this._elementNode as unknown as HTMLElement).style;
    for (let i = 0, l = style.length; i < l; i++) {
      yield this.getStyleProperty(style[i]);
    }
  }
}

