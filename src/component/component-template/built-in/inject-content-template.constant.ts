import { nodeAppendChild } from '../../../light-dom/node/move/derived/dom-like/node/node-append-child';
import { IComponentTemplate } from '../component-template.type';

export const INJECT_CONTENT_TEMPLATE: IComponentTemplate<any> = <GParentNode extends Node>(
  parentNode: GParentNode,
  $: any,
  $content: DocumentFragment,
): GParentNode => {
  nodeAppendChild(parentNode, $content);
  return parentNode;
};
