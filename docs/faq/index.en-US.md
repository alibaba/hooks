---
title: FAQ
order: 3
nav:
  title: Guide
  path: /docs
  order: 1
---

# FAQ

Here are the frequently asked questions about Umi Hooks, you should look up before you ask in the community or create a new issue. 

### When I use Umi Hooks, I get an error `regeneratorRuntime is not defined`, how can I solve it?

```
// install regenerator-runtime
npm i regenerator-runtime --save

// Add a reference at the top of the entry file
import "regenerator-runtime/runtime";
```

### I only want to use `useRquest`, but I have to install the entire `@umijs/hooks`?

No, `useRequest` is a independent package, can be used by installing `@umijs/use-request` separately.

### I only want to use one or two of them, but all the hooks are compiled after the project is compiled.

See [Import On demand](/docs/getting-started?anchor=import-on-demand)
