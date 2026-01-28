---
domain: dev
type: concept
topics:
  - "[[k8s]]"
  - "[[architecture]]"
  - "[[observability]]"
  - "[[performance]]"
  - "[[reliability]]"
status: evergreen
---
## Claim

> Karpenter is an open-source node lifecycle management project built for Kubernetes. Adding Karpenter to a Kubernetes cluster can dramatically improve the efficiency and cost of running workloads on that cluster

---
## Explanation
Karpenter works by:
- **Watching** for pods that have been marked as unshedulable
- **Evaluating** scheduling constraints (resource requests, nodeselectors, affinities, tolerations, and topology spread constraints) requested by the pods
- **Provisioning** nodes that meet pod requirements
- **Disrupting** nodes when no longer needed

---
## Implications

---
## Related
- [[ ]]
