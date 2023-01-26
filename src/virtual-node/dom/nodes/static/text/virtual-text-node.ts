import { linkDOMNodeWithVirtualDOMNode } from '../../../functions/link/link-dom-node-with-virtual-dom-node';
import { VirtualDOMLeafNode } from '../../../virtual-dom-leaf-node.class';

/**
 * Represents an abstract Text Node in an abstract DOM.
 */
export class VirtualTextNode extends VirtualDOMLeafNode {
  protected readonly _textNode: Text; // the associated DOM Text Node
  protected readonly _selfDOMNodes: [Text]; // computed

  constructor(
    value?: string,
  ) {
    super();
    this._textNode = new Text(value);
    this._selfDOMNodes = [
      this._textNode,
    ];
    linkDOMNodeWithVirtualDOMNode(this._textNode, this);
  }

  /**
   * Returns the DOM Text Node of this node.
   */
  get textNode(): Text {
    return this._textNode;
  }

  /**
   * Returns the text content of this node.
   */
  get value(): string {
    return this._textNode.data;
  }

  /**
   * Sets the text content of this node.
   */
  set value(
    input: string,
  ) {
    this._textNode.data = input;
  }

  override getSelfDOMNodes(): readonly Node[] {
    return this._selfDOMNodes;
  }

  override getReferenceDOMNode(): Node {
    return this._textNode;
  }
}
