import { createCounter } from '../../misc/create-counter';
import { linesOrNullToLines } from '../../transpilers/misc/lines/functions/lines-or-null-to-lines';
import { linesToString } from '../../transpilers/misc/lines/functions/lines-to-string';
import { ILines } from '../../transpilers/misc/lines/lines.type';
import { transpileReactiveStyleToCSSLines } from '../../transpilers/reactive-style/css/transpile-reactive-style-to-css-lines';

export const COMPONENT_STYLES_ID = createCounter();


export interface ICompiledReactiveCSS {
  css: string;
  id: string;
}

export function compileStyleAsCompiledReactiveCSS(
  css: string,
  idPrefix: string = 'style-',
): ICompiledReactiveCSS {
  const id: string = `${idPrefix}${COMPONENT_STYLES_ID()}`;

  const lines: ILines = linesOrNullToLines(
    transpileReactiveStyleToCSSLines({
      css,
      hostSelector: `[${id}]`,
    }),
  );

  const compiledReactiveCSS: string = linesToString(lines);

  // console.log(compiledReactiveCSS);

  return {
    css: compiledReactiveCSS,
    id,
  };
}
