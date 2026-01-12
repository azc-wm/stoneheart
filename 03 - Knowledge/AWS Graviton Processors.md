---
domain: dev
type: concept
topics:
  - "[[architechture]]"
  - "[[aws]]"
  - "[[k8s]]"
  - "[[cost-optimization]]"
  - "[[performance]]"
status: evergreen
---
## Claim

> AWS Graviton EC2 instances provide better price-performance than equivalent x86 EC2 instances for most cloud-native workloads, as long as the software stack is compatible with ARM64.

---
## Explanation

AWS Graviton Instances are powered by custom **ARM-based processors designed by AWS** (Graviton2, Graviton3, Graviton3E). Unlike Intel or AMD isntances, Graviton uses ARM64 (AArch64) architecture.

Main advantadges come from:

1. **Vertical integration** 
   AWS controls the CPU design, networking, memory controllers, and Nitro system. This allows tighter optimization than with third-party CPUs.
   
2. **Performance per dollar**
   For comparable isntance classes, Graviton typically delivers:
	1. ~20-40% better price-performance
	2. Lower on-demand pricing
	3.  Better sustained throughput under load
	   
3. **Energy efficiency**
   ARM CPUs consume less power per unit of work. AWS passes this efficiency on as lower instance costs and positions Graviton as a sutainability improvement.

Gravtion instances are a strongn fit for cloud-native, stqateless, Linux-based workloads, especially when built with modern runtimes:
- Java 11+ (HotSpot & OpenJ9)
- Node.js
- Go
- Python
- Containers (Docker / Kubernetes)
- Most open-source databases and message brokers

The primary constraint is **architecture compatibility**. Any native binary, dependency, or container image must support `linux/arm64`. This is rarely an issue for modern ecosystems but can be a blocker for legacy software or proprietary agents.

---
## Implications

- **Cost optimization lever**  
    Migrating compute-heavy services (API servers, workers, batch jobs) to Graviton is often one of the fastest ways to reduce AWS spend without architectural changes.
    
- **Build & CI implications**  
    Teams must ensure:
    - Multi-arch Docker images (`linux/amd64`, `linux/arm64`)
    - CI pipelines that build and test on ARM
    - No hidden x86-only dependencies (e.g. native Node modules)
        
- **Kubernetes friendliness**  
    Graviton works especially well with EKS:
    - Mixed-node clusters (x86 + ARM)
    - Node pools per architecture
    - Karpenter + Graviton for cost-aware scaling
        
- **Not universally optimal**  
    Workloads tightly coupled to:
    - x86-only binaries
    - Old JVMs
    - Vendor agents without ARM support  
        may incur migration friction that outweighs the savings.

## Related

