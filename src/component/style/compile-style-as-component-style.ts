import { IComponentStyle } from '../types/options/component-style.type';
import { compileStyleAsCompiledReactiveCSS } from './compile-style-as-compiled-reactive-css';
import { createComponentStyleFromCompiledReactiveCSS } from './create-component-style-from-compiled-reactive-css';

export function compileStyleAsComponentStyle(
  css: string,
): IComponentStyle {
  return createComponentStyleFromCompiledReactiveCSS(
    compileStyleAsCompiledReactiveCSS(css),
  );
}


