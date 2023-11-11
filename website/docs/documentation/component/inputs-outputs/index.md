# Inputs and Outputs

Inputs and Outputs permits to interact and communicate with a component from outside of it.
This is a gateway to send and listen to values from a parent component and one of its child.

## From the child component

Let's begin from the point of view of the child component: we have to define some inputs and outputs to communicate with a parent.

We'll begin by an interface describing the inputs and outputs:

```ts
interface IInputComponentData {
  readonly value: Input<string>;
  readonly valueChange: Output<string>;
}
```

[Input](/docs/reference/input/) is a proxy for a [MulticastReplayLastSource](https://core.lirx.org/docs/reference/create-multicast-replay-last-source/).
It stores a data, and provides a `subscribe` (Observable) and `emit` (Observer) properties.

```ts
declare class Input<GValue> {
  constructor(...initialValue: [] | [GValue]);

  readonly emit: IObserver<GValue>;
  readonly subscribe: IObservable<GValue>;
  readonly value: GValue;
}
```

[Output](/docs/reference/output/) is a proxy for a [MulticastSource](https://core.lirx.org/docs/reference/create-multicast-source/).
Unlike an `Input`, it doesn't store any data, but provides too a `subscribe` and `emit` properties.

```ts
declare class Output<GValue> {
  readonly emit: IObserver<GValue>;
  readonly subscribe: IObservable<GValue>;
}
```

Then, we'll build these inputs and outputs into the `componentData` function:

```ts
componentData: (): IInputComponentData => ({
  value: input<string>('' /*let's initialize it with an empty string */), // or new Input<string>('')
  valueChange: output<string>(), // or new Output<string>()
}),
```

Finally, into the `templateData` function, we get a reference on these inputs/outputs and play with them:

```ts
templateData: (node: VirtualComponentNode<HTMLElement, IInputComponentData>): void => {
  // gets the input `value` as an Observable
  const value$ = node.input$('value');
  // gets the output `valueChange` as an Observer
  const $valueChange = node.$output('valueChange');
  
  // maps incomming value to `${value}->changed`
  const newValue$ = map$$(value$, value => `${value}->changed`);
  
  // when this node is connected to the DOM
  node.onConnected(() => {
    // pipes newValue$ into $valueChange
    return newValue$($valueChange);
  });
},
```

In this example, we change the values received by the `value` input (appends the `->changed` string), and emits them into the output `valueChange`.

## From the parent component

Let's switch to the parent component's `reactive-template`:

```html
<app-input-component
  $[value]="$.value$"
  $(valueChange)="$.$value"
></app-input-component>
```

Here, we may bind the inputs with the special attribute `$[inputName]`, where `inputName` is the name of the input.
The right side is an Observable, whose content is bind to this input.
We may see it as: `$.value$(node.$input('value'))`.

The output is similar but using parenthesis instead of square brackets `$(outputName)`, and the right side is an Observer.

:::note

Inputs and Outputs are automatically unbound when the component is not connected to the DOM, and rebound when it is connected,
ensuring maximum performances.

:::

You'll get there more details about the syntax of [Input](/docs/documentation/syntax/attributes/bind/reactive-input/)
and [Output](/docs/documentation/syntax/attributes/event/reactive-output/).

Finally, the parent component have this interface for the template's data:

```ts
interface ITemplateData {
  readonly value$: IObservable<string>;
  readonly $value: IObserver<string>;
}
```

And we may define these data from the `templateData` function:

```ts
templateData: (node: VirtualComponentNode<HTMLElement, any>): ITemplateData => {
  // ... here we setup value$ and $value ...

  return {
    value$,
    $value,
  };
},
```

## Conclusion

Inputs and Outputs are the way of communication between your components. 
There is no need to play with attributes, nor events, like we could do with `customElements`.
Moreover, any kind of data may be passed.

So unleash all the power of your components without limits ⚡.








