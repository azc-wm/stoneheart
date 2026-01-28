---
domain: dev
type: concept
topics:
  - "[[system-design]]"
  - "[[reliability]]"
  - "[[processes]]"
  - "[[performance]]"
  - "[[architecture]]"
status: evergreen
---
## Claim

> > Backpressure is a flow-control principle where a system prevents producers from overwhelming consumers by limiting the rate of work admission.

---
## Explanation

Backpressure exists in any system where:
- Work is produced faster than it can be processed
- Resources (CPU, memory, IO) are finite
- Unchecked input leads to degradation or failure

At its core, backpressure answers a single question:
> **What happens when demand exceeds capacity?**

Common ways systems express backpressure:
- **Admission control**: refusing or delaying new work
- **Rate limiting**: bounding how fast work is accepted
- **Credit-based flow control**: consumers grant capacity
- **Bounded queues**: producers block or fail when full
- **Pull-based interaction**: work is requested, not pushed

Backpressure is not a specific mechanism, but a **design choice** about how overload is handled.

---
## Implications

- Backpressure defines _where_ failure occurs under load.
- Systems without backpressure fail indirectly (OOM, timeouts, cascading retries).
- Explicit backpressure shifts failure earlier and makes it observable.
- Backpressure encodes business priorities (drop, delay, reject).
- Blocking is not backpressure, it is a symptom of missing flow control.
---
## Related

- [[Flow Control]]
- [[Load Shedding]]
- [[Rate Limiting]]
- [[Queueing Theory]]
