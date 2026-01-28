---
domain: dev
type: definition
topics:
  - "[[java]]"
  - "[[spring]]"
  - "[[http]]"
status: evergreen
---
## Claim

> Debugging reactive HTTP clients requires understanding where failures occur in the reactive chaing, not jsut what exception was thrown

---
## Explanation

Reactive stacks (Reactor + WebClient) decouple _where_ work is executed from _where_ it is observed. As a result:
- Errors may surface on threads unrelated to the original request.
- Stack traces often point to Netty or Reactor internals instead of business code.
- Context (which request, which operator) can be lost unless explicitly captured.

Key debugging tools and concepts include:
- **Reactor checkpoints** to reattach logical context to exceptions
- **Exception taxonomy** (transport vs HTTP response)
- **Exception wrapping** to distinguish symptoms from root causes
    

Effective debugging focuses on _signal classification_ rather than raw stack traces.

---
## Implications
- Reactive errors without context are misleading and slow to diagnose.
- Logging the wrong exception layer leads to incorrect retries and alerts.
- Teams unfamiliar with reactive debugging may misattribute infra issues to application bugs.
- Structured debugging patterns should be standardized across services.

---
## Related
- [[Reactor]]
- [[Reactor Checkpoint]]
- [[WebClient Exceptions]]
- [[Exception Wrapping and Root Cause Analysis]]
