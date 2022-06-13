## Virtual container

```html
<rx-container>
  ...content
</rx-container>
```

Creates a virtual node to wrap other nodes.

It only accepts `*command` attributes.

### Example

```html
List of names:
<rx-container
  *for="let item of of('Alice', 'Bob', 'Carol')"
>
  {{ single(item) }},
</rx-container>
```

Output:

```html
List of names: Alice, Bob, Carol
```

**NOTE:** as you may see there's no element around the text nodes.


