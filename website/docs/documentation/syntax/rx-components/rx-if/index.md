# rx-if

```html
<rx-if
  condition="observable$"
  true="templateReferenceTrue"
  false="templateReferenceFalse"
></rx-if>
```

Short syntax:

```html
<tag-mame *if="observable$">
  ...content
</tag-mame>
```

Creates a virtual Node which:

- subscribes to `observable$`
- and injects `templateReferenceTrue` if it received *true*
- or injects `templateReferenceFalse` if it received *false*

:::note

The previously injected template is removed, before the new one is appended to the DOM.

:::

It has the following attributes:

- `condition`: the Observable to listen to
- `true`: the name of the template to inject if `condition` emitted *true*
- `false`: the name of the template to inject if `condition` emitted *false*

:::note

You may omit one of the template.

:::

It's converted to something similar to this:

```ts
new VirtualReactiveIfNode(
  observable$,
  templateReferenceTrue,
  templateReferenceFalse,
).attach(parentNode);
```

## Example

```html
<div *if="single(true)">
  Hello world !
</div>
```

Output:

```html
Hello world !
```

### Alternative syntaxes

##### Using *if

```html
<tag-mame
  *if="observable$"
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

<rx-if
  condition="observable$"
  true="uuid"
></rx-if>
```

##### Using rx-true and rx-false

```html
<rx-if
  condition="observable$"
>
  <rx-true>
    ...trueContent
  </rx-true>
  <rx-false>
    ...falseContent
  </rx-false>
</rx-if>
```


##### Using *if-true and *if-false

```html
<rx-if
  condition="observable$"
>
  <tag-mame-true
    *if-true
    ...otherAttributesTrue
  >
    ...contentTrue
  </tag-mame-true>
  <tag-mame-false
    *if-false
    ...otherAttributesFalse
  >
    ...contentFalse
  </tag-mame-false>
</rx-if>
```


