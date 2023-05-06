import { distinctObserver, IObservable } from '@lirx/core';
import { applyTemplateForVirtualDOMNode } from '../../templates/virtual-dom-node-template/apply-template-for-virtual-dom-node';
import { IGenericVirtualReactiveDOMNodeTemplateOrNull } from '../../templates/virtual-reactive-dom-node-template/virtual-reactive-dom-node-template.type';
import { VirtualContainerNode } from '../virtual-container-node/virtual-container-node.class';

export type IVirtualReactiveSwitchNodeTemplate = IGenericVirtualReactiveDOMNodeTemplateOrNull;

/**
 * Represents an abstract Container Node in an abstract DOM,
 * whose content depends on the values sent by the Observable "value$".
 * When a value is received, then "templatesMap.get(value)" is used.
 * If there is no corresponding template, then "defaultTemplate" is used instead.
 */
export class VirtualReactiveSwitchNode<GValue> extends VirtualContainerNode {
  constructor(
    value$: IObservable<GValue>,
    templatesMap: ReadonlyMap<GValue, IVirtualReactiveSwitchNodeTemplate>,
    defaultTemplate: IVirtualReactiveSwitchNodeTemplate = null,
  ) {
    super();

    this.onConnected$<GValue>(value$)(distinctObserver<GValue>((value: GValue): void => {
      this.detachChildren();
      const template: IVirtualReactiveSwitchNodeTemplate = templatesMap.get(value) ?? defaultTemplate;
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

