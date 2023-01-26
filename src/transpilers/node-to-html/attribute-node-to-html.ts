import { ILines } from '../misc/lines/lines.type';

export function attributeNodeToHTML(
  node: Attr,
): ILines {
  return [
    `${node.name}${(node.value === '') ? '' : `=${JSON.stringify(node.value)}`}`,
  ];
}
