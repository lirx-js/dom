import { ILines } from '../misc/lines/lines.type';

export function commentNodeToHTML(
  node: Comment,
): ILines {
  return [
    `<!--${node.data}-->`,
  ];
}
