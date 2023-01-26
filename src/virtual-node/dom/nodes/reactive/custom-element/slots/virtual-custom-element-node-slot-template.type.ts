import { IVirtualDOMNodeTemplate } from '../../../../types/virtual-dom-node-template.type';

export type IVirtualCustomElementNodeSlotTemplate<GTemplateArgument extends object> = IVirtualDOMNodeTemplate<[GTemplateArgument]>;

// export type IVirtualCustomElementNodeSlotTemplate = IVirtualDOMNodeTemplate<[]>; // IGenericVirtualReactiveDOMNodeTemplate
