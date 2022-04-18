import { createNetworkErrorFromResponse } from '@lirx/core';
import { stringOrURLToString } from '../../../misc/types/string-or-url-to-string';
import { IStringOrURL } from '../../../misc/types/string-or-url.type';
import { compileReactiveCSSAsComponentStyle } from '../compile/compile-reactive-css-as-component-style';

export function loadAndCompileReactiveCSSAsComponentStyle(
  url: IStringOrURL,
): Promise<HTMLStyleElement> {
  return fetch(stringOrURLToString(url))
    .then((response: Response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw createNetworkErrorFromResponse(response);
      }
    })
    .then((content: string) => {
      return compileReactiveCSSAsComponentStyle(content);
    });
}
