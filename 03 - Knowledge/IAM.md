---
domain: dev
type: concept
topics:
  - "[[authorization]]"
  - "[[authentication]]"
  - "[[security]]"
  - "[[cloud]]"
status: evergreen
---
## Claim

> Identity and Access Management (IAM) is the system that defines who or what can access resources, what actions they are allowed to perform, and under which conditions.

---
## Explanation

IAM is the control plane for authorization and authentication in modern systems. It answers three fundamental questions:
1. **Who are you?** (identity: user, service, workload, role)
2. **What can you do?** (permissions: actions on resources)
3. **Under what constraints?** (conditions: time, network, device, context)

In cloud platforms (e.g. AWS), IAM typically consists of:
- **Identities**: users, roles, service accounts
- **Policies**: declarative permission rules (allow/deny)
- **Trust relationships**: who can assume a role
- **Credentials**: passwords, keys, tokens (ideally short-lived)

Good IAM design favors:
- **Roles over users** for applications and workloads
- **Short-lived credentials** over long-lived secrets
- **Least privilege** by default, expanded only when required
- **Explicit boundaries** between environments (dev/stage/prod)

---
## Implications

- IAM mistakes are a leading cause of security incidents (overly broad permissions, leaked keys).
- Strong IAM enables automation and scalability without human access sprawl.
- Auditing and reasoning about permissions becomes harder as systems grow—structure and naming matter.
- IAM is foundational: observability, networking, and data access all depend on it being correct.

---
## Related
- [[RBAC]]
