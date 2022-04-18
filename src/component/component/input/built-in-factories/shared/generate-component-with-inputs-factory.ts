import { HTMLElementConstructor } from '../../../../../light-dom/types/html-element-constructor.type';
import {
  componentWithInputsFactory,
  IComponentInputListToPropertyNameList,
  IComponentWithInputsFactoryResult,
  IGenericComponentInputList,
} from '../../component-with-inputs-factory';
import { IGenerateComponentWithInputsFactoryResult } from './generate-component-with-inputs-factory-result.type';

export function generateComponentWithInputsFactory<GBaseClass extends HTMLElementConstructor>(
  baseClass: GBaseClass,
): IGenerateComponentWithInputsFactoryResult<GBaseClass> {
  return <GInputList extends IGenericComponentInputList>(
    names: IComponentInputListToPropertyNameList<GInputList>,
  ): IComponentWithInputsFactoryResult<GBaseClass, GInputList> => {
    return componentWithInputsFactory<GBaseClass, GInputList>(baseClass, names);
  };
}

