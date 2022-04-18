import { ILines } from '../../../../../../../types/lines.type';
import { IRequireExternalFunction } from '../../../../../../require-external/require-external-function.type';
import {
  IRequireSetReactivePropertyKey,
  REQUIRE_SET_REACTIVE_PROPERTY_CONSTANT,
} from '../../../../../../require-external/types/require-set-reactive-property.type';
import {
  IRequireToObservableKey,
  REQUIRE_TO_OBSERVABLE_CONSTANT,
} from '../../../../../../require-external/types/require-to-observable.type';
import { IBindProperty } from '../../extract-bind-property-from-reactive-html-attribute';

/**
 * Syntax:
 *  - standard: [property]
 *  - prefixed: bind-property
 */

export type IRequireExternalFunctionKeyForTranspileReactiveHTMLReactivePropertyToReactiveDOMJSLines =
  | IRequireSetReactivePropertyKey
  | IRequireToObservableKey
  ;

export function transpileReactiveHTMLReactivePropertyToReactiveDOMJSLines(
  bindProperty: IBindProperty,
  requireExternalFunction: IRequireExternalFunction<IRequireExternalFunctionKeyForTranspileReactiveHTMLReactivePropertyToReactiveDOMJSLines>,
): ILines {
  const setReactiveProperty: string = requireExternalFunction(REQUIRE_SET_REACTIVE_PROPERTY_CONSTANT);
  const toObservable: string = requireExternalFunction(REQUIRE_TO_OBSERVABLE_CONSTANT);

  return [
    `// reactive property '${bindProperty.name}'`,
    `${setReactiveProperty}(${toObservable}(${bindProperty.value}), node, ${JSON.stringify(bindProperty.name)});`,
  ];
}

