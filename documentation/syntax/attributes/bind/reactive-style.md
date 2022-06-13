## Reactive style

```html
<div
  [style.font-size]="observable"
></div>
```

To set an element's css style whose value is updated by an `Observable<IStylePropertyLike>`, write `[style.property-name]`,
where `property-name` is the style's property name.

If `null` is received, the property is removed. Else, the property is converted to a string and applied.

It compiles to something similar to this:

```ts
observable((value) => div.style.setProperty('font-size', value));
```

### Example

```html
<div
  [style.font-size]="single('14px')"
></div>
```

Output:

```html
<div
  style="font-size: 14px"
></div>
```

### Alternative syntax

```html
<div
  bind-style-font-size="observable"
></div>
```

Instead of using square brackets you may prefix the style's property name with `bind-style-`.
