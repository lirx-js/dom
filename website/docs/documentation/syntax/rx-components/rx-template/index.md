# rx-template

```html
<rx-template
  name="templateReference"
  let-var1
  let-var2
>
  ...content
</rx-template>
```

To create a reusable template to inject later, use `rx-template`.

It has the following attributes:

- `name`: the name of the template
- `let-XXX`: declare a variable for this template

It's converted to something similar to this:

```ts
const templateReference = (parentNode: VirtualDOMNode, { var1, var2 }): void => content.attach(parentNode);
```

:::info

You can retrieve a reference to a Template as a variable by prefixing its name with `template_`
(ex: `template_templateReference`).

:::

:::caution

html attribute's names are case-insensitive, so the `let` properties are converted from `dash-case`
to `camelCase`. Example: `let-my-var="myNewVar"` => `{ myVar: myNewVar }`

:::
