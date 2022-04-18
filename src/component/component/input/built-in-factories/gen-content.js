(() => {
  const lines = [];
  Object.getOwnPropertyNames(window).forEach((key) => {
    if (key.startsWith('HTML')) {
      lines.push(...[
        `export function ${key}WithInputs<GInputList extends IGenericComponentInputList>(`,
        `  names: IComponentInputListToPropertyNameList<GInputList>,`,
        `): IComponentWithInputsFactoryResult<typeof ${key}, GInputList> {`,
        `  return componentWithInputsFactory<typeof ${key}, GInputList>(${key}, names);`,
        `}`,
        ``,
      ]);
    }
  });

  const content = lines.join('\n');
  console.log(content);
  // navigator.clipboard.writeText(content);
})();
