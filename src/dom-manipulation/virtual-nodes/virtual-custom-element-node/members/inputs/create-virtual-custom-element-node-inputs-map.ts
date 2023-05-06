import { createMulticastReplayLastSource, IObserverObservableTuple, ISource } from '@lirx/core';
import { VirtualCustomElementNode } from '../../virtual-custom-element-node.class';
import { IVirtualCustomElementNodeConfig } from '../config/virtual-custom-element-node-config.type';
import {
  InferVirtualCustomElementNodeOptionsInputs,
  InferVirtualCustomElementNodeOptionsInputsFromInputs,
} from '../options/inputs/infer-virtual-custom-element-node-options-inputs.type';

export type IVirtualCustomElementNodeInputsMap = ReadonlyMap<string, IObserverObservableTuple<unknown>>;

export function createVirtualCustomElementNodeInputsMap<GConfig extends IVirtualCustomElementNodeConfig>(
  node: VirtualCustomElementNode<GConfig>,
  inputs: InferVirtualCustomElementNodeOptionsInputs<GConfig> | undefined = [] as any,
): IVirtualCustomElementNodeInputsMap {
  type GInputsEntry = InferVirtualCustomElementNodeOptionsInputsFromInputs<[[string, unknown]]>[0];
  type GInputsEntries = readonly GInputsEntry[];

  return new Map<string, IObserverObservableTuple<unknown>>(
    (inputs as GInputsEntries).map((entry: GInputsEntry): [string, IObserverObservableTuple<unknown>] => {
      let key: string;
      let source: ISource<unknown>;

      if (typeof entry === 'string') {
        key = entry;
        source = createMulticastReplayLastSource<unknown>();
      } else {
        key = entry[0];
        if (entry.length === 1) {
          source = createMulticastReplayLastSource<unknown>();
        } else if (entry.length === 2) {
          source = createMulticastReplayLastSource<unknown>(entry[1]);
        } else {
          source = entry[2]!();
        }
      }
      return [
        key,
        [
          source.emit,
          node.onConnected$(source.subscribe),
        ],
      ];
    }),
  );
}
