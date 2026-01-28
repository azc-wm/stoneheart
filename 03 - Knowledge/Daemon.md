---
domain: dev
type: concept
topics:
  - "[[processes]]"
status: evergreen
---
## Claim

> A daemon is a long-lived background process that runs without direct user interaction to provide system or application services.

---
## Explanation

A **daemon** is a program designed to run continuously (or semi-continuously) in the background, typically started at system boot or by a supervising process. Unlike interactive programs, daemons do not attach to a terminal and usually expose functionality via:
- network ports
- IPC mechanisms
- files, sockets, or APIs
- signals or message queues

The term originates from Unix-like operating systems, where daemons commonly have names ending in `d` (e.g., `sshd`, `cron`, `httpd`).

### Key characteristics
- **Long-lived**: intended to stay alive for extended periods
- **Non-interactive**: no direct user input/output
- **Service-oriented**: performs work on behalf of other programs or the system
- **Managed lifecycle**: often supervised (systemd, init, launchd, Kubernetes, etc.)

### Modern equivalents
The daemon concept generalizes beyond OS processes:
- Build tool daemons (e.g., Gradle Daemon)
- Language servers
- Database servers
- Containerized services
- Background workers in distributed systems

---
## Implications

- Daemons improve performance and responsiveness by avoiding repeated startup costs.
- They require explicit lifecycle management (start, stop, restart, health).
- Bugs such as memory leaks or resource exhaustion are more impactful because state persists over time.
- Observability (logs, metrics, health checks) is critical for daemon-based systems.

---
## Related
- [[Gradle Daemon]]