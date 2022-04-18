## Reactive class list

```html
<div
  [class...]="observable"
></div>
```

To define the css classes of an element updated by an `Observable<Set<string>>`, write `[class...]`.

Only the previously received classes are removed, and the new ones added, so it's possible to cumulate with `[class.my-class]`.

It compiles to something similar to this:

```ts
observable((classes) => div.className = classes);
```

### Example

```html
<div
  [class.enabled]="single(true)"
  [class....]="single(new Set('a', 'b', 'c'))"
></div>
```

Output:

```html
<div
  class="enabled a b c"
></div>
```


### Alternative syntax

```html
<div
  bind-class---="observable"
></div>
```

Instead of using `[class....]` you may write `bind-class---`.
