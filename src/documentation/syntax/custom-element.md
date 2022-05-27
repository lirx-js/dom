## Custom element

```html
<app-component>
  <rx-slot name="slot-a">content A</rx-slot>
  <div *slot="slot-b">content B</div>
  content C
</app-component>
```

```html
<rx-inject-slot name="slot-a">placeholder A</rx-inject-slot>
<rx-inject-slot name="*">placeholder A</rx-inject-slot>
```


[//]: # (TODO doc)

To create a text Node whose content is updated by an `Observable<string>`, put this Observable in double curly brackets, `{{}}`.

It compiles to something similar to this:

```ts
observable((value) => text.value = value);
```


### Example

```html
Hello {{ single('world') }} !
```

Output:

```html
Hello world !
```
