import { IGenericAsymmetricInput, AsymmetricInput } from './asymmetric-input.class';
import { IGenericInput, Input } from './input.class';

export type InferDataInputs<GData extends object> = {
  [GKey in keyof GData as (GData[GKey] extends (IGenericInput | IGenericAsymmetricInput)
    ? GKey
    : never)]: GData[GKey] extends (IGenericInput | IGenericAsymmetricInput)
    ? GData[GKey]
    : never;
};

export type InferDataInputKeys<GData extends object> = keyof InferDataInputs<GData>;

export type InferDataInputGetValue<GInput> =
  GInput extends AsymmetricInput<any, infer GValue>
    ? GValue
    : (
      GInput extends Input<infer GValue>
        ? GValue
        : never
      )
  ;

export type InferDataInputSetValue<GInput> =
  GInput extends AsymmetricInput<infer GValue, any>
    ? GValue
    : (
      GInput extends Input<infer GValue>
        ? GValue
        : never
      )
  ;
