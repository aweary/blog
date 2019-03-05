---
path: "/error-driven-dev-react"
date: "2017-07-12T17:12:33.962Z"
title: "The Fault in Our Tolerence: Accounting for Failures in React"
description: ""
---

## Fault Tolerence

Building a modern web application is a daunting process involving many moving parts, entropy, and a scary amount of complexity. This means that we often find ourselves in situations where things are breaking.

While minimizing breakage is a worthwhile pursuit, thinking we can eliminate it all together is unreasonable. That means **our applications need to be resiliant to breakage.**

This means we need [fault tolerence:](https://en.wikipedia.org/wiki/Fault_tolerance)

> Fault tolerance is the property that enables a system to continue operating properly in the event of the failure of some (one or more faults within) of its components. 

In my experience, this is often overlooked in web apps. We spend a lot of time talking about testing and how we can prevent failures, but not nearly as much time accounting for the inevitable faults in our system. For many of us [high availability](https://en.wikipedia.org/wiki/High_availability) is a top priority (if our website is down, our users can't use our product!) and fault tolerence is a critical property of a high availability system.

So how do we enable our React application to be fault tolerent?

## Error Boundaries

The short answer is [error boundaries](https://reactjs.org/docs/error-boundaries.html).

Error boundaries let us implement a form of [graceful degredation](https://developer.mozilla.org/en-US/docs/Glossary/Graceful_degradation). 

```jsx
componentDidCatch(error) {
  // When this gets called, you know an error has occurred!
  // Hurray for fault detection!

  // We can now do things like call setState to render a fallback
  // UI, so that our users know an error has occurred.
  this.setState({ error, showFallback: true });
}
```

<div class="blurb">
<div class="emoji">💬</div>

<div>

An error boundary in React is just a class component with the `componentDidCatch` method. If you want a more robust starting point, check out [react-error-boundary](https://github.com/bvaughn/react-error-boundary).

</div>
</div>

The React docs do a great job of explaining what error boundaries are and how to use them, so I don't want to dwell on that too much. Go read the docs first! I want to talk about _how_ to use them, _where_ to put them, and _why_ we should be careful about overusing them.


## Failing the Right Way

Adding an error boundary to your application is a pretty low-effort win, but it takes a little planning to put them _in the right places_. If you have too few, you risk failures taking down more functionality than is necessary. If you have too many, you risk putting your app into a weird, half-broken state. You want to be the [Goldilocks](https://www.dltk-teach.com/rhymes/goldilocks_story.htm) of failures.


### Not Enough Error Boundaries

todo

### Too Many Error Boundaries 

todo

```jsx
// Most applications have a structure somewhat like this.
function App() {
  return (
    <>
      <Navigation />
      <Main>
        <Sidebar />
        <Timeline />
      </Main>
      <Footer />
    </>
  )
}
```
## Testing your Fault Tolerence

The best, low-effort way to test your application's fault tolerence is to **just go in and manually break things**. 

```jsx{2-3}
function AddToCartButton(props) {
  // What happens if I messed up here? Lets find out!
  throw new Error("oops, I made a mistake!")
  return <button className="add-to-cart">Add to cart</button>
}
```

This is something that I've started doing with every new component I add and it's been really helpful to see how our applications handle failures. Just make sure you don't commit any of those `throw` statements 🙂

### Chaos Engineering


Intentionally throwing errors to test fault tolerence is a very mild example of [chaos engineering](https://en.wikipedia.org/wiki/Chaos_engineering). In most cases chaos engineering involves intentionally crippling services _in production_, but for a web app that wouldn't be acceptable since it would always directly affect the user experience.

<div class="thought">
<div class="emoji">🤔</div>
<div>

What if we had a component like `React.ChaosMode` that let you test fault tolerence by randomly breaking some component(s)?
</div>
</div>

