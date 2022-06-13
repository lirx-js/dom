## Reactive property

```html
<div
  [prop]="observable"
></div>
```

To update an element's property whose value is updated by an `Observable<any>`, enclose it in square brackets, `[]`.
When the right-hand side (the Observable), emits a value, the property is set with this value. 

It compiles to something similar to this:

```ts
observable((value) => div.prop = value);
```

[//]: # (It's possible to provide a *"path"* to reach sub-properties: )

[//]: # ()
[//]: # (```html)

[//]: # (<div)

[//]: # (  [propA.propB.propC]="observable")

[//]: # (></div>)

[//]: # (```)

[//]: # ()
[//]: # (Which compiles to something similar to this:)

[//]: # ()
[//]: # (```ts)

[//]: # (observable&#40;&#40;value&#41; => input.propA.propB.propC = value&#41;;)

[//]: # (```)

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

