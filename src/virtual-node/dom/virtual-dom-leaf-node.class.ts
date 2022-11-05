import { VirtualNode } from '../virtual-node.class';
import { VirtualDOMNode } from './virtual-dom-node.class';

/**
 * Represents an abstract Leaf Node in an abstract DOM.
 * A Leaf cannot be a used as a parent node.
 */
export abstract class VirtualDOMLeafNode extends VirtualDOMNode {
  protected constructor() {
    super({
      isRoot: false,
      isLeaf: true,
    });
  }

  override canAttachChildNode(
    childNode: VirtualNode,
  ): boolean {
    return false;
  }

  override getParentDOMNode(): never {
    throw new Error(`Cannot be used as parent`);
  }
}
