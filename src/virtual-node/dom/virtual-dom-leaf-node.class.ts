import { VirtualNode } from '../virtual-node.class';
import { VirtualDOMNode } from './virtual-dom-node.class';

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
