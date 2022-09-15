# Class

```html
<div
  [class.name]="observable$"
></div>
```

To toggle an **element's css class** whose state is updated by an `Observable<boolean>`, write `[class.name]`,
where `name` is the css class name your element will have if the observable sent `true`.

It's converted to something similar to this:

```ts
observable$((value) => div.classList.toggle('name', value));
```

:::info

You can cumulate many `[class.name]`, and you can cumulate them too with `[class...]`.

:::

## Example

```html
<div
  [class.class-a]="single(true)"
  [class.class-b]="single(false)"
></div>
```

Output:

```html
<div
  class="class-a"
></div>
```

---

#### Alternative syntax

```html
<div
  bind-class-name="observable$"
></div>
```

Instead of using square brackets you may prefix the class name with `bind-class-`.
