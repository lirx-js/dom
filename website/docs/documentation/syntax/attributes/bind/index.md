# Bind


**Bind attributes** are a category of attributes wrapped in square brackets, `[]`,
whose right hand side (the attributes' value) is an Observable updating the "properties" of the Element.

They look like this:

```html
<div
  [name]="observable$"
></div>
```


When the Element is **connected** to the DOM, the Observable is subscribed,
and its incoming values will change the element's properties.
