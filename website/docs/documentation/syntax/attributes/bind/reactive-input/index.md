# Input

```html
<my-component
  $[name]="observable$"
></my-component>
```

To set a **custom element's input** whose value is updated by an `Observable<any>`, write `$[name]`, where `name` is the name of this input.

When the right-hand side (the Observable) emits a value, the input is set with this value. 

It's converted to something similar to this:

```ts
node.setReactiveInput('name', observable$);
```

#### Definition of a component's input

A *component's input* is a special property, used to provide some input data from a parent component to a child component.
We may think, for example, of a `app-progress` component, requiring a `progress` input (of type: `number`), to display a proportional progress bar.


#### Creating an input

Into the component file (`.ts`), the input may be defined like this:

```ts
interface IMyComponentConfig {
  inputs: [
    ['name', string],
  ];
}

export const MyComponent = createComponent<IMyComponentConfig>({
  name: 'my-component',
  inputs: [
    ['name'],
  ],
  init: (node: VirtualCustomElementNode<IMyComponentConfig>): void => {
    const name$ = node.inputs.get$('name');
    
    // then we may play with the observable 'name$' which reflects the data sent to the input 'name'
    name$((name: string) => {
      console.log('name', name);
    });
  },
});
```

:::note

A component may have many inputs, with different types and optional default values.

:::

---

#### Alternative syntax

```html
<my-component
  bind-input-name="observable$"
></my-element>
```

Instead of using square brackets you may prefix the input's name with `bind-input-`.

