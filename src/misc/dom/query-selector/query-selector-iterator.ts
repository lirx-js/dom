import { patchQuerySelectorScope } from './patch-query-selector-scope';
import { querySelectorIteratorWithoutScope } from './query-selector-iterator-without-scope';

export function querySelectorIterator<GElement extends Element>(
  parentNode: Node,
  selector: string,
): Generator<GElement> {
  return patchQuerySelectorScope<GElement>(
    parentNode,
    selector,
    querySelectorIteratorWithoutScope,
  );
}
