import { IObservableLike, unknownToObservableNotUndefined } from '@lirx/core';
import {
  IVirtualReactiveForLoopNodeOptionsTrackByFunction,
  IVirtualReactiveForLoopNodeTemplate,
  VirtualReactiveForLoopNode,
} from '../../../../../../dom-manipulation/virtual-nodes/virtual-reactive-for-loop-node/virtual-reactive-for-loop-node.class';
import { inlineLastLines } from '../../../../../misc/lines/functions/after-last-line';
import { indentLines } from '../../../../../misc/lines/functions/indent-lines';
import { ILines } from '../../../../../misc/lines/lines.type';
import {
  ITranspileCreateReactiveForLoopNodeToJSLinesFunction,
  ITranspileCreateReactiveForLoopNodeToJSLinesOptions,
} from '../../transpilers/transpile-create-reactive-for-loop-node-to-js-lines.type';

export const transpileAOTCreateReactiveForLoopNodeToJSLines: ITranspileCreateReactiveForLoopNodeToJSLinesFunction = (
  {
    items,
    template,
    trackBy,
  }: ITranspileCreateReactiveForLoopNodeToJSLinesOptions,
): ILines => {
  return [
    `aot_6(`,
    ...indentLines([
      ...inlineLastLines(
        items,
        [','],
      ),
      ...inlineLastLines(
        template,
        [','],
      ),
      ...(
        (trackBy === null)
          ? []
          : inlineLastLines(
            trackBy,
            [','],
          )
      ),
    ]),
    `)`,
  ];
};

export function aot_6<GItem>(
  items$: IObservableLike<Iterable<GItem>>,
  template: IVirtualReactiveForLoopNodeTemplate<GItem>,
  trackBy?: IVirtualReactiveForLoopNodeOptionsTrackByFunction<GItem>,
): VirtualReactiveForLoopNode<GItem> {
  return new VirtualReactiveForLoopNode<GItem>(
    unknownToObservableNotUndefined(items$),
    template,
    trackBy,
  );
}

