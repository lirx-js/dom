# Text

```html
{{ observable$ }}
```

To create a **text Node** whose content is updated by an `Observable<string>`, put this Observable in double curly brackets, `{{}}`.

It's converted to something similar to this:

```ts
observable$((value) => text.value = value);
```


## Example

```html
Hello {{ single('world') }} !
```

Output:

```html
Hello world !
```

---

**[Example file](https://github.com/lirx-js/dom-examples/tree/main/src/syntax/reactive-text/component/reactive-text-example.component.ts)**
