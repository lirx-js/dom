## For loop template injection

Preferred syntax:

```html

<tag-name *for="let item of itemsObservable; index as i; trackBy: trackByFn">
  ...content
</tag-name>
```

Alternative:

```html

<rx-for-loop
  items="itemsObservable"
  template="templateReference"
  track-by="trackByFunction"
></rx-for-loop>
```

Creates a virtual Node which:

- subscribes to `itemsObservable`
- and injects the template `templateReference` for each received values

**ℹ️ INFO:** the virtual Node take care to optimize the DOM and the rendering process (re-use nodes if possible).

Attributes:

- `items`: the Observable to listen to
- `template`: the name of the template to inject for each values
- `track-by` (optional): a trackByFunction to known which nodes may be re-used

It compiles to something similar to this:

```ts
new VirtualReactiveForLoopNode(
  itemsObservable,
  templateReference,
  { tackBy: trackByFunction },
).attach(parentNode);
```

### Example

```html

<div *for="let item of of('a', 'b', 'c'); index as i">
  #{{ i }} : {{ item }}
</div>
```

Output:

```html

<div>
  #0 : a
</div>
<div>
  #1 : b
</div>
<div>
  #2 : c
</div>
```

### Alternative syntaxes

##### Using *for

```html

<tag-name
  *for="let item of items; index as i; trackBy: trackByFn"
  ...otherAttributes
>
  ...content
</tag-name>
```

Which is equivalent to:

```html

<rx-template
  name="uuid"
  let-item="item"
  let-index="i"
>
  <tag-mame
    ...otherAttributes
  >
    ...content
  </tag-mame>
</rx-template>

<rx-for-loop
  items="items"
  template="uuid"
  track-by="trackByFn"
></rx-for-loop>
```


