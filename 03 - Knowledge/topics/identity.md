---
domain: dev
type: topic
topics:
  - "[[identity]]"
  - "[[security]]"
  - "[[authentication]]"
  - "[[authorization]]"
status: evergreen
---
## Claim

> An identity is a representation of an entity (human or non-human) that can be authenticated and referenced in access-control decisions.

---
## Explanation

Identity answers the question: **“Who or what is acting?”**  
It is the anchor used by authentication systems to verify claims and by authorization systems to grant or deny access.

An identity is a **logical construct**, not a credential. It typically includes:
- A **unique identifier** (ID, name, ARN, subject)
- **Attributes** or claims (roles, groups, labels, metadata)
- An associated **trust domain** (where the identity is valid)

Identities can represent:
- Humans (users, administrators)
- Applications and services
- Workloads (VMs, containers, functions)
- External systems or federated principals

Credentials (passwords, tokens, certificates) are **attached to identities** but are not identities themselves.

---
## Implications

- Poorly scoped identities lead to over-permissioned systems.
- Clear identity boundaries simplify authorization and auditing.
- Treating services and workloads as first-class identities enables automation without shared secrets.
- Identity design is foundational: authentication and authorization depend on it being stable and unambiguous.

---
## Related
- [[authentication]]
- [[authorization]]
- [[iam]]
- [[principal]]
- [[federation]]
- [[least-privilege]]
