---
path: "/composition-vs-configuration"
date: "2019-03-17"
title: "Composition vs. Configuration in React"
description: ""
---

Imagine we're developing a `<Navbar />` component. You can specify a title, a left icon, and a right icon. We want to enable product developers to use this `Navbar` component in different products with different icons, colors, and behavior.

As far as I see it there are two common approaches to designing this API, **composition** and **configuration**. Both approaches have different tradeoffs.

## Composition in General

When we talk about [composition in React](https://reactjs.org/docs/composition-vs-inheritance.html) we usually talk about _components rendering other components_.

### Configuration

```jsx
<PageTemplate
  title="My Friends"
  sidebarSearch={currentSearch}
  onSidebarSearchSubmit={onSearchSubmit}
  onSidebarSearchChange={onSearchChange}
/>
```

### Composition

```jsx
<PageTemplate
  title="My Friends"
  sidebar={
    <PageSidebar
      search={currentSearch}
      onSubmit={onSearchSubmit}
      onChange={onSearchChange}
    />
  }
/>
```

