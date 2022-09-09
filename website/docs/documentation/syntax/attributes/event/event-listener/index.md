# EventListener

```html
<div
  (click)="$observer"
></div>
```

To **listen to events** emitted by an element, sent to an `Observer<Event>`, enclose it in parentheses, `()`.

The *type* of the event is fixed by the value in the parentheses.

It's converted to something similar to this:

```ts
node.addEventListener('click', $observer);
```


## Example

```html
<div
  (click)="(event) => console.log(event)"
></div>
```

when the user clicks on the div -> output:

```text
MouseEvent
```

---

#### Alternative syntax

```html
<div
  on-click="$observer"
></div>
```

Instead of using parentheses you may prefix the event's type with `on-`.


