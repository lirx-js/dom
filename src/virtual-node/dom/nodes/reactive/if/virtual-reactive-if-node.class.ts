import { distinctObserver, IObservable } from '@lirx/core';
import { applyTemplateForVirtualDOMNode } from '../../../../functions/apply-template-for-virtual-dom-node';
import { IGenericVirtualReactiveDOMNodeTemplateOrNull } from '../../../types/virtual-reactive-dom-node-template.type';
import { VirtualContainerNode } from '../../static/container/virtual-container-node.class';

export type IVirtualReactiveIfNodeTemplate = IGenericVirtualReactiveDOMNodeTemplateOrNull;

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

