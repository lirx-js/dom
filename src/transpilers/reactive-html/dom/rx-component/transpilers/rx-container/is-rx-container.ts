import { getElementTagName } from '../../../../../../misc/dom/get-element-tag-name';
import { RX_CONTAINER_TAG_NAME } from './rx-container-tag-name.constant';

export function isRXContainer(
  node: Element,
): boolean {
  return getElementTagName(node) === RX_CONTAINER_TAG_NAME;
}
