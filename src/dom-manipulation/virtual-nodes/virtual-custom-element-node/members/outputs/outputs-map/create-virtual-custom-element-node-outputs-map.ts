import { createMulticastSource, IObserverObservableTuple, ISource } from '@lirx/core';
import { IVirtualCustomElementNodeConfigOutputs } from '../../config/outputs/virtual-custom-element-node-config-outputs.type';
import {
  InferVirtualCustomElementNodeOptionsOutputsFromOutputs,
} from '../../options/outputs/infer-virtual-custom-element-node-options-outputs.type';

export type IVirtualCustomElementNodeOutputsMap = ReadonlyMap<string, IObserverObservableTuple<unknown>>;

export function createVirtualCustomElementNodeOutputsMap(
  outputs: IVirtualCustomElementNodeConfigOutputs | undefined = [] as any,
): IVirtualCustomElementNodeOutputsMap {
  type GOutputsEntry = InferVirtualCustomElementNodeOptionsOutputsFromOutputs<[[string, unknown]]>[0];
  type GOutputsEntries = readonly GOutputsEntry[];

  return new Map<string, IObserverObservableTuple<unknown>>((outputs as GOutputsEntries).map((entry: GOutputsEntry): [string, IObserverObservableTuple<unknown>] => {
    let key: string;
    let source: ISource<unknown>;

    if (typeof entry === 'string') {
      key = entry;
      source = createMulticastSource<unknown>();
    } else {
      key = entry[0];
      if (entry.length === 1) {
        source = createMulticastSource<unknown>();
      } else {
        source = entry[1]!();
      }
    }
    return [
      key,
      [
        source.emit,
        source.subscribe,
      ],
    ];
  }));
}
