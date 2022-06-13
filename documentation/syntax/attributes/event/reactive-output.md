## Reactive output

[//]: # (TODO)

```html
<div
  $(output)="observer"
></div>
```

To listen to events emitted by an element, sent to an `Observer<Event>`, enclose it in parentheses, `()`.

The type of the event is fixed by the value in the parentheses.

It compiles to something similar to this:

```ts
div.addEventListener('click', observer);
```


### Example

```html
<div
  (click)="(event) => console.log(event)"
></div>
```

when the user clicks on the div -> output:

```text
MouseEvent
```

### Alternative syntax

```html
<div
  on-click="observer"
></div>
```

Instead of using parentheses you may prefix the event's type with `on-`.


