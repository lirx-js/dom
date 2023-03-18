import { IObservable } from '@lirx/core';
import { IGenericVirtualElementNode } from '../element/virtual-element-node.class';
import { VirtualRootNode } from '../root/virtual-root-node.class';

export interface IVirtualShadowRootNodeInit extends Partial<ShadowRootInit> {
}

/**
 * Represents an abstract ShadowRoot Node in an abstract DOM.
 */
export class VirtualShadowRootNode<GParentBode extends IGenericVirtualElementNode> extends VirtualRootNode<ShadowRoot> {

  static attachShadow<GParentBode extends IGenericVirtualElementNode>(
    parentNode: GParentBode,
    {
      mode = 'open',
      ...options
    }: IVirtualShadowRootNodeInit = {},
  ): VirtualShadowRootNode<GParentBode> {
    if (parentNode.elementNode.shadowRoot === null) {
      parentNode.elementNode.attachShadow({
        ...options,
        mode,
      });
      return new VirtualShadowRootNode<GParentBode>(parentNode);
    } else {
      throw new Error(`Already have a shadowRoot`);
    }
  }

  static fromShadow<GParentBode extends IGenericVirtualElementNode>(
    parentNode: GParentBode,
  ): VirtualShadowRootNode<GParentBode> {
    if (parentNode.elementNode.shadowRoot === null) {
      throw new Error(`Does not have a shadowRoot`);
    } else {
      return new VirtualShadowRootNode<GParentBode>(parentNode);
    }
  }

  protected constructor(
    parentNode: GParentBode,
  ) {
    super(parentNode.elementNode.shadowRoot);
    this._$parentNode$.emit(parentNode);
  }

  get parentNode$(): IObservable<GParentBode> {
    return super.parentNode$ as IObservable<GParentBode>;
  }

  get parentNode(): GParentBode {
    return super.parentNode as GParentBode;
  }

  override get isConnected(): boolean {
    return this.parentNode.isConnected;
  }
}

export type IGenericVirtualShadowRootNode = VirtualShadowRootNode<any>;
