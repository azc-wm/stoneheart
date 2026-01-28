---
domain: dev
type: topic
topics:
  - "[[aws]]"
  - "[[cloud]]"
  - "[[infrastructure]]"
status: evergreen
---
## Claim

> AWS is a cloud computing platform that provides on-demand infrastructure services (compute, storage, networking, databases, and managed services) that can be composed to run applications without owning physical datacenter hardware.

---
## Explanation

AWS (Amazon Web Services) is a large catalog of cloud services exposed through APIs, consoles, and infrastructure-as-code tools. Instead of buying servers and networking gear upfront, teams provision resources as needed and pay for usage.

A useful mental model is that AWS offers:
- **Foundational infrastructure**: networking (VPC), compute (EC2), storage (S3), DNS (Route 53)
- **Managed building blocks**: databases (RDS/DynamoDB), messaging (SQS/SNS), containers (ECS/EKS), serverless (Lambda)
- **Cross-cutting concerns**: identity/access (IAM), monitoring/logging (CloudWatch), security controls (KMS, Security Hub)

Most AWS usage comes down to choosing the right level of abstraction:
- More control (and ops burden): EC2
- More managed: ECS/EKS/RDS
- Most managed: Lambda/DynamoDB + managed integrations

---
## Implications

- Cloud “speed” comes from **self-service provisioning** and reusable patterns (IaC, templates, modules).
- AWS reduces *hardware ownership* costs but can increase **complexity** (permissions, networking, service sprawl).
- Architecture decisions are often tradeoffs between **control, cost, and operational overhead**.
- Security posture is shared (“shared responsibility”): AWS secures the platform; you secure configuration, access, and data.

---
## Related
- [[cloud]]
- [[infrastructure]]
- [[IAM]]
- [[vpc]]
- [[ec2]]
- [[s3]]
- [[lambda]]
- [[eks]]
- [[rds]]
- [[dynamodb]]
- [[sqs]]
