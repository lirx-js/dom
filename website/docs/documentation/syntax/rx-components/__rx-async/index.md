### Promise based template injection: rx-async

[//]: # (TODO update syntax)

```html
<rx-async
  expression="observable"
  pending="templatePending"
  fulfilled="templateFulfilled"
  rejected="templateRejected"
></rx-async>
```

Creates a virtual Node which:

- subscribes to `observable`
- and injects `templatePending`, `templateFulfilled` or `templateRejected` according to the received value

**ℹ️ INFO:** the previous injected template is removed.

Attributes:

- `expression`: the Observable to listen to
- `pending`: the template to inject until the *expression* hasn't sent any value.
- `fulfilled`: the template to inject when the expression send a `complete` Notification
- `rejected`: the template to inject when the expression send an `error` Notification

`pending`, `fulfilled` and `rejected` are all optional, but you must provide at least one.

It's converted to something similar to this:

```ts
nodeAppendChild(parentNode, createReactiveAsyncNode(
  observable,
  templatePending,
  templateFulfilled,
  templateRejected,
));
```

**ℹ️ INFO:** you may retrieve the received value or error through the template variable `value`:

```html
<rx-template
  name="fulfilled"
  let-value
>
  Fulfilled: {{ value }}
</rx-template>
```

```html
<rx-template
  name="rejected"
  let-value
>
  Rejected: {{ value }}
</rx-template>
```

##### alternative syntaxes

###### using *async

```html
<tag-mame
  *async="observable"
  ...otherAttributes
>
  ...content
</tag-mame>
```

Which is equivalent to:

```html
<rx-template
  name="uuid"
>
  <tag-mame
    ...otherAttributes
  >
    ...content
  </tag-mame>
</rx-template>

<rx-async
  expression="observable"
  fulfilled="uuid"
></rx-async>
```

###### using rx-pending, rx-fulfilled and rx-rejected

```html
<rx-async
  expression="observable"
>
  <rx-pending>
    ...pendingContent
  </rx-pending>
  <rx-fulfilled>
    ...fulfilledContent
  </rx-fulfilled>
  <rx-rejected>
    ...rejectedContent
  </rx-rejected>
</rx-async>
```
