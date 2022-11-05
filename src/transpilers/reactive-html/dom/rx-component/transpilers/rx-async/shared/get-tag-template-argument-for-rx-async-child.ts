import { ILinesOrNull } from '../../../../../../misc/lines/lines-or-null.type';
import { getCommandTemplateArgumentForRXAsyncChild } from './get-command-template-argument-for-rx-async-child';

export function getTagTemplateArgumentForRXAsyncChild(
  node: Element,
): ILinesOrNull {
  const attribute: string | null = node.getAttribute('let-value');
  return (attribute === null)
    ? null
    : getCommandTemplateArgumentForRXAsyncChild((attribute === '') ? 'value' : attribute);
}
