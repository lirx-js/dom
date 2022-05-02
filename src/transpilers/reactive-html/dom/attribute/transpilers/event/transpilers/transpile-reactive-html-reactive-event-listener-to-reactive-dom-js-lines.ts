import { ILines } from '../../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../../require-external/require-external-function.type';
import {
  IRequireSetReactiveEventListenerKey,
  REQUIRE_SET_REACTIVE_EVENT_LISTENER_CONSTANT,
} from '../../../../../require-external/types/require-set-reactive-event-listener.type';
import {
  IRequireSubscribeOnNodeConnectedTo,
  REQUIRE_SUBSCRIBE_ON_NODE_CONNECTED_TO,
} from '../../../../../require-external/types/require-subscribe-on-node-connected-to.type';
import { IEventProperty } from '../extract-event-property-from-reactive-html-attribute';

/**
 * Syntax:
 *  - standard: (event)
 *  - prefixed: on-event
 */

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLReactiveEventListenerToReactiveDOMJSLines =
  | IRequireSetReactiveEventListenerKey
  | IRequireSubscribeOnNodeConnectedTo
  ;

export function transpileReactiveHTMLReactiveEventListenerToReactiveDOMJSLines(
  {
    name,
    value,
  }: IEventProperty,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLReactiveEventListenerToReactiveDOMJSLines>,
): ILines {
  if (name.endsWith('$')) {
    const subscribeOnNodeConnectedTo: string = requireExternalFunction(REQUIRE_SUBSCRIBE_ON_NODE_CONNECTED_TO);
    return [
      `// subscribe to '${name}'`,
      `${subscribeOnNodeConnectedTo}(node, node[${JSON.stringify(name)}], ${value});`,
    ];
  } else {
    const setReactiveEventListener: string = requireExternalFunction(REQUIRE_SET_REACTIVE_EVENT_LISTENER_CONSTANT);
    return [
      `// reactive event listener '${name}'`,
      `${setReactiveEventListener}(${value}, node, ${JSON.stringify(name)});`,
    ];
  }
}

