import { IObservable, IObserver, IUnsubscribe } from '@lirx/core';
import { HTML_NAMESPACE_URI_CONSTANT } from '../../../../../misc/namespace-uri/html-namespace-uri.constant';
import { createTypedSourcesMap } from '../../../../../misc/typed-sources-map/implementations/create-typed-sources-map';
import { ITypedSourcesMap } from '../../../../../misc/typed-sources-map/implementations/typed-sources-map';
import {
  ITypedSourcesMapEntriesTupleToEntriesTuple,
} from '../../../../../misc/typed-sources-map/types/typed-sources-map-entries-tuple-to-entries-tuple.infer';
import { VirtualReactiveElementNode } from '../element/virtual-reactive-element-node.class';
import { IVirtualCustomElementNodeSlotsMap } from './slots/virtual-custom-element-node-slots-map.type';
import { InferVirtualCustomElementNodeConfigElement } from './types/config/infer-virtual-custom-element-node-config-element.type';
import { InferVirtualCustomElementNodeConfigInputs } from './types/config/infer-virtual-custom-element-node-config-inputs.type';
import { InferVirtualCustomElementNodeConfigOutputs } from './types/config/infer-virtual-custom-element-node-config-outputs.types';
import { IVirtualCustomElementNodeConfig } from './types/config/virtual-custom-element-node-config.type';
import {
  InferVirtualCustomElementNodeSetReactiveInputKeys,
} from './types/methods/set-reactive-input/infer-virtual-custom-element-node-set-reactive-input-keys.type';
import {
  InferVirtualCustomElementNodeSetReactiveInputValueFromKey,
} from './types/methods/set-reactive-input/infer-virtual-custom-element-node-set-reactive-input-value-from-key.type';
import { ISetCaseInsensitiveInputValue } from './types/methods/set-reactive-input/set-case-insensitive-input-value.type';
import {
  InferVirtualCustomElementNodeSetReactiveOutputKeys,
} from './types/methods/set-reactive-output/infer-virtual-custom-element-node-set-reactive-output-keys.type';
import {
  InferVirtualCustomElementNodeSetReactiveOutputValueFromKey,
} from './types/methods/set-reactive-output/infer-virtual-custom-element-node-set-reactive-output-value-from-key.type';
import { ISetCaseInsensitiveOutputValue } from './types/methods/set-reactive-output/set-case-insensitive-output-value.type';
import { InferVirtualCustomElementNodeOptionsInputs } from './types/options/infer-virtual-custom-element-node-options-inputs.type';
import { InferVirtualCustomElementNodeOptionsOutputs } from './types/options/infer-virtual-custom-element-node-options-outputs.type';
import { IVirtualCustomElementNodeOptions } from './types/options/virtual-custom-element-node-options.type';

export class VirtualCustomElementNode<GConfig extends IVirtualCustomElementNodeConfig> extends VirtualReactiveElementNode<InferVirtualCustomElementNodeConfigElement<GConfig>> {

  protected readonly _name: string;
  protected readonly _extends: string | undefined;
  protected readonly _slots: IVirtualCustomElementNodeSlotsMap;
  protected readonly _inputs: ITypedSourcesMap<InferVirtualCustomElementNodeConfigInputs<GConfig>>;
  protected readonly _outputs: ITypedSourcesMap<InferVirtualCustomElementNodeConfigOutputs<GConfig>>;

  protected readonly _lowerCaseInputKeys: ReadonlyMap<string, string>; // computed
  protected readonly _lowerCaseOutputKeys: ReadonlyMap<string, string>; // computed

  constructor(
    {
      name,
      extends: _extends,
      slots,
      inputs = [] as unknown as InferVirtualCustomElementNodeOptionsInputs<GConfig>,
      outputs = [] as unknown as InferVirtualCustomElementNodeOptionsOutputs<GConfig>,
    }: IVirtualCustomElementNodeOptions<GConfig>,
  ) {
    super(
      HTML_NAMESPACE_URI_CONSTANT,
      (_extends === void 0)
        ? name
        : _extends,
    );
    this._name = name;
    this._extends = _extends;
    this._slots = slots;

    verifyInterfacesIntegrity(
      inputs,
      outputs,
    );

    this._inputs = createTypedSourcesMap<InferVirtualCustomElementNodeConfigInputs<GConfig>>(inputs);
    this._outputs = createTypedSourcesMap<InferVirtualCustomElementNodeConfigOutputs<GConfig>>(
      (outputs as unknown as string[]).map((name: string): [string] => {
        return [name];
      }) as unknown as ITypedSourcesMapEntriesTupleToEntriesTuple<InferVirtualCustomElementNodeConfigOutputs<GConfig>>,
    );

    this._lowerCaseInputKeys = new Map<string, string>(
      (inputs as unknown as [string, any][]).map(([key]: [string, any]): [string, string] => {
        return [key.toLowerCase(), key];
      }),
    );

    this._lowerCaseOutputKeys = new Map<string, string>(
      (outputs as unknown as string[]).map((key: string): [string, string] => {
        return [key.toLowerCase(), key];
      }),
    );

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

  get inputs(): ITypedSourcesMap<InferVirtualCustomElementNodeConfigInputs<GConfig>> {
    return this._inputs;
  }

  get outputs(): ITypedSourcesMap<InferVirtualCustomElementNodeConfigOutputs<GConfig>> {
    return this._outputs;
  }

  /* INPUT */

  setReactiveInput<GKey extends InferVirtualCustomElementNodeSetReactiveInputKeys<GConfig>>(
    key: GKey,
    value$: IObservable<InferVirtualCustomElementNodeSetReactiveInputValueFromKey<GConfig, GKey>>,
  ): IUnsubscribe {
    return this.onConnected$(value$)(this._inputs.$set<GKey>(key));
  }

  setCaseInsensitiveReactiveInput<GKey extends string>(
    key: GKey,
    value: IObservable<ISetCaseInsensitiveInputValue<GConfig, GKey>>,
  ): IUnsubscribe {
    const lowerCaseKey: string = key.toLowerCase();
    if (this._lowerCaseInputKeys.has(lowerCaseKey)) {
      return this.setReactiveInput(
        this._lowerCaseInputKeys.get(lowerCaseKey) as InferVirtualCustomElementNodeSetReactiveInputKeys<GConfig>,
        value as any,
      );
    } else {
      throw new Error(`Input '${key}' not found`);
    }
  }

  /* OUTPUT */

  setReactiveOutput<GKey extends InferVirtualCustomElementNodeSetReactiveOutputKeys<GConfig>>(
    key: GKey,
    $value: IObserver<InferVirtualCustomElementNodeSetReactiveOutputValueFromKey<GConfig, GKey>>,
  ): IUnsubscribe {
    type GValue = InferVirtualCustomElementNodeSetReactiveOutputValueFromKey<GConfig, GKey>;
    const observable$ = (
      this._outputs.has(key)
        ? this._outputs.get$<GKey>(key)
        : this._inputs.get$<GKey>(key)
    ) as IObservable<GValue>;
    return this.onConnected$(observable$)($value);
  }

  setCaseInsensitiveReactiveOutput<GKey extends string>(
    key: GKey,
    value: IObservable<ISetCaseInsensitiveOutputValue<GConfig, GKey>>,
  ): IUnsubscribe {
    const lowerCaseKey: string = key.toLowerCase();
    if (this._lowerCaseOutputKeys.has(lowerCaseKey)) {
      return this.setReactiveOutput(
        this._lowerCaseOutputKeys.get(lowerCaseKey) as InferVirtualCustomElementNodeSetReactiveOutputKeys<GConfig>,
        value as any,
      );
    } else {
      throw new Error(`Output '${key}' not found`);
    }
  }
}

// export type IGenericGenericVirtualCustomElementNode = VirtualCustomElementNode<HTMLElement, ITypedSourcesMapEntriesTuple>;
// export type IGenericGenericVirtualCustomElementNode = VirtualCustomElementNode<IVirtualCustomElementNodeConfig>;
export type IGenericGenericVirtualCustomElementNode = VirtualCustomElementNode<any>;

/*-------------------*/

// type IGenericIO = readonly [string, ...any[]][];

function verifyInterfacesIntegrity<GConfig extends IVirtualCustomElementNodeConfig>(
  inputs: InferVirtualCustomElementNodeOptionsInputs<GConfig>,
  outputs: InferVirtualCustomElementNodeOptionsOutputs<GConfig>,
): void {
  const interfacesSet = new Set<string>();

  const addInterface = (
    name: string,
    context: string,
  ): void => {
    if (interfacesSet.has(name)) {
      throw new Error(`Interface '${name}' of '${context}' already exists`);
    } else {
      interfacesSet.add(name);
    }
  };

  (inputs as unknown as readonly [string][]).forEach(([name]: [string]): void => {
    addInterface(name, 'inputs');
  });

  (outputs as unknown as readonly string[]).forEach((name: string): void => {
    addInterface(name, 'outputs');
  });
}

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
// a.outputs.get('o-a');
// a.setReactiveInput('i-a', single(true))
// a.setReactiveOutput('i-a', (value: boolean) => {})
// a.setReactiveOutput('o-a', (value: number) => {})
