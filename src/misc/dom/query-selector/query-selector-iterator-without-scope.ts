export function * querySelectorIteratorWithoutScope<GElement extends Element>(
  parentNode: Node,
  selector: string,
): Generator<GElement> {
  if (parentNode.firstChild !== null) {
    const treeWalker: TreeWalker = document.createTreeWalker(parentNode, NodeFilter.SHOW_ELEMENT);
    let node: Element | null;
    while (node = treeWalker.nextNode() as Element | null) {
      if (node.matches(selector)) {
        yield node as GElement;
      }
    }
  }
}
