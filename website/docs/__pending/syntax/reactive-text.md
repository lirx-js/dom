## Reactive text

```html
{{ observable }}
```

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
