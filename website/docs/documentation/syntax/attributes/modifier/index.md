# Modifier

---

:::caution

Using a `IVirtualDOMNodeModifier` gives you a very fine control on your elements, however,
this may easily lead to **unsafe or sensitive operations**.
Consequently, when possible you should think first to alternatives.

:::

---

```html
<div
  #name="value"
></div>
```

The purpose of a Modifier is to **modify** directly a **[VirtualDOMNode](/docs/reference/virtual-dom-node/)**.
This is a powerful tool, **so you have to use it with extreme caution**.

It invokes a `IVirtualDOMNodeModifier` with the specified *name*:

```ts
interface IVirtualDOMNodeModifierFunction<GValue, GNode extends VirtualDOMNode> {
  (
    node: VirtualDOMNode,
    value: GValue,
  ): GNode;
}
```

This function has two arguments:

- a VirtualDOMNode: the current VirtualDOMNode. We can modify its contents, its properties, its attributes, etc...
- a value: usually used as a config object for our modifier.

And it returns a new VirtualDOMNode or the provided one.

---

To create a `IVirtualDOMNodeModifier`, we may use the function `createVirtualDOMNodeModifier`:

```ts
const tooltipModifier = createVirtualDOMNodeModifier('tooltip', (node: VirtualDOMNode, value: string): VirtualDOMNode => {
  if (node instanceof VirtualCustomElementNode) {
    node.elementNode.title = value;
  }
  return node;
});
```

Then we may use it into some `reactive-html`:

```html
compileReactiveHTMLAsComponentTemplate({
  html: `
    <div #tooltip="'hello world !'">
      some content
    </div>
  `,
  modifiers: [
    tooltipModifier,
  ],
});
```

It's converted to something similar to this:

```ts
// here 'node' is the div
const newNode = applyNodeModifier('tooltip', node, 'hello world !');
```

Which expands to:

```ts
const newNode = ((node: VirtualDOMNode, value: string): VirtualDOMNode => {
  if (node instanceof VirtualCustomElementNode) {
    node.elementNode.title = value;
  }
  return node;
})(element, 'hello world !');
```

---

#### Alternative syntax

```html
<div
  mod-name="value"
></div>
```

Instead of prefixing it with `#` you may prefix it with `mod-`.


