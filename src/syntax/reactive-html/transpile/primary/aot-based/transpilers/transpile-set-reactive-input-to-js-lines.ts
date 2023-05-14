import { IObservableLike } from '@lirx/core';
import { IUnsubscribe } from '@lirx/utils';
import {
  IVirtualCustomElementNodeConfig,
} from '../../../../../../dom-manipulation/virtual-nodes/virtual-custom-element-node/members/config/virtual-custom-element-node-config.type';
import {
  InferVirtualCustomElementNodeCaseInsensitiveInputValue,
} from '../../../../../../dom-manipulation/virtual-nodes/virtual-custom-element-node/members/inputs/case-insensitive/infer-virtual-custom-element-node-case-insensitive-input-value.type';
import {
  virtualCustomElementNodeSetCaseInsensitiveReactiveInputLike,
} from '../../../../../../dom-manipulation/virtual-nodes/virtual-custom-element-node/members/inputs/case-insensitive/virtual-custom-element-node-set-case-insensitive-reactive-input-like';
import {
  VirtualCustomElementNode,
} from '../../../../../../dom-manipulation/virtual-nodes/virtual-custom-element-node/virtual-custom-element-node.class';
import { inlineLastLines } from '../../../../../misc/lines/functions/after-last-line';
import { ILines } from '../../../../../misc/lines/lines.type';
import {
  ITranspileSetReactiveInputToJSLinesFunction,
  ITranspileSetReactiveInputToJSLinesOptions,
} from '../../transpilers/transpile-set-reactive-input-to-js-lines.type';

export const transpileAOTSetReactiveInputToJSLines: ITranspileSetReactiveInputToJSLinesFunction = (
  {
    node,
    name,
    value,
  }: ITranspileSetReactiveInputToJSLinesOptions,
): ILines => {
  return inlineLastLines(
    [`aot_16(`],
    node,
    [', '],
    name,
    [', '],
    value,
    [');'],
  );
};

export function aot_16<GConfig extends IVirtualCustomElementNodeConfig, GKey extends string>(
  node: VirtualCustomElementNode<GConfig>,
  key: GKey,
  value$: IObservableLike<InferVirtualCustomElementNodeCaseInsensitiveInputValue<GConfig, GKey>>,
): IUnsubscribe {
  return virtualCustomElementNodeSetCaseInsensitiveReactiveInputLike<GConfig, GKey>(
    node,
    key,
    value$,
  );
}

