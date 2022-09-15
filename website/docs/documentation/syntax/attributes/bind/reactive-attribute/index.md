# Attribute

```html
<div
  [attr.name]="observable$"
></div>
```

To set an **element's attribute** whose value is updated by an `Observable<string | null>`, write `[attr.name]`,
where `name` is the name of the attribute.

If `null` is received, the attribute is removed. Else, if a `string` is received, the attribute is set to this value.

It's converted to something similar to this:

```ts
observable$((value) => div.setAttribute('name', value));
```

# Example

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

---

#### Alternative syntax

```html
<div
  bind-attr-name="observable$"
></div>
```

Instead of using square brackets you may prefix the attribute name with `bind-attr-`.
