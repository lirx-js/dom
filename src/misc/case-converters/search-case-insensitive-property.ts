/**
 * Searches and returns a case-insensitive property of an object
 */
export function searchCaseInsensitiveProperty(
  propertyKey: PropertyKey,
  object: any,
): PropertyKey | null {
  if (propertyKey in object) {
    return propertyKey;
  } else if (typeof propertyKey === 'symbol') {
    return null;
  } else {
    const lowerCaseName: string = (typeof propertyKey === 'number')
      ? String(propertyKey)
      : propertyKey.toLowerCase();
    for (const prop in object) {
      if (prop.toLowerCase() === lowerCaseName) {
        return prop;
      }
    }
    return null;
  }
}

export function searchCaseInsensitivePropertyOrThrow(
  propertyKey: PropertyKey,
  object: any,
): PropertyKey {
  const _propertyKey: PropertyKey | null = searchCaseInsensitiveProperty(propertyKey, object);
  if (_propertyKey === null) {
    throw new Error(`Missing property '${String(propertyKey)}'`);
  } else {
    return _propertyKey;
  }
}

/*-------------*/

export function searchCaseInsensitiveValue(
  input: string,
  values: ArrayLike<string>,
): string | null {
  const lowerCaseInput: string = input.toLowerCase();

  for (let i = 0, l = values.length; i < l; i++) {
    const value: string = values[i];
    if (value.toLowerCase() === lowerCaseInput) {
      return value;
    }
  }

  return null;
}

