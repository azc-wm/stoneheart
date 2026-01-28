---
domain: dev
type: topic
topics:
  - "[[system-design]]"
  - "[[architecture]]"
status: evergreen
---
---
## Claim

> Observability is the ability to understand the internal state of a system by examining its outputs, without modifying the system.

---
## Explanation

Observability describes how well a system exposes signals that allow operators to reason about its behavior, performance, and failures.

It is commonly expressed through three primary signal types:
- **Logs**: discrete records of events
- **Metrics**: numeric measurements aggregated over time
- **Traces**: causal paths of requests across components

Observability is a **design property**, not a tool. Instrumentation choices, signal quality, and semantic consistency determine whether systems can be effectively understood under real-world conditions.

Key characteristics of good observability:
- High signal-to-noise ratio
- Clear ownership and consistent naming
- Correlation across signals (e.g. trace IDs)
- Support for unknown or novel failure modes

---
## Implications

- Observability enables debugging of issues that were not anticipated at design time.
- Poor observability increases mean time to detect (MTTD) and mean time to recover (MTTR).
- Adding observability after the fact is harder and less effective than designing for it.
- Cost and data volume must be balanced against diagnostic value.

---
## Related
- [[reliability]]
- [[debugging]]
- [[monitoring]]
- [[logging]]
- [[metrics]]
- [[tracing]]
- [[sre]]
