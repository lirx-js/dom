import { createDocumentFragment } from '../../../create/create-document-fragment';
import { IParentNode } from '../../../properties/get-parent-node';
import { attachParentNodeChildrenUnsafe } from '../../node/attach/derived/parent-node-children/attach-parent-node-children-unsafe';

export function attachNodeChildrenToNewDocumentFragment(
  parentNode: IParentNode,
): DocumentFragment {
  const fragment: DocumentFragment = createDocumentFragment();
  attachParentNodeChildrenUnsafe(parentNode, fragment, null);
  return fragment;
}
