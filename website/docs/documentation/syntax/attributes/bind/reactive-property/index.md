# Property

```html
<div
  [prop]="observable$"
></div>
```

To update an **element's property** whose value is updated by an `Observable<any>`, enclose it in square brackets, `[]`.
When the right-hand side (the Observable), emits a value, the property is set with this value. 

It's converted to something similar to this:

```ts
observable$((value) => div.prop = value);
```


## Example

```html
<div
  [innerHTML]="single('<strong>abc</strong>')"
></div>
```

Output:

```html
<div><strong>abc</strong></div>
```

---

#### Alternative syntax

```html
<div
  bind-prop="observable$"
></div>
```

Instead of using square brackets you may prefix the property with `bind-`.

