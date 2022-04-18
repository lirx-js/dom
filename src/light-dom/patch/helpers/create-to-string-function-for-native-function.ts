import { IGenericFunction } from '@lirx/core';

// function AssignToStringFunction(
//   proto: object,
//   name: string,
//   nativeFunction?: IGenericFunction,
// ): void {
//   proto[name].toString = createToStringFunctionForNativeFunction(name, nativeFunction);
// }

export interface IToStringFunction {
  (): string;
}

export function createToStringFunctionForNativeFunction(
  name: string,
  nativeFunction?: IGenericFunction,
): IToStringFunction {
  return (nativeFunction === void 0)
    ? () => `function ${name}() { [native code] };`
    : nativeFunction.toString.bind(nativeFunction)
    ;
}
