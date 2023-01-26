import { linkDOMNodeWithVirtualDOMNode } from '../../../functions/link/link-dom-node-with-virtual-dom-node';
import { VirtualDOMLeafNode } from '../../../virtual-dom-leaf-node.class';

/**
 * Represents an abstract Comment Node in an abstract DOM.
 */
export class VirtualCommentNode extends VirtualDOMLeafNode {
  protected readonly _commentNode: Comment; // the associated DOM Comment Node
  protected readonly _selfDOMNodes: [Comment]; // computed

  constructor(
    value?: string,
  ) {
    super();
    this._commentNode = new Comment(value);
    this._selfDOMNodes = [
      this._commentNode,
    ];
    linkDOMNodeWithVirtualDOMNode(this._commentNode, this);
  }

  /**
   * Returns the DOM Comment Node of this node.
   */
  get commentNode(): Comment {
    return this._commentNode;
  }

  /**
   * Returns the text content of this node.
   */
  get value(): string {
    return this._commentNode.data;
  }

  /**
   * Sets the text content of this node.
   */
  set value(
    input: string,
  ) {
    this._commentNode.data = input;
  }

  override getSelfDOMNodes(): readonly Node[] {
    return this._selfDOMNodes;
  }

  override getReferenceDOMNode(): Node {
    return this._commentNode;
  }
}
