import { isDocumentFragment } from '../../../type/is-document-fragment';
import { attachParentNodeChildren } from './derived/parent-node-children/attach-parent-node-children';
import { attachStandardNode } from './derived/standard/attach-standard-node';

// INFO attaching a shadowRoot to an element is the exact same thing as attaching a documentFragment to this element
//  (put shadowRoot content into this element)

export function attachNode(
  node: Node,
  parentNode: Node,
  referenceNode: Node | null = null,
): void {
  if (isDocumentFragment(node)) {
    attachParentNodeChildren(node, parentNode, referenceNode);
  } else {
    attachStandardNode(node, parentNode, referenceNode);
  }
}
