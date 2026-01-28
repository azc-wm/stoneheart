---
domain: dev
type: definition
topics:
  - "[[java]]"
  - "[[http]]"
  - "[[spring]]"
status: evergreen
---
## Claim

> Project Reactor is a reactibe programming library that provides asynchronous, non-blocking streams with backpressure for building event-driven systems on the JVM

---
## Explanation

Reactor implements the **Reactive Streams** specification and centers around two core types:
- **`Mono<T>`**: a stream of _0 or 1_ element    
- **`Flux<T>`**: a stream of _0 to N_ elements

Key characteristics:
- **Lazy execution**: nothing happens until a subscriber exists
- **Asynchronous by default**: execution is decoupled from calling threads
- **Backpressure-aware**: consumers control demand
- **Functional composition**: behavior is built by chaining operators

Reactor is not a thread model, it is a _coordination model_. Threads are assigned via schedulers, but the reactive chain describes **data flow**, not execution order.

---
## Implications

- Stack traces no longer represent execution flow; they represent _signal flow_.
- Errors propagate as signals, not thrown exceptions.
- Context (request, user, correlation IDs) must be explicitly carried.
- Debugging requires understanding operators, not just code order
- Blocking inside Reactor breaks its core assumptions and causes systemic issues.

---
## Related

- [[Reactive Streams]]
- [[Reactive/WebClient Debugging Concepts]]
- [[Reactor Checkpoint]]
- [[Backpressure]]