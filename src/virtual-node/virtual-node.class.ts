import {
  createMulticastReplayLastSource,
  distinctObservable,
  empty,
  IMulticastReplayLastSource,
  IObservable,
  switchMapObservable,
  shareObservable,
} from '@lirx/core';
import { nodeHasRootParentObservable } from './functions/node-has-root-parent-observable';

export type IVirtualNodeOrNull = VirtualNode | null;

/**
 * The list of options to provide to a VirtualNode.
 */
export interface IVirtualNodeOptions {
  isRoot: boolean;
  isLeaf: boolean,
}

/**
 * Represents an abstract Node in a Tree.
 */
export abstract class VirtualNode {

  protected readonly _isRoot: boolean;
  protected readonly _isLeaf: boolean;

  protected _$parentNode$: IMulticastReplayLastSource<IVirtualNodeOrNull>;
  protected _previousNode: IVirtualNodeOrNull;
  protected _nextNode: IVirtualNodeOrNull;
  protected _firstChild: IVirtualNodeOrNull;
  protected _lastChild: IVirtualNodeOrNull;

  protected readonly _isConnected$: IObservable<boolean>;

  protected constructor(
    {
      isRoot,
      isLeaf,
    }: IVirtualNodeOptions,
  ) {
    this._isRoot = isRoot;
    this._isLeaf = isLeaf;

    this._$parentNode$ = createMulticastReplayLastSource<IVirtualNodeOrNull>(null);
    this._previousNode = null;
    this._nextNode = null;
    this._firstChild = null;
    this._lastChild = null;

    this._isConnected$ = shareObservable(distinctObservable(nodeHasRootParentObservable(this)));
  }

  /**
   * Returns true if this node is a root.
   */
  get isRoot(): boolean {
    return this._isRoot;
  }

  /**
   * Returns true if this node is a leaf.
   */
  get isLeaf(): boolean {
    return this._isLeaf;
  }

  /**
   * Returns an Observable sending the parent of this node.
   * This is useful to detect changes in the parent node.
   */
  get parentNode$(): IObservable<IVirtualNodeOrNull> {
    return this._$parentNode$.subscribe;
  }

  /**
   * Returns the parent node of this node
   */
  get parentNode(): IVirtualNodeOrNull {
    return this._$parentNode$.getValue();
  }

  /**
   * Returns the node before this node, or null if none.
   */
  get previousNode(): IVirtualNodeOrNull {
    return this._previousNode;
  }

  /**
   * Returns the node after this node, or null if none.
   */
  get nextNode(): IVirtualNodeOrNull {
    return this._nextNode;
  }

  /**
   * Returns the first child node of this node, or null if none.
   */
  get firstChild(): IVirtualNodeOrNull {
    return this._firstChild;
  }

  /**
   * Returns the last child node of this node, or null if none.
   */
  get lastChild(): IVirtualNodeOrNull {
    return this._lastChild;
  }

  /**
   * Returns true if this node is connected to a root node.
   */
  get isConnected(): boolean {
    let node: IVirtualNodeOrNull = this;
    while (node !== null) {
      if (node.isRoot) {
        return true;
      } else {
        node = node.parentNode;
      }
    }
    return false;
  }

  /**
   * Returns an Observable sending "true" if this node is connected to a root node, or "false".
   * This is useful to detect changes in the "connected state" of this node.
   */
  get isConnected$(): IObservable<boolean> {
    return this._isConnected$;
  }

  /**
   * Returns an Observable sending the values of the provided Observable "observable", only when this node is connected to a root node.
   */
  onConnected$<GValue>(
    observable: IObservable<GValue>,
  ): IObservable<GValue> {
    // or conditionalObservable
    return switchMapObservable(this._isConnected$, (connected: boolean): IObservable<GValue> => {
      return connected
        ? observable
        : empty<GValue>();
    });
  }

  /**
   * Returns true if this node contains "childNode".
   */
  contains(
    childNode: VirtualNode,
  ): boolean {
    let node: IVirtualNodeOrNull = childNode;

    do {
      if (node === this) {
        return true;
      } else {
        node = node.parentNode;
      }
    } while (node !== null);

    return false;
  }

  /**
   * Attaches this node to "parentNode" before "referenceNode".
   * Performs some internal verifications to ensure that this operation is possible.
   * Returns true if attaching this node was necessary (the node had to move).
   */
  attach(
    parentNode: VirtualNode,
    referenceNode: IVirtualNodeOrNull = null,
  ): boolean {
    if (referenceNode === null) {
      if (
        (this.parentNode === parentNode)
        && (this.parentNode._lastChild === this) // current node is already the last child of parentNode, so we have nothing to do
      ) {
        return false;
      }
    } else {
      if (
        (referenceNode === this)
        || (this._nextNode === referenceNode)
      ) { // current node is already before referenceNode, so we have nothing to do
        return false;
      }

      if (referenceNode.parentNode !== parentNode) {
        throw new Error(`referenceNode must have parentNode as parent`);
      }
    }

    if (this._isRoot) {
      throw new Error(`Cannot attach a root node`);
    }

    if (parentNode._isLeaf) {
      throw new Error(`Cannot attach to a leaf node`);
    }

    if (!parentNode.canAttachChildNode(this)) {
      throw new Error(`Cannot attach this node to this parent`);
    }

    if (this.contains(parentNode)) {
      throw new Error(`current node already contains parentNode`);
    }

    // detach current node
    if (this.parentNode !== null) {
      if (this._previousNode === null) { // current node is first child
        this.parentNode._firstChild = this._nextNode;
      } else {
        this._previousNode._nextNode = this._nextNode;
      }

      if (this._nextNode === null) { // current node is last child
        this.parentNode._lastChild = this._previousNode;
      } else {
        this._nextNode._previousNode = this._previousNode;
      }
    }

    this._nextNode = referenceNode;

    if (referenceNode === null) {
      this._previousNode = parentNode._lastChild;

      if (parentNode._lastChild === null) { // empty list
        parentNode._firstChild = this;
        parentNode._lastChild = this;
      } else {
        parentNode._lastChild._nextNode = this;
        parentNode._lastChild = this;
      }
    } else {
      this._previousNode = referenceNode._previousNode;

      if (referenceNode._previousNode === null) { // referenceNode is first child
        parentNode._firstChild = this;
      } else {
        referenceNode._previousNode._nextNode = this;
      }

      referenceNode._previousNode = this;
    }

    this._$parentNode$.emit(parentNode);

    return true;
  }

  /**
   * Returns true if this node may be attached to "childNode".
   * It is usually used to prevent invalid Tree to exist (we may think about a <button> containing an <input>)
   */
  abstract canAttachChildNode(
    childNode: VirtualNode,
  ): boolean;

  /**
   * Detaches this node from its parent node.
   * Returns true if this operation was necessary (the node had a parent node)
   */
  detach(): boolean {
    if (this.isRoot) {
      throw new Error(`Cannot detach a root node`);
    }

    if (this.parentNode === null) {
      return false;
    } else {
      if (this._previousNode === null) { // current node is first child
        this.parentNode._firstChild = this._nextNode;
      } else {
        this._previousNode._nextNode = this._nextNode;
      }

      if (this._nextNode === null) { // current node is last child
        this.parentNode._lastChild = this._previousNode;
      } else {
        this._nextNode._previousNode = this._previousNode;
      }

      this._previousNode = null;
      this._nextNode = null;
      this._$parentNode$.emit(null);
      return true;
    }
  }

  /**
   * Returns an Iterator on the list of direct child nodes of this node.
   */
  * getChildren(): Generator<VirtualNode> {
    let node: IVirtualNodeOrNull = this._firstChild;
    while (node !== null) {
      yield node;
      node = node._nextNode;
    }
  }

  /**
   * Returns an Iterator on the list of direct child nodes of this node, in reverse order (starting from the last one).
   * @see getChildren
   */
  * getChildrenReversed(): Generator<VirtualNode> {
    let node: IVirtualNodeOrNull = this._lastChild;
    while (node !== null) {
      yield node;
      node = node._previousNode;
    }
  }

  /**
   * Returns an Iterator on the list of all child nodes of this node.
   */
  * getChildrenRecursive(): Generator<VirtualNode> {
    const iterator: Iterator<VirtualNode> = this.getChildren();
    let result: IteratorResult<VirtualNode>;
    while (!(result = iterator.next()).done) {
      const childNode: VirtualNode = result.value;
      yield childNode;
      yield* childNode.getChildrenRecursive();
    }
  }

  /**
   * Detaches all the child nodes of this node.
   */
  detachChildren(): void {
    let node: IVirtualNodeOrNull = this._firstChild;
    while (node !== null) {
      const nextNode: IVirtualNodeOrNull = node._nextNode;
      node.detach();
      node = nextNode;
    }
  }
}
