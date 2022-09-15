import { createMulticastReplayLastSource, distinctObserver, IObservable, IObserver } from '@lirx/core';
import { VirtualNode } from '../../../../virtual-node.class';
import { IVirtualReactiveDOMNodeTemplate } from '../../../types/virtual-reactive-dom-node-template.type';
import { VirtualContainerNode } from '../../static/container/virtual-container-node.class';
import { trackByIdentity } from './track-by/track-by-identity';

/** TYPES **/

export type IVirtualReactiveForLoopNodeTemplateArgument<GItem> = {
  item: GItem;
  index$: IObservable<number>;
};

export type IVirtualReactiveForLoopNodeTemplate<GItem> = IVirtualReactiveDOMNodeTemplate<IVirtualReactiveForLoopNodeTemplateArgument<GItem>>;

export interface IVirtualReactiveForLoopNodeOptionsTrackByFunction<GItem> {
  (item: GItem): any;
}

/** CLASS **/

export class VirtualReactiveForLoopNode<GItem> extends VirtualContainerNode {
  constructor(
    items$: IObservable<Iterable<GItem>>,
    template: IVirtualReactiveForLoopNodeTemplate<GItem>,
    trackBy?: IVirtualReactiveForLoopNodeOptionsTrackByFunction<GItem>,
  ) {
    super();

    const container: VirtualReactiveForLoopContainerNode<GItem> = new VirtualReactiveForLoopContainerNode<GItem>(
      template,
      trackBy,
    );
    container.attach(this);

    this.onConnected$(items$)((items: Iterable<GItem>): void => {
      container.update(items);
    });
  }

  override canAttachChildNode(
    childNode: VirtualNode,
  ): boolean {
    return (childNode instanceof VirtualReactiveForLoopContainerNode);
  }
}

type IVirtualReactiveForLoopNodeOrNull<GItem> = VirtualReactiveForLoopNode<GItem> | null;

/*------------------------------*/

type ITrackByMap<GItem> = Map<any, VirtualReactiveForLoopChildNode<GItem>[]>;

function createTrackByMap<GItem>(): ITrackByMap<GItem> {
  return new Map<any, VirtualReactiveForLoopChildNode<GItem>[]>();
}

/**
 * Creates or re-use a VirtualReactiveForLoopChildNode<GItem>
 *  from a previousTrackByMap
 */
function createOrReuseNode<GItem>(
  item: GItem,
  index: number,
  template: IVirtualReactiveForLoopNodeTemplate<GItem>,
  trackBy: IVirtualReactiveForLoopNodeOptionsTrackByFunction<GItem>,
  previousTrackByMap: ITrackByMap<GItem>,
  currentTrackByMap: ITrackByMap<GItem>,
): VirtualReactiveForLoopChildNode<GItem> {
  const id: any = trackBy(item);
  let node: VirtualReactiveForLoopChildNode<GItem>;

  const previousTrackByMapNodeList: VirtualReactiveForLoopChildNode<GItem>[] | undefined = previousTrackByMap.get(id);

  if (previousTrackByMapNodeList === void 0) {
    const { emit: $index, subscribe: index$ } = createMulticastReplayLastSource<number>(index);

    node = new VirtualReactiveForLoopChildNode<GItem>(
      id,
      item,
      distinctObserver($index),
    );

    template(node, {
      item,
      index$,
    });
  } else {
    node = previousTrackByMapNodeList.shift() as VirtualReactiveForLoopChildNode<GItem>;
    if (previousTrackByMapNodeList.length === 0) {
      previousTrackByMap.delete(id);
    }
    node.$index(index);
  }

  const currentTrackByMapNodeList: VirtualReactiveForLoopChildNode<GItem>[] | undefined = currentTrackByMap.get(id);

  if (currentTrackByMapNodeList === void 0) {
    currentTrackByMap.set(id, [node]);
  } else {
    currentTrackByMapNodeList.push(node);
  }

  return node;
}

/**
 * Constructs the list of nodes (eventually re-used) from a list of items
 */
function constructCurrentNodeList<GItem>(
  items: Iterable<GItem>,
  template: IVirtualReactiveForLoopNodeTemplate<GItem>,
  trackBy: IVirtualReactiveForLoopNodeOptionsTrackByFunction<GItem>,
  previousTrackByMap: ITrackByMap<GItem>,
  currentTrackByMap: ITrackByMap<GItem>,
): readonly VirtualReactiveForLoopChildNode<GItem>[] {
  const currentNodeList: VirtualReactiveForLoopChildNode<GItem>[] = [];

  let index: number = 0;

  const itemsIterator: Iterator<GItem> = items[Symbol.iterator]();
  let itemsIteratorResult: IteratorResult<GItem>;

  while (!(itemsIteratorResult = itemsIterator.next()).done) {
    currentNodeList.push(
      createOrReuseNode<GItem>(
        itemsIteratorResult.value,
        index,
        template,
        trackBy,
        previousTrackByMap,
        currentTrackByMap,
      ),
    );

    index++;
  }

  return currentNodeList;
}

function removeUnusedNodes<GItem>(
  previousTrackByMap: ITrackByMap<GItem>,
): void {
  const previousTrackByMapIterator: Iterator<VirtualReactiveForLoopChildNode<GItem>[]> = previousTrackByMap.values();
  let previousTrackByMapIteratorResult: IteratorResult<VirtualReactiveForLoopChildNode<GItem>[]>;

  while (!(previousTrackByMapIteratorResult = previousTrackByMapIterator.next()).done) {
    const previousTrackByMapNodeList: VirtualReactiveForLoopChildNode<GItem>[] = previousTrackByMapIteratorResult.value;
    for (let i = 0, l = previousTrackByMapNodeList.length; i < l; i++) {
      previousTrackByMapNodeList[i].detach();
    }
  }
}

function applyCurrentNodeList<GItem>(
  containerNode: VirtualReactiveForLoopContainerNode<GItem>,
  currentNodeList: readonly VirtualReactiveForLoopChildNode<GItem>[],
): void {
  if (
    (containerNode.firstChild === null)
    && containerNode.isConnected
  ) { // bulk attach
    applyCurrentNodeListBulk(
      containerNode,
      currentNodeList,
    );
  } else {
    applyCurrentNodeListDefault(
      containerNode,
      currentNodeList,
    );
  }
}

function applyCurrentNodeListDefault<GItem>(
  containerNode: VirtualReactiveForLoopContainerNode<GItem>,
  currentNodeList: readonly VirtualReactiveForLoopChildNode<GItem>[],
): void {
  const firstChild: IVirtualReactiveForLoopChildNodeOrNull<GItem> = containerNode.firstChild;
  let referenceNode: IVirtualReactiveForLoopChildNodeOrNull<GItem> = (firstChild === null)
    ? null
    : firstChild.nextNode;

  for (let i = 0, l = currentNodeList.length; i < l; i++) {
    const node: VirtualReactiveForLoopChildNode<GItem> = currentNodeList[i];
    node.attach(containerNode, referenceNode);
    referenceNode = node.nextNode;
  }
}

function applyCurrentNodeListBulk<GItem>(
  containerNode: VirtualReactiveForLoopContainerNode<GItem>,
  currentNodeList: readonly VirtualReactiveForLoopChildNode<GItem>[],
): void {
  // console.log('bulk-for-loop');
  const parentNode: VirtualReactiveForLoopNode<GItem> = containerNode.parentNode!;
  containerNode.detach();
  for (let i = 0, l = currentNodeList.length; i < l; i++) {
    currentNodeList[i].attach(containerNode);
  }
  containerNode.attach(parentNode);
}

/*--*/

class VirtualReactiveForLoopContainerNode<GItem> extends VirtualContainerNode {
  public readonly template: IVirtualReactiveForLoopNodeTemplate<GItem>;
  public readonly trackBy: IVirtualReactiveForLoopNodeOptionsTrackByFunction<GItem>;
  protected _previousTrackByMap: ITrackByMap<GItem>;

  constructor(
    template: IVirtualReactiveForLoopNodeTemplate<GItem>,
    trackBy: IVirtualReactiveForLoopNodeOptionsTrackByFunction<GItem> = trackByIdentity,
  ) {
    super();
    this.template = template;
    this.trackBy = trackBy;

    this._previousTrackByMap = createTrackByMap();
  }

  get parentNode(): IVirtualReactiveForLoopNodeOrNull<GItem> {
    return super.parentNode as IVirtualReactiveForLoopNodeOrNull<GItem>;
  }

  get firstChild(): IVirtualReactiveForLoopChildNodeOrNull<GItem> {
    return super.firstChild as IVirtualReactiveForLoopChildNodeOrNull<GItem>;
  }

  update(
    items: Iterable<GItem>,
  ): void {
    const previousTrackByMap: ITrackByMap<GItem> = this._previousTrackByMap;
    const currentTrackByMap: ITrackByMap<GItem> = createTrackByMap();

    const currentNodeList: readonly VirtualReactiveForLoopChildNode<GItem>[] = constructCurrentNodeList(
      items,
      this.template,
      this.trackBy,
      previousTrackByMap,
      currentTrackByMap,
    );

    if (currentNodeList.length === 0) { // bulk detach
      const parentNode: VirtualReactiveForLoopNode<GItem> = this.parentNode as VirtualReactiveForLoopNode<GItem>;
      this.detach();
      this.detachChildren();
      this.attach(parentNode);
    } else {
      removeUnusedNodes<GItem>(previousTrackByMap);
      applyCurrentNodeList(
        this,
        currentNodeList,
      );
    }

    this._previousTrackByMap = currentTrackByMap;
  }

  override canAttachChildNode(
    childNode: VirtualNode,
  ): boolean {
    return (childNode instanceof VirtualReactiveForLoopChildNode);
  }
}

type IVirtualReactiveForLoopContainerNodeOrNull<GItem> = VirtualReactiveForLoopContainerNode<GItem> | null;

/*------------------------------*/

class VirtualReactiveForLoopChildNode<GItem> extends VirtualContainerNode {
  public readonly id: any;
  public readonly item: GItem;
  public readonly $index: IObserver<number>;

  constructor(
    id: any,
    item: GItem,
    $index: IObserver<number>,
  ) {
    super();

    this.id = id;
    this.item = item;
    this.$index = $index;
  }

  get nextNode(): IVirtualReactiveForLoopChildNodeOrNull<GItem> {
    return super.nextNode as IVirtualReactiveForLoopChildNodeOrNull<GItem>;
  }
}

type IVirtualReactiveForLoopChildNodeOrNull<GItem> = VirtualReactiveForLoopChildNode<GItem> | null;


