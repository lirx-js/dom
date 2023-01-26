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

A template is a **portion of html that can be re-used later**.
This is a really important block and concept of this library,
as it is usually provided to other `rx-` components to generate repetitive or conditional parts of the application.

To create such a template, use `rx-template`.

It has the following attributes:

- `name`: the name of the template
- `let-XXX`: declare a variable for this template

It's converted to something similar to this:

```ts
const template_templateReference = (
  parentNode: VirtualDOMNode,
  {
    var1,
    var2
  },
): void => {
  // here "content" represents the content of the template
  return content.attach(parentNode);
};
```

:::note

Usually, you won't have to create directly a template, as the other `rx-` components already have a way to declare such templates directly as child elements or commands.
However, in some cases it may be useful if you prefer to provide your templates with names.

:::

:::info

You can retrieve a reference to a Template as a variable by prefixing its name with `template_`
(ex: `template_templateReference`).

:::

:::caution

html attribute's names are case-insensitive, so the `let` properties are converted from `dash-case`
to `camelCase`. Example: `let-my-var="myNewVar"` => `{ myVar: myNewVar }`

:::
