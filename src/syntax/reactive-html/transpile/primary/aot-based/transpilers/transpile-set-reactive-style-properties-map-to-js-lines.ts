import { IObservableLike, toObservableThrowIfUndefined } from '@lirx/core';
import { IUnsubscribe } from '@lirx/utils';
import {
  IGenericVirtualReactiveElementNode,
} from '../../../../../../dom-manipulation/virtual-nodes/virtual-reactive-element-node/generic-virtual-reactive-element-node.type';
import {
  IStylePropertiesMap,
} from '../../../../../../dom-manipulation/virtual-nodes/virtual-reactive-element-node/members/style/style-properties-map.type';
import { inlineLastLines } from '../../../../../misc/lines/functions/after-last-line';
import { ILines } from '../../../../../misc/lines/lines.type';
import {
  ITranspileSetReactiveStylePropertiesMapToJSLinesFunction,
  ITranspileSetReactiveStylePropertiesMapToJSLinesOptions,
} from '../../transpilers/transpile-set-reactive-style-properties-map-to-js-lines.type';

export const transpileAOTSetReactiveStylePropertiesMapToJSLines: ITranspileSetReactiveStylePropertiesMapToJSLinesFunction = (
  {
    node,
    value,
  }: ITranspileSetReactiveStylePropertiesMapToJSLinesOptions,
): ILines => {
  return inlineLastLines(
    [`aot_20(`],
    node,
    [`, `],
    value,
    [');'],
  );
};

export function aot_20(
  node: IGenericVirtualReactiveElementNode,
  stylePropertiesMap$: IObservableLike<IStylePropertiesMap>,
): IUnsubscribe {
  return node.setReactiveStylePropertiesMap(
    toObservableThrowIfUndefined(stylePropertiesMap$),
  );
}
