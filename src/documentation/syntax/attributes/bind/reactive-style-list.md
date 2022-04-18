## Reactive style list

```html
<div
  [style...]="observable"
></div>
```

To define the style of an element updated by an `Observable<IStylesMap>`, write `[style...]`.

Only the previously received styles are removed, and the new ones added, so it's possible to cumulate with `[style.prop-name]`.

It compiles to something similar to this:

```ts
observable((styles) => div.setAttribute('style', styles));
```

### Example

```html
<div
  [style.font-size]="single('14px')"
  [style....]="single(new Map([['line-height', { value: '20px' }]))"
></div>
```

Output:

```html
<div
  style="font-size: 14px; line-height: 20px"
></div>
```


### Alternative syntax

```html
<div
  bind-style---="observable"
></div>
```

Instead of using `[style....]` you may write `bind-style---`.
