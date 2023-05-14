import { createMulticastReplayLastSource, IObserverObservableTuple, ISource } from '@lirx/core';
import { IVirtualCustomElementNodeConfigInputs } from '../../config/inputs/virtual-custom-element-node-config-inputs.type';
import {
  InferVirtualCustomElementNodeOptionsInputsFromInputs,
} from '../../options/inputs/infer-virtual-custom-element-node-options-inputs.type';

export type IVirtualCustomElementNodeInputsMap = ReadonlyMap<string, IObserverObservableTuple<unknown>>;

export function createVirtualCustomElementNodeInputsMap(
  inputs: IVirtualCustomElementNodeConfigInputs | undefined = [] as any,
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
          source.subscribe,
        ],
      ];
    }),
  );
}
