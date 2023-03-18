import {
  IGenericVirtualCustomElementNode,
} from '../../../virtual-node/dom/nodes/reactive/custom-element/virtual-custom-element-node.class';
import { IGenericVirtualShadowRootNode } from '../../../virtual-node/dom/nodes/static/shadow-root/virtual-shadow-root-node.class';
import { IComponentStyle } from '../../types/options/component-style.type';

export function compileStyleAsShadowComponentStyle(
  css: string,
): IComponentStyle {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(css);

  return (
    node: IGenericVirtualCustomElementNode,
  ): void => {
    const shadowRoot: IGenericVirtualShadowRootNode | null = node.shadowRoot;
    if (shadowRoot === null) {
      throw new Error(`Not a shadow component`);
    } else {
      shadowRoot.rootNode.adoptedStyleSheets = [
        ...shadowRoot.rootNode.adoptedStyleSheets,
        sheet,
      ];
    }
  };
}


