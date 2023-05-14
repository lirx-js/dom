import { HTML_NAMESPACE_URI_CONSTANT } from '../../misc/namespace-uri/html-namespace-uri.constant';
import { VirtualReactiveElementNode } from '../virtual-reactive-element-node/virtual-reactive-element-node.class';
import { InferVirtualCustomElementNodeConfigElement } from './members/config/infer-virtual-custom-element-node-config-element.type';
import { IVirtualCustomElementNodeConfigInputs } from './members/config/inputs/virtual-custom-element-node-config-inputs.type';
import { IVirtualCustomElementNodeConfigOutputs } from './members/config/outputs/virtual-custom-element-node-config-outputs.type';
import { IVirtualCustomElementNodeConfig } from './members/config/virtual-custom-element-node-config.type';
import {
  createVirtualCustomElementNodeInputsFromInputsMap,
} from './members/inputs/inputs-map/create-virtual-custom-element-node-inputs-from-inputs-map';
import {
  createVirtualCustomElementNodeInputsMap,
  IVirtualCustomElementNodeInputsMap,
} from './members/inputs/inputs-map/create-virtual-custom-element-node-inputs-map';
import { IVirtualCustomElementNodeInputs } from './members/inputs/virtual-custom-element-node-inputs.type';
import { IVirtualCustomElementNodeOptions } from './members/options/virtual-custom-element-node-options.type';
import {
  createVirtualCustomElementNodeOutputsFromOutputsMap,
} from './members/outputs/outputs-map/create-virtual-custom-element-node-outputs-from-outputs-map';
import {
  createVirtualCustomElementNodeOutputsMap,
  IVirtualCustomElementNodeOutputsMap,
} from './members/outputs/outputs-map/create-virtual-custom-element-node-outputs-map';
import { IVirtualCustomElementNodeOutputs } from './members/outputs/virtual-custom-element-node-outputs.type';
import { IVirtualCustomElementNodeSlotsMap } from './members/slots/virtual-custom-element-node-slots-map.type';

/**
 * Represents an instance of a Component.
 * It has:
 * - a name
 * - some slots
 * - and some 'inputs' and 'outputs'
 */
export class VirtualCustomElementNode<GConfig extends IVirtualCustomElementNodeConfig> extends VirtualReactiveElementNode<InferVirtualCustomElementNodeConfigElement<GConfig>> {

  protected readonly _name: string;
  protected readonly _extends: string | undefined;
  protected readonly _slots: IVirtualCustomElementNodeSlotsMap;

  protected readonly _inputsMap: IVirtualCustomElementNodeInputsMap;
  protected _inputs!: IVirtualCustomElementNodeInputs<GConfig>;

  protected readonly _outputsMap: IVirtualCustomElementNodeOutputsMap;
  protected _outputs!: IVirtualCustomElementNodeOutputs<GConfig>;

  constructor(
    {
      name,
      extends: _extends,
      namespaceURI = HTML_NAMESPACE_URI_CONSTANT,
      slots,
      inputs,
      outputs,
    }: IVirtualCustomElementNodeOptions<GConfig>,
  ) {
    super(
      namespaceURI,
      (_extends === void 0)
        ? name
        : _extends,
    );
    this._name = name;
    this._extends = _extends;
    this._slots = slots;
    this._inputsMap = createVirtualCustomElementNodeInputsMap(inputs as IVirtualCustomElementNodeConfigInputs);
    this._outputsMap = createVirtualCustomElementNodeOutputsMap(outputs as IVirtualCustomElementNodeConfigOutputs);

    if (_extends !== void 0) {
      this.setAttribute('is', name);
    }
  }

  get name(): string {
    return this._name;
  }

  get extends(): string | undefined {
    return this._extends;
  }

  get slots(): IVirtualCustomElementNodeSlotsMap {
    return this._slots;
  }

  get inputs(): IVirtualCustomElementNodeInputs<GConfig> {
    if (this._inputs === void 0) {
      this._inputs = createVirtualCustomElementNodeInputsFromInputsMap<GConfig>(this._inputsMap);
    }
    return this._inputs;
  }

  get outputs(): IVirtualCustomElementNodeOutputs<GConfig> {
    if (this._outputs === void 0) {
      this._outputs = createVirtualCustomElementNodeOutputsFromOutputsMap<GConfig>(this._outputsMap);
    }
    return this._outputs;
  }
}

/*-------------------*/

/*-------------------*/

// type IGenericIO = readonly [string, ...any[]][];

// function verifyInputsIntegrity(
//   inputs: ITypedSourcesMapEntriesTuple,
// ): void {
//   const set = new Set<string>();
//
//   for (let i = 0, l = inputs.length; i < l; i++) {
//     const [name]: IGenericTypedSourcesMapEntry = inputs[i];
//     if (set.has(name)) {
//       throw new Error(`Input '${name}' already exists`);
//     }
//   }
// }

// function verifyInterfacesIntegrity<GConfig extends IVirtualCustomElementNodeConfig>(
//   inputs: InferVirtualCustomElementNodeOptionsInputs<GConfig>,
//   outputs: InferVirtualCustomElementNodeOptionsOutputs<GConfig>,
// ): void {
//   const interfacesSet = new Set<string>();
//
//   const addInterface = (
//     name: string,
//     context: string,
//   ): void => {
//     if (interfacesSet.has(name)) {
//       throw new Error(`Interface '${name}' of '${context}' already exists`);
//     } else {
//       interfacesSet.add(name);
//     }
//   };
//
//   (inputs as unknown as readonly [string][]).forEach(([name]: [string]): void => {
//     addInterface(name, 'inputs');
//   });
//
//   (outputs as unknown as readonly string[]).forEach((name: string): void => {
//     addInterface(name, 'outputs');
//   });
// }

/*-----------------*/

// interface TestConfig {
//   element: HTMLButtonElement;
//   inputs: [
//     ['i-a', boolean],
//   ],
//   outputs: [
//     ['o-a', number],
//   ],
// }
//
// const a = new VirtualCustomElementNode<TestConfig>({
//   name: 'test',
//   slots: new Map(),
//   inputs: [
//     ['i-a', true],
//   ],
//   outputs: [
//     'o-a',
//   ],
// });
//
// a.inputs.get('i-a');
// a.outputs.set('o-a', 4);
// a.setReactiveInput('i-a', single(true))
// a.setReactiveOutput('i-a', (value: boolean) => {})
// a.setReactiveOutput('o-a', (value: number) => {})
