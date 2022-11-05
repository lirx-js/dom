import { linkDOMNodeWithVirtualDOMNode } from '../../../functions/link/link-dom-node-with-virtual-dom-node';
import { VirtualDOMNode } from '../../../virtual-dom-node.class';

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
    super({
      isRoot: true,
      isLeaf: false,
    });
    this._rootNode = rootNode;
    this._selfDOMNodes = [
      this._rootNode,
    ];
    linkDOMNodeWithVirtualDOMNode(this._rootNode, this);
  }

  /**
   * Returns the associated DOM Node of this node.
   */
  get rootNode(): GRootNode {
    return this._rootNode;
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

