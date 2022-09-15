import { linkDOMNodeWithVirtualDOMNode } from '../../../functions/link/link-dom-node-with-virtual-dom-node';
import { VirtualDOMLeafNode } from '../../../virtual-dom-leaf-node.class';

export class VirtualCommentNode extends VirtualDOMLeafNode {
  protected readonly _commentNode: Comment;
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

  get commentNode(): Comment {
    return this._commentNode;
  }

  get value(): string {
    return this._commentNode.data;
  }

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
