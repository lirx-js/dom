import { isNullish } from '@lirx/utils';
import { Input } from './input.class';

export function isInput<GValue>(
  input: unknown,
): input is Input<GValue> {
  return !isNullish(input)
    && (input instanceof Input);
}
