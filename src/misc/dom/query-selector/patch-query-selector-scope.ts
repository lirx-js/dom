import { uuid } from '../../uuid';
import { isDocumentFragmentNode } from '../is/is-document-fragment-node';
import { isElementNode } from '../is/is-element-node';

export interface IPatchQuerySelectorScopeCallback<GElement extends Element> {
  (
    parentNode: Node,
    selector: string,
  ): Generator<GElement>;
}

export function* patchQuerySelectorScope<GElement extends Element>(
  parentNode: Node,
  selector: string,
  callback: IPatchQuerySelectorScopeCallback<GElement>,
): Generator<GElement> {
  const hasScope: boolean = selector.includes(':scope');

  if (hasScope) {
    if (isElementNode(parentNode)) {
      const id: string = generatePatchQuerySelectorScopeId();
      parentNode.setAttribute(id, '');
      try {
        yield* callback(
          parentNode,
          selector.replace(':scope', `[${id}]`),
        );
      } finally {
        parentNode.removeAttribute(id as string);
      }
    } else if (isDocumentFragmentNode(parentNode)) {
      const id: string = generatePatchQuerySelectorScopeId();
      const _parentNode: Element = document.createElement('div');
      _parentNode.setAttribute(id, '');
      _parentNode.appendChild(parentNode);

      try {
        yield* callback(
          _parentNode,
          selector.replace(':scope', `[${id}]`),
        );
      } finally {
        while (_parentNode.firstChild !== null) {
          parentNode.appendChild(_parentNode.firstChild);
        }
      }
    } else {
      yield* callback(
        parentNode,
        selector,
      );
    }
  } else {
    yield* callback(
      parentNode,
      selector,
    );
  }

}

/*----*/

function generatePatchQuerySelectorScopeId(): string {
  return `scope-${uuid()}`;
}
