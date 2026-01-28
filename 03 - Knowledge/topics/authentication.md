---
domain: dev
type: topic
topics:
  - "[[authentication]]"
  - "[[security]]"
  - "[[identity]]"
status: evergreen
---
## Claim

> Authentication is the process of verifying that an entity is who or what it claims to be.

---
## Explanation

Authentication answers the question: **“Who are you?”**  
It establishes identity but does **not** grant permissions by itself.

Authentication relies on one or more factors:
- **Something you know**: password, PIN
- **Something you have**: token, phone, hardware key
- **Something you are**: biometrics
- **Something you do** (less common): behavior patterns

Common authentication mechanisms:
- Username/password
- API keys and certificates
- OAuth2 / OpenID Connect
- Single Sign-On (SSO)
- Multi-factor authentication (MFA)

Authentication can apply to:
- Humans (users, admins)
- Services (applications, jobs)
- Workloads (containers, VMs, functions)

A successful authentication produces a **security context** (identity, claims, attributes) that downstream systems use for authorization.

---
## Implications

- Authentication strength directly affects the security of all downstream authorization.
- Weak or reused credentials are a primary attack vector.
- Short-lived credentials reduce blast radius compared to long-lived secrets.
- Authentication should be centralized where possible to avoid inconsistent identity handling.

---
## Related
- [[authorization]]
- [[identity]]
- [[iam]]
- [[mfa]]
- [[sso]]
- [[oauth]]
- [[oidc]]
