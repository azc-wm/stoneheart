---
domain: dev
type: concept
topics:
  - "[[backend]]"
  - "[[http]]"
  - "[[observability]]"
  - "[[java]]"
  - "[[spring]]"
  - "[[reliability]]"
status: evergreen
---
## Claim

> WebClient uses different excpetion types to distinguish transport failures from HTTP responses

---
## Explanation

WebClient errors fall into two primary categories:

### **WebClientRequestException**

- Occurs **before** an HTTP response is received
- Originates in the transport / IO layer
- Common causes:
    - DNS resolution failure
    - Connection timeout
    - TLS handshake failure
    - Connection reset by peer


This means _no HTTP semantics exist_.

### **WebClientResponseException**

- Occurs **after** an HTTP response is received
- Contains:
    - HTTP status (4xx / 5xx)
    - Response headers
    - Optional response body

This represents an _application-level_ failure, not a network failure.

---
## Implications
- “Connection reset by peer” is a **transport abort**, not an HTTP error.
- Retry logic should differ between request vs response exceptions.
- Metrics and alerts should classify failures correctly to avoid noise.
- Treating all WebClient errors as HTTP failures hides infrastructure issues.

---
## Related

- [[Reactor]]
- [[Reactive-WebClient Debugging Concepts]]
- [[Exception Wrapping and Root Cause Analysis]]