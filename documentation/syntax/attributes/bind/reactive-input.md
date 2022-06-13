## Reactive input

[//]: # (TODO)

```html
<div
  $[input]="observable"
></div>
```

To update an element's input whose value is updated by an `Observable<any>`, enclose it in square brackets prefixed by a dollar sign, `$[]`.
When the right-hand side (the Observable), emits a value, the input is set with this value. 

It compiles to something similar to this:

```ts
observable((value) => div.prop = value);
```

### Example

```html
<div
  [innerHTML]="single('abc')"
></div>
```

Output:

```html
<div>abc</div>
```

### Alternative syntax

```html
<div
  bind-prop="observable"
></div>
```

Instead of using square brackets you may prefix the property with `bind-`.

[//]: # (```html)

[//]: # (<div)

[//]: # (  bind-propA-propB-propC="observable")

[//]: # (></div>)

[//]: # (```)

