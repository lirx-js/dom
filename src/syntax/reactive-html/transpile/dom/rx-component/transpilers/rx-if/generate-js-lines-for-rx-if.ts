import { ILines } from '../../../../../../misc/lines/lines.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../primary/primary-transpilers.type';

export interface IGenerateJSLinesForRXIfOptions extends IHavingPrimaryTranspilersOptions {
  condition: string;
  templateTrue: ILines;
  templateFalse: ILines;
}

export function generateJSLinesForRXIf(
  {
    condition,
    templateTrue,
    templateFalse,
    transpilers,
  }: IGenerateJSLinesForRXIfOptions,
): ILines {
  const {
    transpileAttachNodeToJSLines,
    transpileCreateReactiveIfNodeToJSLines,
  } = transpilers;

  return [
    `// reactive if node`,
    ...transpileAttachNodeToJSLines({
      node: transpileCreateReactiveIfNodeToJSLines({
        condition: [condition],
        templateTrue,
        templateFalse,
      }),
      parentNode: ['parentNode'],
    }),
  ];
}
