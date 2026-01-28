---
domain: dev
type: topic
topics:
  - "[[cost-optimization]]"
  - "[[cloud]]"
  - "[[architecture]]"
status: evergreen
---
## Claim

> Cost optimization is the practice of designing, operating, and evolving systems to deliver required outcomes at the lowest sustainable cost without compromising critical reliability or security.

---
## Explanation

Cost optimization is not about minimizing spend at all costs; it is about **maximizing value per unit of cost**. It requires understanding how architectural, operational, and usage decisions translate into financial impact.

Key cost drivers in modern systems include:
- **Capacity decisions**: over-provisioning vs elasticity
- **Workload patterns**: steady, spiky, or unpredictable usage
- **Abstraction level**: self-managed vs managed services
- **Data lifecycle**: storage class, retention, and egress
- **Operational behavior**: retries, polling, logging, and inefficiencies

Effective cost optimization is continuous and iterative:
1. Measure usage and cost drivers
2. Attribute cost to workloads or teams
3. Identify waste or inefficiency
4. Change design or behavior
5. Re-measure and adjust

---
## Implications

- Cost optimization is an architectural concern, not a post-hoc exercise.
- Poor observability makes meaningful optimization impossible.
- Over-optimizing cost can degrade reliability, velocity, or security.
- Aligning incentives (ownership, budgets, feedback loops) is as important as technical changes.

---
## Related
- [[cloud]]
- [[architecture]]
- [[observability]]
- [[capacity-planning]]
- [[autoscaling]]
- [[efficiency]]
- [[finops]]
