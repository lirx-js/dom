# Class List

```html
<div
  [class...]="observable$"
></div>
```

To define the **css classes of an element** updated by an `Observable<Set<string>>`, write `[class...]`.

Only the previously received classes are removed, and the new ones added, so it's possible to cumulate with `[class.my-class]`.

It's converted to something similar to this:

```ts
observable$((classes) => div.className = classes);
```

:::info

When possible, you should prefer the `[class.name]` [syntax](/docs/documentation/syntax/attributes/bind/reactive-class/),
as it tends to be more readable.

:::

## Example

```html
<div
  [class.enabled]="single(true)"
  [class...]="single(new Set('a', 'b', 'c'))"
></div>
```

Output:

```html
<div
  class="enabled a b c"
></div>
```

---

#### Alternative syntax

```html
<div
  bind-class---="observable$"
></div>
```

Instead of using `[class...]` you may write `bind-class---`.
