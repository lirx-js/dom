import { inlineLastLines } from '../../../../misc/lines/functions/after-last-line';
import { indentLines } from '../../../../misc/lines/functions/indent-lines';
import { ILines } from '../../../../misc/lines/lines.type';
import { generateJSLinesForLinesMap } from '../../../../misc/misc/generate-js-lines-for-lines-map';
import {
  ITranspileCreateReactiveSwitchNodeToJSLinesFunction,
  ITranspileCreateReactiveSwitchNodeToJSLinesOptions,
} from '../../transpilers/transpile-create-reactive-switch-node-to-js-lines.type';

export const transpileCreateReactiveSwitchNodeToJSLines: ITranspileCreateReactiveSwitchNodeToJSLinesFunction = (
  {
    expression,
    templatesMap,
    defaultTemplate,
  }: ITranspileCreateReactiveSwitchNodeToJSLinesOptions,
): ILines => {
  return [
    `new VirtualReactiveSwitchNode(`,
    ...indentLines([
      ...inlineLastLines(
        expression,
        [','],
      ),
      ...inlineLastLines(
        generateJSLinesForLinesMap({
          linesMap: templatesMap,
        }),
        [','],
      ),
      ...(
        ((defaultTemplate === null) || (defaultTemplate.length === 0))
          ? []
          : inlineLastLines(
            defaultTemplate,
            [','],
          )
      ),
    ]),
    `)`,
  ];
};


