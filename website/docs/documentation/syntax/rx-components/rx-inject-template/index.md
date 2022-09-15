# rx-inject-template

```html
<rx-inject-template
  template="templateReference"
  let-var1="data1"
  let-var2="data2"
></rx-inject-template>
```

To inject a template, use `rx-inject-template`.

It has the following attributes:

- `template`: the name of the template to inject
- `let-XXX`: the variables to provide to this template

It's converted to something similar to this:

```ts
templateReference(
  parentNode,
  { var1: data1, var2: data2 },
);
```

## Example

```html
<rx-template
  name="helloTemplate"
  let-name
>
  Hello {{ name }}!
</rx-template>

<rx-inject-template
  template="helloTemplate"
  let-name="single('Alice')"
></rx-inject-template>
```

Output:

```html
Hello Alice!
```

