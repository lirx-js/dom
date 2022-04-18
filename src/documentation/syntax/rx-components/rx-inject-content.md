## Template injection

```html
<rx-inject-content 
  content="observable"
></rx-inject-content>
```

To inject some content (`DocumentFragment | null`) into the DOM, use `rx-inject-content`.

It only has one attribute:

- `content`: the Observable which emits a DocumentFragment or null

It compiles to something similar to this:

```ts
nodeAppendChild(parentNode, createReactiveContentNode(observable));
```

### Example

```ts
const content = new DocumentFragment();
content.appendChild(new Text('Hello world !'))
const content$ = single(content);
```

```html
<rx-inject-content
  content="content$"
></rx-inject-content>
```

Output:

```html
Hello world !
```

