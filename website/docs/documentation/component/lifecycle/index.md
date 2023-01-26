# Lifecycle

Listening and using properly the lifecycle of a component, is a task **requiring a special attention**.
Indeed, if this part is poorly managed, it will usually lead to memory leaks or inconsistent states of the application.
This is something we want to avoid at all costs,
if we want to keep a **good user experience**, and a functional application.

We'll use illustrate this particular concern, with a component displaying the current date every 1000ms.

## Manual lifecycle handling

Let's start by remembering that all the internal logic of the component,
must be handled from the `init` function defined when calling `createComponent`:

```ts
export const MyComponent = createComponent<IConfig>({
  // ...other properties
  init: (node: VirtualCustomElementNode<IConfig>): void => {
    // here we'll manage the node's state, and all the logic of the component
  },
});
```

A naive solution would consist of using a `setInterval` and logging the result:

```ts
export const MyComponent = createComponent<IConfig>({
  // ...other properties
  init: (node: VirtualCustomElementNode<IConfig>): void => {
    const logDate = () => {
      console.log('date', new Date().toString());
    };
    setInterval(logDate, 1000);
  },
});
```

However, in this example, if the component is removed from the DOM, the `setInterval` **won't stop**.
It will continue to log the date, until the user refresh or close the app.
So we have to find a solution to start this timer only when the component is connected to the DOM,
and stop it when it is disconnected.

:::note

A component is said connected to the DOM, when it has the root document (`document`) as a parent.

:::

:::info

Actually, **every** *async tasks* happening in the context of the component **must** listen to the component's "connected" state,
and be aborted/stopped when the component leaves the DOM.
If not, it will create **unexpected behaviours** as seen earlier.

:::

Hopefully, the framework has the perfect solution to this problem: [Observables](https://core.lirx.org).
Indeed, cancellation if one of the main concern of Reactive Programming, and is one of the essential bricks of `@lirx/dom`.

The init function receives a single parameter `node` of type [VirtualCustomElementNode](/docs/reference/virtual-custom-element-node/).
This object contains many properties and methods, including some to play with the component's lifecycle:


```ts
interface Component {
  readonly isConnected: boolean;
  readonly isConnected$: IObservable<boolean>;
  
  onConnected$<GValue>(
    observable: IObservable<GValue>,
  ): IObservable<GValue>;
}
```

The readonly `isConnected` property returns true if the node is connected to the DOM, and false otherwise.
However, because this "connected" state changes over time when the component is appended and removed from the DOM,
we'll prefer to user the Observable `isConnected$`:

```ts
export const MyComponent = createComponent<IConfig>({
  // ...other properties
  init: (node: VirtualCustomElementNode<IConfig>): void => {
    const logDate = () => {
      console.log('date', new Date().toString());
    };

    let timer: any;
    node.isConnected$((connected: boolean) => {
      if (connected) {
        timer = setInterval(logDate, 1000);
      } else {
        clearInterval(timer);
      }
    });
  },
});
```

But, as said earlier, `@lirx/dom` **works better with Observables**.
Thus, it exists an inline method called `onConnected$`, to play with Observables and manage their lifecycle.
This function returns an Observable, sending the values given by `observable` (the argument of the function),
**only when the component is connected to the root document**.

<details>
  <summary>internally onConnected$ does:</summary>

```ts
onConnected$<GValue>(
  observable: IObservable<GValue>,
): IObservable<GValue> {
  return switchMapObservable(this.isConnected$, (connected: boolean): IObservable<GValue> => {
    return connected
      ? observable
      : empty<GValue>();
  });
}
```

</details>

In consequence, we may reduce our previous exemple, in just a few lines of code:

```ts
import { interval } from '@lirx/core';
// ...
export const MyComponent = createComponent<IConfig>({
  // ...other properties
  init: (node: VirtualCustomElementNode<IConfig>): void => {
    node.onConnected$(interval(1000))(() => {
      console.log('date', new Date().toString());
    });
  },
});
```

This is where the beauty of Reactive Programming shines.
We may handle easily any async task, like: timers, promises, http requests, user events, etc... 
With automatic support of cancellation when using the method `onConnected$`.

## Automatic lifecycle handling

What about the Observables used into the template ?

Well, `@lirx/dom` takes care to subscribe or unsubscribe to them, when the corresponding node in the DOM
is connected or disconnected.

For example, `{{ $.date$ }}` creates an underlying [Text node](https://developer.mozilla.org/en-US/docs/Web/API/Text),
whose content is updated with the values sent by the Observable `$.date$`.
Then, it is subscribed automatically when the Text node is connected to the DOM, and unsubscribed when disconnected.

As a consequence, it's not necessary to wrap the Observables put in `IData` with the method `onConnected$`.

```ts
import { interval } from '@lirx/core';
// ...
export const MyComponent = createComponent<IConfig>({
  // ...other properties
  template: compileReactiveHTMLAsComponentTemplate({
    html: '{{ $.date$ }}',
  }),
  init: (node: VirtualCustomElementNode<IConfig>): IData => {
    const date$ = map$$(interval(1000), () => {
      return new Date().toString();
    });
    
    return {
      date$,
    };
  },
});
```

Therefore, the usage of `onConnected$` **should be limited to only a few cases**,
when we have some logic, which doesn't impact the template of the component.

## Conclusion

As seen during this tutorial, managing with caution the lifecycle of the component is an essential part,
if we want to avoid inconsistent applications.
Hopefully, using Observables allows us to handle async ressources like a breeze,
instead of having to look after each of them manually.
