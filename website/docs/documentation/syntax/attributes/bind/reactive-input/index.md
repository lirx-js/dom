# Input

```html
<my-element
  $[name]="observable$"
></my-element>
```

To set a **custom element's input** whose value is updated by an `Observable<any>`, write `$[name]`, where `name` is the name of this input.

When the right-hand side (the Observable) emits a value, the input is set with this value. 

It's converted to something similar to this:

```ts
node.setReactiveInput('name', observable$);
```

---

#### Alternative syntax

```html
<my-element
  bind-input-name="observable$"
></my-element>
```

Instead of using square brackets you may prefix the input's name with `bind-input-`.

