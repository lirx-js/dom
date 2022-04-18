## Conditional switch template injection

```html
<rx-switch
  expression="observable"
>
  <rx-switch-case
    case="valueA"
    template="templateReferenceA"
  ></rx-switch-case>
  <rx-switch-case
    case="valueB"
    template="templateReferenceB"
  ></rx-switch-case>
  <rx-switch-default
    template="templateReferenceC"
  ></rx-switch-default>
</rx-switch>
```

Creates a virtual Node which:

- subscribes to `observable`
- and injects `templateReferenceA`, `templateReferenceB` or `templateReferenceC` according to the received value

**ℹ️ INFO:** the previous injected template is removed.

Attributes:

- rx-switch
  - `expression`: the Observable to listen to
- rx-switch-case
  - `case`: the value for this template
  - `template`: the template reference to inject
- rx-switch-default
  - `template`: the template reference to inject

**ℹ️ INFO:** you may omit `rx-switch-default`.

It compiles to something similar to this:

```ts
nodeAppendChild(parentNode, createReactiveSwitchNode(observable, new Map([
  [valueA, templateReferenceA],
  [valueB, templateReferenceB],
]), templateReferenceC));
```

### Example

```html
<rx-switch expression="single('done')">
  <div *switch-case="'pending'">
    Pending...
  </div>
  <div *switch-case="'done'">
    Done !
  </div>
</rx-switch>
```

Output:

```html
<div>
  Done !
</div>
```

### Alternative syntaxes

##### Using *switch-case and *switch-default

```html
<rx-switch
  expression="observable"
>
  <tag-name-a
    *switch-case="valueA"
    ...otherAttributesA
  >
    ...contentA
  </tag-name-a>
  <tag-name-b
    *switch-case="valueB"
    ...otherAttributesB
  >
    ...contentB
  </tag-name-b>
  <tag-name-c
    *switch-default
    ...otherAttributesC
  >
    ...contentC
  </tag-name-c>
</rx-switch>
```

Which is equivalent to:

```html
<rx-template
  name="uuidA"
>
  <tag-mame-a
    ...otherAttributesA
  >
    ...contentA
  </tag-mame-a>
</rx-template>

<rx-template
    name="uuidB"
>
  <tag-mame-b
    ...otherAttributesB
  >
    ...contentB
  </tag-mame-b>
</rx-template>

<rx-template
  name="uuidC"
>
  <tag-mame-c
    ...otherAttributesC
  >
    ...contentC
  </tag-mame-c>
</rx-template>

<rx-switch
  expression="observable"
>
  <rx-switch-case
    case="valueA"
    template="uuidA"
  ></rx-switch-case>
  <rx-switch-case
    case="valueB"
    template="uuidB"
  ></rx-switch-case>
  <rx-switch-default
    template="uuidC"
  ></rx-switch-default>
</rx-switch>
```

