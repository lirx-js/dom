const OBJECT_PROTOTYPE = Object.getPrototypeOf({});

export function* getObjectProperties(
  input: any,
): Generator<PropertyKey, void, undefined> {
  if (
    (input !== null)
    && (input !== void 0)
    && (input !== OBJECT_PROTOTYPE)
  ) {
    yield* Object.getOwnPropertyNames(input);
    yield* Object.getOwnPropertySymbols(input);
    yield* getObjectProperties(Object.getPrototypeOf(input));
  }
}
