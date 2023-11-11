---
slug: lirx-dom-introduction
authors: [vr]
tags: [lirx/dom, reactive programming, introduction]
---

# May I humbly submit you my framework ?

There I'll present you what I consider my best personal achievement so far: a framework purely based on Observables.

I did it because I was seeing the advantages and limits in React, Angular, and Svelte.

So I wanted to create something taking the best of all: a performant framework, built which optimizations in mind, constrained component structure, and based on "reactive programing".

Maybe it's a genius idea, maybe it's not, but in any case, if it may inspire people, I'll be happy with that.

## Introduction: what we really want ?

First let's define what makes a great framework, and what we want as developers and companies.

### Developers wants reactivity

In front-end, our interfaces **react** to changes: an event appends (like a click, a promise resoling, a websocket packet, a timer, etc...),
and we have to update our interface (meaning update the DOM).
So everything in front-end is fundamentally reactive.

If we compare some frameworks:

Angular inclues `rxjs` but was not built with reactivity in mind.
However, we may see a clear requirement from the developers: it has an `async` pipe, recently `signal` were introduced, and `Stores` are common.
Sadly, the framework itself is not optimized at all for reactivity. It was not built for it, and checking the source code highlight these limitations.

React has `useState` and `useEffect` (with others) which are essentially *reactive* variables and context.
We may say now, that it is a reactive framework, even if it was not initially though for it.

Finally, Svelte is natively based on reactivity, which provides excellent performances.

### Developers wants well-structured projects

One of the best argument in favor of Angular is how it enforces a specific structure for the projects.
When dealing with very large applications, it becomes very important to have a structured architecture having well organized files, directories and components.
Something that the recommandations, best practices and `cli` offers: an opinionated way to structure the apps, that works very well.

This is in my opinion where React and Svelte struggle: they don't offer an `unique` way of structuring the projects nor coding the components.

It's up to us to:

- create our own structure. 
- split, the css, html and js. 
- select what kind of css-or-js we want.
- choose the front-end tooling we want (nextjs, gatsby, etc...).

This flexibility is fantastic for small projects, but becomes a nightmare in very large applications:
for X developers, it results in X ways of coding the components, X ways to organize them, X different ways to import css, etc.
Something that becomes quickly impractical, and very hard to maintain.

With big projects, we'll need to have very strict guidelines and documentation to organize projects, or it will become cumbersome and a horror to works on.

### Companies wants stability

A company frequently works with code that will probably last forever.
We all have an example of a legacy code that nobody want to touch but is critical for the business (ex: a login page), or very large projects that are build in years.
So having something that can resist time is important. This means: no-breaking changes, evolution that keeps retro-compatibility and avoid changing everything in the framework.

This is something that is hard to stick to over time: new ideas often tend to radically change how we use a framework.

React changed to *hooks*: it was a revolution, but the "old way" kept working which is great for long term projects.
Angular reworked entirely its engine, and it was mostly transparent for the developers. In my opinion, this is currently the most stable of all the frameworks,
making it a very good choice for large companies.

So stability is a critical point for any giant business.

> This is something I cannot provide yet, but somewhere in the future why not ?

## Presentation of my framework




