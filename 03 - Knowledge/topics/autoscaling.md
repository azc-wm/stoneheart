---
domain: dev
type: concept
topics:
  - k8s
  - architechture
  - "[[reliability]]"
status: evergreen
---
## Claim

> Autoscaling improves cost efficiency and reliability only when a system’s scaling signals are aligned with real work and the system degrades safely under load.

---
## Explanation

Autoscaling is the practice of **dynamically adjusting system capacity** (instances, pods, workers) in response to demand. In cloud systems, this usually means scaling compute based on signals such as CPU usage, queue depth, or request rate.

Autoscaling is often treated as an infrastructure feature, but in practice it is a **system-level property** that depends on:

1. **Work representation**  
    The scaling signal must represent _actual work_, not a proxy. CPU and memory are indirect signals; queue depth, in-flight requests, or backlog age are usually closer to real demand.
    
2. **System elasticity**  
    The system must tolerate:
    - cold starts
    - uneven load distribution
    - delayed scale-up or scale-down  
        without cascading failures.
        
3. **Control-loop stability**  
    Autoscaling is a feedback loop. Poorly chosen metrics, thresholds, or cooldowns can cause:
    - oscillation (thrashing)
    - over-scaling
    - delayed recovery

In Kubernetes-based systems, autoscaling exists at multiple layers:
- Pod level (HPA, KEDA)
- Node level (Cluster Autoscaler, Karpenter)
- External services (managed queues, databases)

Effective autoscaling requires these layers to **cooperate**, not compete.

---
## Implications

- **Metric choice is the hardest part**  
    Autoscaling failures are more often caused by bad signals than bad scaling logic.

- **Queue-based systems scale best**  
    Queues make work explicit, measurable, and bufferable, which makes autoscaling safer and more predictable.

- **Autoscaling does not fix saturation**  
    If a system fails catastrophically when overloaded, autoscaling will amplify the failure rather than prevent it.

- **Cost and reliability trade off**  
    Aggressive scale-down saves money but increases cold-start risk; conservative scale-up improves latency but increases idle cost.

- **Application design matters more than tooling**  
    Tools like HPA or KEDA succeed or fail based on application behavior, not configuration sophistication.

---
## Related
- [[ ]]
