import { getElementTagName } from '../../../../../../../misc/dom/get-element-tag-name';
import { createMissingAttributeError } from '../../../../../../misc/errors/create-missing-attribute-error';
import { createSlotAlreadyExistsError } from '../../../../../../misc/errors/create-slot-already-exists-error';
import { linesOrNullToLines } from '../../../../../../misc/lines/functions/lines-or-null-to-lines';
import { ILinesOrNull } from '../../../../../../misc/lines/lines-or-null.type';
import { IHavingPrimaryTranspilersOptions } from '../../../../../primary/primary-transpilers.type';
import {
  ITranspileCreateReactiveCustomElementNodeToJSLinesOptionsSlotsMap,
} from '../../../../../primary/transpilers/transpile-create-reactive-custom-element-node-to-js-lines.type';
import { transpileReactiveHTMLNodesToJSLines } from '../../../../nodes/transpile-reactive-html-nodes-to-js-lines';
import {
  transpileReactiveHTMLRXInjectSlotChildNodesToLines,
} from '../../../../rx-component/transpilers/rx-inject-slot/transpile-reactive-html-rx-inject-slot-child-nodes-to-lines';
import { transpileReactiveHTMLElementToJSLines } from '../../../transpile-reactive-html-element-to-js-lines';

export const RX_SLOT_TAG_NAME = 'rx-slot';
export const RX_SLOT_COMMAND = '*slot';

export interface ITranspileReactiveHTMLCustomElementChildElementToSlotsOfJSLinesOptions extends IHavingPrimaryTranspilersOptions {
  node: Element;
  slots: ITranspileCreateReactiveCustomElementNodeToJSLinesOptionsSlotsMap;
}

export function transpileReactiveHTMLCustomElementChildElementToSlotsOfJSLines(
  {
    node,
    slots,
    ...options
  }: ITranspileReactiveHTMLCustomElementChildElementToSlotsOfJSLinesOptions,
): void {
  if (getElementTagName(node) === RX_SLOT_TAG_NAME) {
    const name: string | null = node.getAttribute('name');
    const proxy: string | null = node.getAttribute('proxy');

    if (name === null) {
      if (proxy === null) {
        throw createMissingAttributeError('name', RX_SLOT_TAG_NAME);
      } else {
        slots.set(proxy, transpileReactiveHTMLRXInjectSlotChildNodesToLines({
          ...options,
          slotName: proxy,
          nodes: node.childNodes,
        }));
      }
    } else if (slots.has(name)) {
      throw createSlotAlreadyExistsError(name);
    } else {
      if (proxy === null) {
        slots.set(name, linesOrNullToLines(transpileReactiveHTMLNodesToJSLines({
          ...options,
          nodes: node.childNodes,
        })));
      } else {
        const proxyName: string = (proxy === '')
          ? name
          : proxy;

        slots.set(name, transpileReactiveHTMLRXInjectSlotChildNodesToLines({
          ...options,
          slotName: proxyName,
          nodes: node.childNodes,
        }));
      }
    }
  } else {
    let name: string | null = node.getAttribute(RX_SLOT_COMMAND);
    if (name === null) {
      const lines: ILinesOrNull = transpileReactiveHTMLElementToJSLines({
        ...options,
        node: node as Element,
      });
      if (lines !== null) {
        slots.get('*')!.push(...lines);
      }
    } else if (slots.has(name)) {
      throw createSlotAlreadyExistsError(name);
    } else {
      node.removeAttribute(RX_SLOT_COMMAND);
      slots.set(name, linesOrNullToLines(transpileReactiveHTMLElementToJSLines({
        ...options,
        node: node as Element,
      })));
    }
  }
}
