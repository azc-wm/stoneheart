---
domain: dev
type: topic
topics:
  - "[[system-design]]"
status: evergreen
---
## Claim

> Good system architecture is the disciplined selection of trade-offs under explicit constraints, not the pursuit of “best practices.”

---
## Explanation

Architecture decisions exist to satisfy constraints (latency, cost, team size, compliance, time-to-market). “Best practice” only makes sense relative to those constraints. When constraints are implicit, architectures drift into accidental complexity.

---
## Implications
- Make constraints explicit in every design doc.
- Prefer designs that degrade gracefully when constraints change.
- If you can’t name the trade-off, you probably haven’t made a decision yet.

---
## Related
- [[ ]]
