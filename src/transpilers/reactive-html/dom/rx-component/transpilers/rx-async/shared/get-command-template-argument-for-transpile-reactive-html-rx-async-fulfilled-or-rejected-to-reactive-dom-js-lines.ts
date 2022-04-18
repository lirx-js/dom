import { ILinesOrNull } from '../../../../../../types/lines.type';

export function getCommentTemplateArgumentForTranspileReactiveHTMLRXAsyncFulfilledOrRejectedToReactiveDOMJSLines(attributeValue: string): ILinesOrNull {
  return (attributeValue === '')
    ? null
    : (
      (attributeValue === 'value')
        ? [`{ value }`]
        : [`{ value: ${attributeValue} }`]
    );
}
