In invoice app we have the following code:

```java
@PostConstruct  
private void init() {  
    invoiceLineBulkUpdateTopicArn =  
            amazonSNSClient  
                    .createTopic(  
                            new CreateTopicRequest(  
                                    getInstance()  
                                            .getStringProperty(  
                                                    "invoice-app.event.sns.topic", "")  
                                            .get()))  
                    .getTopicArn();
```

We do that to “discover” the ARN for the SNS topic we interact with. That forces the pod IAM role to have `sns:CreateTopic` permission (even though we do not need to create a topic).

This is problematic for a few reasons:
- **Violates least privilege**: the application only needs to publish/subscribe to an existing topic, not create new infra.    
- **Discovery via mutation**: `CreateTopic` is an infrastructure-mutating API. Even if SNS returns the existing topic when it already exists, it still means the application is _allowed_ to create it if it doesn’t.
- **Operational risk**: a misconfiguration (wrong topic name / wrong env templating) could silently create an unexpected topic instead of failing fast.
- **Harder security posture**: granting `sns:CreateTopic` expands blast radius and complicates audits/reviews.

## Option A - Pure determinism

### Requirements
- We have topicName, region and acoountId available in config/env (and partition is known or assumed `aws`)

### Assumptions
- The topic is in the **same/account** region as provided

### Permissions needed
- None, we build the string since topic name should be deterministic and predictable. We assume that not finding it is not due to malformation but to the resource not existing. Which espaces the responsibilities of the invoice-app pod.

### Pros
- Zero AWS Api calls
- No need for `sns:CreateTopic`, `sns:ListTopics`, etc.

### Cons
- Doesn't prove the topic exists. We would need to implement a validation call.

---
## Option B - Deterministic build + derive `accountId` via STS (minimal permission)

### Requirements
- We have topicName and region in env
- We can call sts to get account id

### Assumptions
- Topic lives in the same aws account as the runtime credentials (STS identity)
- Partition standard
### Permissions needed
- `sts:GetCallerIdentity`

### Pros
- Still avoid `sns:CreateTopic`
- Very samll IAM surface area

### Cons
- One extra AWS call at sartup (We are already doing a call at startup)

---
## Option C — Use SSM Parameter Store for Topic ARN (dynamic config)

### Requirements

- We can store the Topic ARN (or topic name) in **SSM Parameter Store**
- The app can call SSM at startup (or periodically) to read the parameter
- We know (or can assume) the SSM parameter **name/path** via env/config (e.g. `/invoice-app/${env}/sns/invoice-batch-event/arn`)
- If using `SecureString`, we also need access to the KMS key used by SSM

### Assumptions

- Infra (Terraform/CFN/CDK) is the source of truth and will **create/update** the parameter per environment
- The parameter value is correct for the environment (region/account/topic)

### Permissions needed

- `ssm:GetParameter` (scoped to the parameter path)
- Optional: `kms:Decrypt` (only if the parameter is `SecureString`)

### Pros
- Avoids `sns:CreateTopic`
- **Allows changing the topic (ARN/name) without redeploy** (with runtime refresh strategy)
- Clean separation: infra publishes wiring, app consumes it
- Works naturally for **cross-account** / shared topics (no reliance on STS identity matching the topic’s account)

### Cons
- Requires infra work to create/manage parameters + naming conventions
- Adds a dependency on SSM availability at startup (mitigated with caching / fallback)
- Slightly broader than STS in terms of “moving parts” (SSM + optionally KMS)