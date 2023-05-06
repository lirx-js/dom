import { ILines } from '../../../../../../misc/lines/lines.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../primary/primary-transpilers.type';

export interface IGenerateJSLinesForRXForLoopOptions extends IHavingPrimaryTranspilersOptions {
  items: string;
  template: ILines;
  trackBy?: string | undefined;
}

export function generateJSLinesForRXForLoop(
  {
    items,
    template,
    trackBy,
    transpilers,
  }: IGenerateJSLinesForRXForLoopOptions,
): ILines {
  const {
    transpileAttachNodeToJSLines,
    transpileCreateReactiveForLoopNodeToJSLines,
  } = transpilers;

  return [
    `// reactive for loop node`,
    ...transpileAttachNodeToJSLines({
      node: transpileCreateReactiveForLoopNodeToJSLines({
        items: [items],
        template,
        trackBy: (trackBy === void 0)
          ? null
          : [trackBy],
      }),
      parentNode: ['parentNode'],
    }),
  ];
}
