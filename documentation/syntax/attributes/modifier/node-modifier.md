## Node modifier

```html
<div
  #name="value"
></div>
```

An `node-modifier` is a function that takes a Node as input and some optional arguments. It may:

- modify the Node content, its properties, its attributes, etc...
- generate a new node, with a completely different structure (and/or even a different type)

Then it returns this Node or the created one.


⚠️ using an `node-modifier` gives you a very fine control of your elements, however,
this may easily lead to **unsafe or sensitive operations**.
Consequently, when possible you should think first to alternatives.

To create an `node-modifier` for an HTMLElement, we may use the `createHTMLElementModifier` function:

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
})
```

It compiles to something similar to this:

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

### Alternative syntax

```html
<div
  mod-name="[...args]"
></div>
```

Instead of prefixing it with `#` you may prefix it with `mod-`.


