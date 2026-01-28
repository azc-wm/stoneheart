---
domain: dev
type: topic
topics:
  - "[[cloud]]"
  - "[[infrastructure]]"
  - "[[aws]]"
status: evergreen
---
## Claim

> Cloud computing is the delivery of compute, storage, networking, and higher-level platform services over the internet with on-demand provisioning and usage-based pricing.

---
## Explanation

“Cloud” means you consume IT capabilities as services instead of owning and operating the underlying hardware. The key characteristics are:
- **On-demand self-service**: provision resources when needed (minutes, not weeks).
- **Elasticity**: scale up/down with workload.
- **Measured service**: pay for what you use (or reserve capacity intentionally).
- **Broad network access**: access via APIs/console from anywhere.
- **Resource pooling**: multi-tenant infrastructure under the hood.

Cloud spans multiple layers:
- **IaaS** (Infrastructure as a Service): virtual machines, networks, disks (e.g., EC2, VPC)
- **PaaS** (Platform as a Service): managed runtimes/databases/queues (e.g., RDS, SQS)
- **Serverless**: fully managed execution where you deploy code/functions and scale is automatic (e.g., Lambda)

Common deployment models:
- **Public cloud** (AWS/Azure/GCP), **private cloud** (self-hosted), **hybrid** (mix), **multi-cloud** (multiple public clouds)

---
## Implications

- Cloud makes it easier to iterate quickly, but you must manage **cost**, **governance**, and **security** proactively.
- “Managed” services reduce operational work but can introduce **vendor lock-in** and constraints.
- Reliability becomes an architectural discipline (multi-AZ/region, backups, DR), not just “buy better hardware.”
- Strong defaults matter: **IaC**, tagging, least-privilege IAM, observability, and guardrails prevent chaos at scale.

---
## Related
- [[infrastructure]]
- [[aws]]
- [[platform]]
- [[iaas]]
- [[paas]]
- [[serverless]]
- [[kubernetes]]
- [[observability]]
- [[IAM]]
