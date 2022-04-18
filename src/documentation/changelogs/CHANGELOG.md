## 2.1.0 (unreleased)

### What's new ?

> The transpiling engine as been improved

It allows the AOT transpiler to generates smaller bundles with faster performances.

> The items of the `customElements` list can now be deferred

This brings a bunch of new functionalities:

- circular dependency for components (ex: *component A requires component B, and component B requires component A*).
- self reference into its own template -> a component can use itself into its own template (ex: *a recursive tree list*)
- asynchronous components (in conjunction with `rx-async`)
- external custom elements

---

> Add `IComponentInput`, and deprecate `defineObservableProperty`

`IComponentInput` is a new and cleaner way to define *Observable like inputs* for your components.

[//]: # (TODO rx-async doc)

### Breaking changes

- refactor `compileReactiveHTMLAsGenericComponentTemplate` as `compileReactiveHTMLAsComponentTemplate`
- refactor `compileReactiveHTMLAsGenericComponentTemplate` as `loadReactiveHTMLAsComponentTemplate`
