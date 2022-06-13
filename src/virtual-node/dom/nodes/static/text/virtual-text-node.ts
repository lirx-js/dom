import { linkDOMNodeWithVirtualDOMNode } from '../../../functions/link/link-dom-node-with-virtual-dom-node';
import { VirtualDOMLeafNode } from '../../../virtual-dom-leaf-node.class';

export class VirtualTextNode extends VirtualDOMLeafNode {
  protected readonly _textNode: Text;
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

  get textNode(): Text {
    return this._textNode;
  }

  get value(): string {
    return this._textNode.data;
  }

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
