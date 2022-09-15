import { IVirtualDOMNodeOrNull, VirtualDOMNode } from '../../../virtual-dom-node.class';

export class VirtualContainerNode extends VirtualDOMNode {

  constructor() {
    super({
      isRoot: false,
      isLeaf: false,
    });
  }

  override getSelfDOMNodes(): readonly Node[] {
    return Array.from(this.getChildren())
      .flatMap((child: VirtualDOMNode): readonly Node[] => {
        return child.getSelfDOMNodes();
      });
  }

  override getParentDOMNode(): ParentNode | null {
    const parentNode: IVirtualDOMNodeOrNull = this.parentNode;
    return (parentNode === null)
      ? null
      : parentNode.getParentDOMNode();
  }

  override getReferenceDOMNode(): Node | null {
    return (this.firstChild === null)
      ? this.getNextReferenceDOMNode()
      : this.firstChild.getReferenceDOMNode();
  }
}

