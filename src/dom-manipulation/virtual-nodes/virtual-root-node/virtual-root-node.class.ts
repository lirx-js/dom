import { linkDOMNodeWithVirtualDOMNode } from '../virtual-node/members/link/link-dom-node-with-virtual-dom-node';
import { VirtualDOMNode } from '../virtual-dom-node/virtual-dom-node.class';
import { IVirtualNodeOrNull } from '../virtual-node/virtual-node-or-null.type';

let BODY_ROOT: VirtualRootNode<HTMLBodyElement>;

/**
 * Represents an abstract Root Node in an abstract DOM.
 */
export class VirtualRootNode<GRootNode extends ParentNode> extends VirtualDOMNode {

  /**
   * Returns the VirtualRootNode of the <body> element.
   */
  static get body(): VirtualRootNode<HTMLBodyElement> {
    if (BODY_ROOT === void 0) {
      BODY_ROOT = new VirtualRootNode<HTMLBodyElement>(document.body as HTMLBodyElement);
    }
    return BODY_ROOT;
  }

  protected readonly _rootNode: GRootNode; // the associated DOM Node
  protected readonly _selfDOMNodes: [GRootNode]; // computed

  constructor(
    rootNode: GRootNode,
  ) {
    super();
    this._rootNode = rootNode;
    this._selfDOMNodes = [
      this._rootNode,
    ];
    linkDOMNodeWithVirtualDOMNode(this._rootNode, this);
  }

  override get isConnected(): boolean {
    return this._rootNode.isConnected;
  }

  /**
   * Returns the associated DOM Node of this node.
   */
  get rootNode(): GRootNode {
    return this._rootNode;
  }

  override acceptsParent(
    node: IVirtualNodeOrNull,
  ): boolean {
    return false;
  }

  override getSelfDOMNodes(): readonly Node[] {
    return this._selfDOMNodes;
  }

  override getParentDOMNode(): ParentNode {
    return this._rootNode;
  }

  override getReferenceDOMNode(): Node {
    return this._rootNode;
  }
}

export type IGenericVirtualRootNode = VirtualRootNode<any>;

