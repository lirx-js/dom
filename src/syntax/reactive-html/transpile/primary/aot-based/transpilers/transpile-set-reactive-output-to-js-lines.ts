import { IObservable, IObservableLike, IObserver } from '@lirx/core';
import { IUnsubscribe } from '@lirx/utils';
import {
  IVirtualCustomElementNodeConfig
} from '../../../../../../dom-manipulation/virtual-nodes/virtual-custom-element-node/members/config/virtual-custom-element-node-config.type';
import {
  InferVirtualCustomElementNodeCaseInsensitiveInputValue
} from '../../../../../../dom-manipulation/virtual-nodes/virtual-custom-element-node/members/inputs/case-insensitive/infer-virtual-custom-element-node-case-insensitive-input-value.type';
import {
  virtualCustomElementNodeSetCaseInsensitiveReactiveInputLike
} from '../../../../../../dom-manipulation/virtual-nodes/virtual-custom-element-node/members/inputs/case-insensitive/virtual-custom-element-node-set-case-insensitive-reactive-input-like';
import {
  InferVirtualCustomElementNodeCaseInsensitiveOutputValue
} from '../../../../../../dom-manipulation/virtual-nodes/virtual-custom-element-node/members/outputs/case-insensitive/infer-virtual-custom-element-node-case-insensitive-output-value.type';
import {
  virtualCustomElementNodeSetCaseInsensitiveReactiveOutput
} from '../../../../../../dom-manipulation/virtual-nodes/virtual-custom-element-node/members/outputs/case-insensitive/virtual-custom-element-node-set-case-insensitive-reactive-output';
import {
  virtualCustomElementNodeSetCaseInsensitiveReactiveOutputFromObservable
} from '../../../../../../dom-manipulation/virtual-nodes/virtual-custom-element-node/members/outputs/case-insensitive/virtual-custom-element-node-set-case-insensitive-reactive-output-from-observable';
import {
  VirtualCustomElementNode
} from '../../../../../../dom-manipulation/virtual-nodes/virtual-custom-element-node/virtual-custom-element-node.class';
import { inlineLastLines } from '../../../../../misc/lines/functions/after-last-line';
import { ILines } from '../../../../../misc/lines/lines.type';
import {
  ITranspileSetReactiveOutputToJSLinesFunction,
  ITranspileSetReactiveOutputToJSLinesOptions,
} from '../../transpilers/transpile-set-reactive-output-to-js-lines.type';

export const transpileAOTSetReactiveOutputToJSLines: ITranspileSetReactiveOutputToJSLinesFunction = (
  {
    node,
    name,
    value,
    observableMode,
  }: ITranspileSetReactiveOutputToJSLinesOptions,
): ILines => {
  return inlineLastLines(
    [
      observableMode
        ? `aot_17(`
        : `aot_18(`,
    ],
    [],
    node,
    [', '],
    name,
    [', '],
    value,
    [');'],
  );
};


export function aot_17<GConfig extends IVirtualCustomElementNodeConfig, GKey extends string>(
  node: VirtualCustomElementNode<GConfig>,
  key: GKey,
  value$: IObservable<IObserver<InferVirtualCustomElementNodeCaseInsensitiveOutputValue<GConfig, GKey>>>,
): IUnsubscribe {
  return virtualCustomElementNodeSetCaseInsensitiveReactiveOutputFromObservable<GConfig, GKey>(
    node,
    key,
    value$,
  );
}

export function aot_18<GConfig extends IVirtualCustomElementNodeConfig, GKey extends string>(
  node: VirtualCustomElementNode<GConfig>,
  key: GKey,
  value$: IObservable<IObserver<InferVirtualCustomElementNodeCaseInsensitiveOutputValue<GConfig, GKey>>>,
): IUnsubscribe {
  return virtualCustomElementNodeSetCaseInsensitiveReactiveOutput<GConfig, GKey>(
    node,
    key,
    value$,
  );
}
