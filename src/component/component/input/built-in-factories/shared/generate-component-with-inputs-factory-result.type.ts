import { HTMLElementConstructor } from '../../../../../light-dom/types/html-element-constructor.type';
import {
  IComponentInputListToPropertyNameList,
  IComponentWithInputsFactoryResult,
  IGenericComponentInputList,
} from '../../component-with-inputs-factory';

export interface IGenerateComponentWithInputsFactoryResult<GBaseClass extends HTMLElementConstructor> {
  <GInputList extends IGenericComponentInputList>(
    names: IComponentInputListToPropertyNameList<GInputList>,
  ): IComponentWithInputsFactoryResult<GBaseClass, GInputList>;
}
