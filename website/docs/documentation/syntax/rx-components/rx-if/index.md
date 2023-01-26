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

This is used to display **conditionally** an element or a node.

Under the hoods, it creates a virtual Node which:

- subscribes to `observable$`
- and injects `templateReferenceTrue` if it received *true*
- or injects `templateReferenceFalse` if it received *false*

:::note

The previously injected template is always removed from the DOM before the new one is appended.

:::

It has the following attributes:

- `condition`: the Observable to listen to
- `true`: the name of the template to inject if `condition` emitted *true*
- `false`: the name of the template to inject if `condition` emitted *false*

You may omit one of the template.
In this case, if the value matches the omitted template, the previous child nodes are removed and not replaced.
So it will result in nothing displayed, until the value changes for the other template.

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
<div>
  Hello world !
</div>
```

---

**[Example file](https://github.com/lirx-js/dom-examples/tree/main/src/syntax/rx-if/component/rx-if-example.component.ts)**


### Alternative syntaxes

##### Using \*if

```html
<tag-mame
  *if="observable$"
  ...otherAttributes
>
  ...content
</tag-mame>
```

<details>
  <summary>Which is equivalent to</summary>

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

</details>

##### Using rx-true and rx-false with in-place template

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


##### Using \*if-true and \*if-false

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


