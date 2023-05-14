import { distinctObserver, IObservable } from '@lirx/core';
import { applyTemplateForVirtualDOMNode } from '../../templates/virtual-dom-node-template/apply-template-for-virtual-dom-node';
import {
  IGenericVirtualReactiveDOMNodeTemplateOrNull,
} from '../../templates/virtual-reactive-dom-node-template/virtual-reactive-dom-node-template.type';
import { VirtualContainerNode } from '../virtual-container-node/virtual-container-node.class';

export type IVirtualReactiveIfNodeTemplate = IGenericVirtualReactiveDOMNodeTemplateOrNull;

/**
 * Represents an abstract Container Node in an abstract DOM,
 * whose content depends on the values sent by the Observable "condition$".
 * When true is received, then "templateTrue" is used, else it's 'templateFalse'.
 * This is used as a conditionally displayed Node.
 */
export class VirtualReactiveIfNode extends VirtualContainerNode {
  constructor(
    condition$: IObservable<boolean>,
    templateTrue: IVirtualReactiveIfNodeTemplate = null,
    templateFalse: IVirtualReactiveIfNodeTemplate = null,
  ) {
    super();

    this.onConnected$<boolean>(condition$)(distinctObserver<boolean>((value: boolean): void => {
      this.detachChildren();

      if (value) {
        if (templateTrue !== null) {
          applyTemplateForVirtualDOMNode(
            this,
            templateTrue,
            [{}],
          );
        }
      } else {
        if (templateFalse !== null) {
          applyTemplateForVirtualDOMNode(
            this,
            templateFalse,
            [{}],
          );
        }
      }
    }));
  }
}
