import { nodesToHTML } from './nodes-to-html';
import { ILines } from '../misc/lines/lines.type';
import { attributeNodeToHTML } from './attribute-node-to-html';

export function attributesToHTML(
  nodes: ArrayLike<Attr>,
): ILines {
  const lines: ILines = [];
  for (let i = 0, l = nodes.length; i < l; i++) {
    lines.push(...attributeNodeToHTML(nodes[i]));
  }
  return nodesToHTML(nodes);
}
