---
domain: dev
type: topic
topics:
  - "[[authorization]]"
  - "[[security]]"
  - "[[identity]]"
  - "[[access-control]]"
status: evergreen
---
## Claim

> Authorization is the process of determining whether an authenticated identity is allowed to perform a specific action on a specific resource.

---
## Explanation

Authorization answers the question: **“Are you allowed to do this?”**  
It operates *after* authentication and depends on an established identity (user, service, workload).

Core elements of authorization:
- **Subject**: who is acting (user, role, service)
- **Action**: what is being attempted (read, write, delete, invoke)
- **Resource**: what is being accessed
- **Policy**: rules that allow or deny actions
- **Context** (optional): conditions such as time, network, attributes

Common authorization models:
- **DAC** (Discretionary Access Control): permissions set by owners
- **RBAC** (Role-Based Access Control): permissions grouped by roles
- **ABAC** (Attribute-Based Access Control): decisions based on attributes and conditions
- **Policy-based** systems: declarative allow/deny rules evaluated at runtime

Authorization can be enforced at multiple layers:
- Application logic
- APIs and gateways
- Operating systems
- Cloud platforms and infrastructure

---
## Implications

- Authorization bugs often lead to **privilege escalation** or **data leaks**.
- Centralized, declarative policies are easier to audit than scattered checks in code.
- Least-privilege authorization improves security but increases design complexity.
- Authorization decisions must be explicit; implicit access tends to grow unchecked.

---
## Related
- [[authentication]]
- [[identity]]
- [[iam]]
- [[rbac]]
- [[abac]]
- [[least-privilege]]
