## Reactive attribute

```html
<div
  [attr.aria-label]="observable"
></div>
```

To set an element's attribute whose value is updated by an `Observable<string | null>`, write `[attr.attribute-name]`,
where `attribute-name` is the name of the attribute.

If `null` is received, the attribute is removed. Else, if a `string` is received, the attribute is set to this value.

It compiles to something similar to this:

```ts
observable((value) => div.setAttribute('aria-label', value));
```

### Example

```html
<div
  [attr.aria-label]="single('my-label')"
></div>
```

Output:

```html
<div
  aria-label="my-label"
></div>
```

### Alternative syntax

```html
<div
  bind-attr-aria-label="observable"
></div>
```

Instead of using square brackets you may prefix the attribute name with `bind-attr-`.
