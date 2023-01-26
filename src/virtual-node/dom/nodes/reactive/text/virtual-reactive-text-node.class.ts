import { IObservable } from '@lirx/core';
import { VirtualTextNode } from '../../static/text/virtual-text-node';

/**
 * Represents an abstract Text Node in an abstract DOM.
 * whose content depends on the values sent by the Observable "value$".
 * When a value is received, then the underlying Text Node is updated with this value.
 * This is used as a dynamic Text Node.
 */
export class VirtualReactiveTextNode extends VirtualTextNode {
  constructor(
    value$: IObservable<string>,
  ) {
    super();
    this.onConnected$(value$)((value: string): void => {
      this.value = value;
    });
  }
}
