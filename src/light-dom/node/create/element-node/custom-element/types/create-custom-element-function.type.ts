import { createElement } from '../../create-element';

export type ICreateCustomElementFunction = typeof createElement;

// import { IHTMLTemplate } from '../../../../../template/html-template.type';
// import { ICreateElementOptions } from '../../create-element';
//
// export interface ICreateCustomElementFunction {
//   <GElement extends Element>(
//     tagName: string,
//     slots: ICustomElementSlots,
//     options?: ICreateElementOptions,
//   ): GElement;
// }
//
// export type ICustomElementSlots = Map<string, IHTMLTemplate<[]>>;
//
