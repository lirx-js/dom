import { hasAttribute } from '../../attribute/has-attribute';
import { getTagName } from '../properties/get-tag-name';
import { getNamespaceURI } from '../properties/namespace-uri/get-namespace-uri';
import { HTML_NAMESPACE_URI_CONSTANT } from '../properties/namespace-uri/html-namespace-uri.constant';
import { isElementNode } from './is-element-node';
import { isCustomElementTagName } from './tag/is-custom-element-tag-name';

export function isCustomElementNode(
  node: Node,
): node is Element {
  return isElementNode(node)
    && isCustomElement(node);
}

export function isCustomElement(
  node: Element,
): node is Element {
  return isCustomElementTagName(getTagName(node))
    || hasAttribute(node, 'is');
}

export function isCustomElementCheckingNamespaceURI(
  node: Element,
): node is Element {
  return (getNamespaceURI(node) === HTML_NAMESPACE_URI_CONSTANT)
    && isCustomElement(node);
}
