import { distinctObserver, IObservable } from '@lirx/core';
import { applyTemplateForVirtualDOMNode } from '../../../../functions/apply-template-for-virtual-dom-node';
import { IGenericVirtualReactiveDOMNodeTemplateOrNull } from '../../../types/virtual-reactive-dom-node-template.type';
import { VirtualContainerNode } from '../../static/container/virtual-container-node.class';

export type IVirtualReactiveSwitchNodeTemplate = IGenericVirtualReactiveDOMNodeTemplateOrNull;

export class VirtualReactiveSwitchNode<GValue> extends VirtualContainerNode {
  constructor(
    value$: IObservable<GValue>,
    templates: Map<GValue, IVirtualReactiveSwitchNodeTemplate>,
    defaultTemplate: IVirtualReactiveSwitchNodeTemplate = null,
  ) {
    super();

    this.onConnected$<GValue>(value$)(distinctObserver<GValue>((value: GValue): void => {
      this.detachChildren();
      const template: IVirtualReactiveSwitchNodeTemplate = templates.get(value) ?? defaultTemplate;
      if (template !== null) {
        applyTemplateForVirtualDOMNode(
          this,
          template,
          [{}],
        );
      }
    }));
  }
}

