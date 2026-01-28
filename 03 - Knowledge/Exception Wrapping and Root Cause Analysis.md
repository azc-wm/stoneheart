---
domain: dev
type: concept
topics:
  - "[[spring]]"
  - "[[observability]]"
  - "[[reliability]]"
  - "[[java]]"
status: evergreen
---
## Claim

> The actionable failure signal in reactive clients is often the deepest root cause, not the top-level exception

---
## Explanation

WebClient and Reactor frequently **wrap lower-level exceptions** to provide a uniform API. For example:
- Netty throws an `IOException`
- Reactor wraps it
- WebClient surfaces a `WebClientRequestException`    

As a result:
- The top-level exception may look identical across many failure modes
- The real differentiator is often:
    - `ex.getCause()`
    - Or the deepest nested cause


Correct analysis requires traversing the exception chain.

---
## Implications

- Retry policies must classify failures based on root cause, not wrapper type.
- Logging only the outer exception leads to false equivalence between failures.
- Observability pipelines should extract and tag root cause class/messages.
- Misclassification can cause retry storms or missed alerts.

---
## Related

- [[Reactor]]
- [[Reactive-WebClient Debugging Concepts]]
- [[WebClient Exceptions]]