import { IObservable } from '@lirx/core';
import { VirtualNode } from '../virtual-node.class';

export type IVirtualDOMNodeOrNull = VirtualDOMNode | null;

export abstract class VirtualDOMNode extends VirtualNode {

  get parentNode$(): IObservable<IVirtualDOMNodeOrNull> {
    return super.parentNode$ as IObservable<IVirtualDOMNodeOrNull>;
  }

  get parentNode(): IVirtualDOMNodeOrNull {
    return super.parentNode as IVirtualDOMNodeOrNull;
  }

  get previousNode(): IVirtualDOMNodeOrNull {
    return super.previousNode as IVirtualDOMNodeOrNull;
  }

  get nextNode(): IVirtualDOMNodeOrNull {
    return super.nextNode as IVirtualDOMNodeOrNull;
  }

  get firstChild(): IVirtualDOMNodeOrNull {
    return super.firstChild as IVirtualDOMNodeOrNull;
  }

  get lastChild(): IVirtualDOMNodeOrNull {
    return super.lastChild as IVirtualDOMNodeOrNull;
  }

  override attach(
    parentNode: VirtualDOMNode,
    referenceNode: IVirtualDOMNodeOrNull = null,
  ): boolean {
    const attached: boolean = super.attach(
      parentNode,
      referenceNode,
    );

    if (attached) {
      const parentDOMNode: ParentNode | null = parentNode.getParentDOMNode();

      if (parentDOMNode !== null) {
        const selfDOMNodes: readonly Node[] = this.getSelfDOMNodes();

        let referenceDOMNode: Node | null;
        if (referenceNode === null) {
          referenceDOMNode = parentNode.getNextReferenceDOMNode();
          if (
            (referenceDOMNode !== null)
            && (referenceDOMNode.parentNode !== parentDOMNode)
          ) {
            referenceDOMNode = null;
          }
        } else {
          referenceDOMNode = referenceNode.getReferenceDOMNode();
        }
        // const referenceDOMNode: Node | null = (referenceNode === null)
        //   ? parentNode.getNextReferenceDOMNode()
        //   : referenceNode.getReferenceDOMNode();

        const length: number = selfDOMNodes.length;
        if (length > 1e2) { // TODO pimp limit for optimizations
          const fragment: DocumentFragment = document.createDocumentFragment();
          for (let i = 0; i < length; i++) {
            fragment.appendChild(selfDOMNodes[i]);
          }
          parentDOMNode.insertBefore(fragment, referenceDOMNode);
        } else {
          for (let i = 0; i < length; i++) {
            parentDOMNode.insertBefore(selfDOMNodes[i], referenceDOMNode);
          }
        }
      }
    }

    return attached;
  }

  override canAttachChildNode(
    childNode: VirtualNode,
  ): boolean {
    return (childNode instanceof VirtualDOMNode);
  }

  override detach(): boolean {
    const detached: boolean = super.detach();

    if (detached) {
      const selfDOMNodes: readonly ChildNode[] = this.getSelfDOMNodes() as readonly ChildNode[];
      for (let i = 0, length = selfDOMNodes.length; i < length; i++) {
        selfDOMNodes[i].remove();
      }
    }

    return detached;
  }

  getChildren(): Generator<VirtualDOMNode> {
    return super.getChildren() as Generator<VirtualDOMNode>;
  }

  getChildrenReversed(): Generator<VirtualDOMNode> {
    return super.getChildrenReversed() as Generator<VirtualDOMNode>;
  }

  getChildrenRecursive(): Generator<VirtualDOMNode> {
    return super.getChildrenRecursive() as Generator<VirtualDOMNode>;
  }

  abstract getSelfDOMNodes(): readonly Node[];

  abstract getParentDOMNode(): ParentNode | null;

  abstract getReferenceDOMNode(): Node | null;

  getNextReferenceDOMNode(): Node | null {
    const getNextReferenceNode = (
      node: VirtualDOMNode,
    ): Node | null => {
      const nextNode: IVirtualDOMNodeOrNull = node.nextNode;
      if (nextNode === null) {
        const parentNode: IVirtualDOMNodeOrNull = node.parentNode;
        if (parentNode === null) {
          return null;
        } else {
          return getNextReferenceNode(parentNode);
        }
      } else {
        return nextNode.getReferenceDOMNode();
      }
    };
    return getNextReferenceNode(this);
  }

}
