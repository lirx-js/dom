# Style List

```html
<div
  [style...]="observable$"
></div>
```

To define the **style of an element** updated by an `Observable<IStylePropertiesMap>`, write `[style...]`.

Only the previously received styles are removed, and the new ones added, so it's possible to cumulate with `[style.prop-name]`.

It's converted to something similar to this:

```ts
observable$((styles) => div.setAttribute('style', styles));
```

:::info

When possible, you should prefer the `[style.name]` [syntax](/docs/documentation/syntax/attributes/bind/reactive-style/),
as it tends to be more readable.

:::

## Example

```html
<div
  [style.font-size]="single('14px')"
  [style...]="single(new Map([['line-height', { value: '20px' }]))"
></div>
```

Output:

```html
<div
  style="font-size: 14px; line-height: 20px"
></div>
```

---

#### Alternative syntax

```html
<div
  bind-style---="observable$"
></div>
```

Instead of using `[style...]` you may write `bind-style---`.
