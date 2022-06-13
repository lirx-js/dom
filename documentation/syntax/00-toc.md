# Reactive HTML syntax

`reactive-html` is the name of the templating language of `@lirx/dom`.

It may be compiled to plain javascript with the function `compileReactiveHTMLAsComponentTemplate`.

### Example

[//]: # (TODO)

```ts
@Component({
  name: 'app-hello-world',
  template: compileReactiveHTMLAsComponentTemplate({
    html: 'Hellow world !',
  }),
})
export class AppHelloWorldComponent extends HTMLElement {}
```


### Documentation

Here you can find the complete syntax to write your own `reactive-html`:

- [text](reactive-text.md)
- bind:
  - [property](attributes/bind/reactive-property.md)
  - [class](attributes/bind/reactive-class.md)
  - [class list](attributes/bind/reactive-class-list.md)
  - [style](attributes/bind/reactive-style.md)
  - [style list](attributes/bind/reactive-style-list.md)
  - [attribute](attributes/bind/reactive-attribute.md)
  - [input](attributes/bind/reactive-input.md)
- [event listener](attributes/event/event-listener.md)
- [output](attributes/event/reactive-output.md)
- [node modifier](attributes/modifier/node-modifier.md)
- rx-components:
  - [rx-template](rx-components/rx-template.md)
  - [rx-inject-template](rx-components/rx-inject-template.md)
  - [rx-if](rx-components/rx-if.md)
  - [rx-switch](rx-components/rx-switch.md)
  - [rx-for-loop](rx-components/rx-for-loop.md)
  - [rx-container](rx-components/rx-container.md)
  - [rx-script](rx-components/rx-script.md)


Everything which is not a special `reactive-html` syntax is interpreted as plain HTML.
