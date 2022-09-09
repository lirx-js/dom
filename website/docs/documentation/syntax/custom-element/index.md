# Custom element

```html
<app-component>
  <rx-slot name="slot-a">content A</rx-slot>
  <div *slot="slot-b">content B</div>
  content C
</app-component>
```

```html
<rx-inject-slot name="slot-a">placeholder A</rx-inject-slot>
<rx-inject-slot name="*">placeholder A</rx-inject-slot>
```



