const LOWER_CASE_OBJECT_KEYS_MAP = new WeakMap<object, ReadonlyMap<string, string>>();

export function getLowerCaseObjectKeysMap(
  input: object,
): ReadonlyMap<string, string> {
  let map: ReadonlyMap<string, string> | undefined = LOWER_CASE_OBJECT_KEYS_MAP.get(input);
  if (map === void 0) {
    // console.log('gen map for', input);

    const entries: [string, string][] = [];
    for (const key in input) {
      entries.push([
        key.toLowerCase(),
        key,
      ]);
    }

    map = new Map<string, string>(entries);

    LOWER_CASE_OBJECT_KEYS_MAP.set(input, map);
  }
  return map;
}
