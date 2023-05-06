import { ILines } from '../../../../../../../../misc/lines/lines.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../../../primary/primary-transpilers.type';

export interface IGenerateJSLinesForReactiveClassOptions extends IHavingPrimaryTranspilersOptions {
  name: string;
  value: string;
}

export function generateJSLinesForReactiveClass(
  {
    name,
    value,
    transpilers,
  }: IGenerateJSLinesForReactiveClassOptions,
): ILines {
  const {
    transpileSetReactiveClassToJSLines,
  } = transpilers;

  return [
    `// reactive class '${name}'`,
    ...transpileSetReactiveClassToJSLines({
      node: ['node'],
      name: [JSON.stringify(name)],
      value: [value],
    }),
  ];
}
