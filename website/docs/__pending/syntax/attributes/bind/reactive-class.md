## Reactive class

```html
<div
  [class.my-class]="observable"
></div>
```

To toggle an element's css class whose state is updated by an `Observable<boolean>`, write `[class.my-class]`,
where `my-class` is the css class name your element will have if the observable sent `true`.

It compiles to something similar to this:

```ts
observable((value) => div.classList.toggle('my-class', value));
```

### Example

```html
<div
  [class.my-class-a]="single(true)"
  [class.my-class-b]="single(false)"
></div>
```

Output:

```html
<div
  class="my-class-a"
></div>
```

### Alternative syntax

```html
<div
  bind-class-my-class="observable"
></div>
```

Instead of using square brackets you may prefix the class name with `bind-class-`.
