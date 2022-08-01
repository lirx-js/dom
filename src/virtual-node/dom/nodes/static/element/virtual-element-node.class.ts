import { getLowerCaseObjectKeysMap } from '../../../../../misc/object/get-lower-case-object-keys-map';
import { linkDOMNodeWithVirtualDOMNode } from '../../../functions/link/link-dom-node-with-virtual-dom-node';
import { VirtualDOMNode } from '../../../virtual-dom-node.class';
import { IAttributeValue } from './attribute/attribute-value.type';
import { ISetStylePropertyOrStringOrNull, IStyleProperty } from './style/style-property.type';

export type ISetCaseInsensitivePropertyValue<GElementNode extends Element, GPropertyKey extends PropertyKey> =
  GPropertyKey extends keyof GElementNode
    ? GElementNode[GPropertyKey]
    : any;

export class VirtualElementNode<GElementNode extends Element> extends VirtualDOMNode {
  protected readonly _elementNode: GElementNode;
  protected readonly _selfDOMNodes: [GElementNode]; // computed

  protected readonly _lowerCaseElementKeys: ReadonlyMap<string, string>; // computed

  constructor(
    namespaceURI: string,
    name: string,
    options?: ElementCreationOptions,
  ) {
    super({
      isRoot: false,
      isLeaf: false,
    });
    this._elementNode = document.createElementNS(namespaceURI, name, options) as GElementNode;
    this._selfDOMNodes = [
      this._elementNode,
    ];

    this._lowerCaseElementKeys = getLowerCaseObjectKeysMap(Object.getPrototypeOf(this._elementNode));

    linkDOMNodeWithVirtualDOMNode(this._elementNode, this);
  }

  get elementNode(): GElementNode {
    return this._elementNode;
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

  /* PROPERTY */

  getProperty<GPropertyKey extends keyof GElementNode>(
    propertyKey: GPropertyKey,
  ): GElementNode[GPropertyKey] {
    return this._elementNode[propertyKey];
  }

  setProperty<GPropertyKey extends keyof GElementNode>(
    propertyKey: GPropertyKey,
    value: GElementNode[GPropertyKey],
  ): void {
    this._elementNode[propertyKey] = value;
  }

  setCaseInsensitiveProperty<GPropertyKey extends string>(
    propertyKey: GPropertyKey,
    value: ISetCaseInsensitivePropertyValue<GElementNode, GPropertyKey>,
  ): void {
    if (this._lowerCaseElementKeys.has(propertyKey)) {
      this.setProperty(
        this._lowerCaseElementKeys.get(propertyKey) as keyof GElementNode,
        value as any,
      );
    } else {
      throw new Error(`Property '${String(propertyKey)}' not found`);
    }
  }

  /* ATTRIBUTE */

  getAttribute(
    name: string,
  ): IAttributeValue {
    return this._elementNode.hasAttribute(name)
      ? this._elementNode.getAttribute(name)
      : null;
  }

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

  * getAttributesIterator(): Generator<[string, string]> {
    for (let i = 0, l = this._elementNode.attributes.length; i < l; i++) {
      const attr: Attr = this._elementNode.attributes[i];
      yield [attr.name, attr.value];
    }
  }

  /* CLASS */

  hasClass(
    name: string,
  ): boolean {
    return this._elementNode.classList.contains(name);
  }

  setClass(
    name: string,
    enabled: boolean,
  ): void {
    this._elementNode.classList.toggle(name, enabled);
  }

  * getClassesIterator(): Generator<string> {
    for (let i = 0, l = this._elementNode.classList.length; i < l; i++) {
      yield this._elementNode.classList[i];
    }
  }

  /* STYLE */

  getStyleProperty(
    name: string,
  ): IStyleProperty {
    const style: CSSStyleDeclaration = (this._elementNode as unknown as HTMLElement).style;
    return {
      value: style.getPropertyValue(name),
      priority: style.getPropertyPriority(name),
    };
  }

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

  * getStylePropertiesIterator(): Generator<IStyleProperty> {
    const style: CSSStyleDeclaration = (this._elementNode as unknown as HTMLElement).style;
    for (let i = 0, l = style.length; i < l; i++) {
      yield this.getStyleProperty(style[i]);
    }
  }
}

