## Reactive input

```html
<my-element
  $[name]="observable"
></my-element>
```

To update an element's **input** whose value is updated by an `Observable<any>`, enclose it in square brackets prefixed by a dollar sign, `$[]`.
When the right-hand side (the Observable) emits a value, the input is set with this value. 

It compiles to something similar to this:

```ts
node.setReactiveInput('name', observable)
```

### Alternative syntax

```html
<my-element
  bind-input-name="observable"
></my-element>
```

Instead of using square brackets you may prefix the input's name with `bind-input-`.

