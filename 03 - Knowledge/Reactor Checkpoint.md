---
domain: dev
type: definition
topics:
  - "[[http]]"
  - "[[java]]"
  - "[[observability]]"
  - "[[debugging]]"
status: evergreen
---
## Claim

> A Reactor checkpoint is a logicla marker that records where an error was observed in the reactive chain

---
## Explanation
A **checkpoint** annotates a reactive sequence so that, if an error occurs downstream, Reactor can attach contextual information to the exception.

In WebClient, checkpoints typically encode:
- The HTTP method and URI
- The reactive operator chain where the request was assembled

This is crucial because:

- The _actual_ exception may originate from Netty event-loop threads.    
- Without checkpoints, stack traces only show low-level infrastructure code.

Example context added by a checkpoint:
```pgsql
checkpoint ⇢ GET /v1/notifications/DE
```

This does not change behaviour, it only improves diagnostics

---
## Implications
- Checkpoints make reactive stack traces actionable.
- They allow you to identify _which request_ failed, not just _that_ something failed.
- Absence of checkpoints significantly increases MTTR in reactive systems.
- Checkpoints are especially valuable in high-concurrency services.

---
## Related
- [[Reactive/WebClient Debugging Concepts]]
- [[Reactor]]
- [[WebClient Exceptions]]
