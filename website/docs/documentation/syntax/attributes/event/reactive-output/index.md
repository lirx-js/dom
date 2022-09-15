# Output

```html
<my-element
  $(name)="$observer"
></my-element>
```

To listen to values emitted by a **custom element's output**, sent to an `Observer<any>`, write `$(name)`, where `name` is the name of this output.

When the output emits a value, the right-hand side (the Observer) receives this value.

It's converted to something similar to this:

```ts
node.setReactiveOutput('name', $observer);
```

---

#### Alternative syntax

```html
<div
  on-output-name="$observer"
></div>
```

Instead of using parentheses you may prefix the output's name with `on-output`.


