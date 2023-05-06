export function createKeyDoesNotExistError(
  key: string,
): Error {
  return new Error(`Key '${key}' does not exist`);
}
