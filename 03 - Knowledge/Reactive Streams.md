---
domain: dev
type: definition
topics:
  - "[[java]]"
status: evergreen
---
## Claim

> Reactive Streams is a specification that defines a standard, non-blocking backpressure-aware protocol for asychronous stream processing.

---
## Explanation

Reactive Streams defines **interfaces and rules**, not an implementation. Its goal is to make asynchronous stream components interoperable while remaining safe under load.

The specification revolves around four core types:
- **Publisher**: produces data
- **Subscriber**: consumes data
- **Subscription**: links publisher and subscriber, controlling demand
- **Processor**: both subscriber and publisher

The central idea is **backpressure**:
- Consumers explicitly request how many elements they can handle
- Producers must never emit more than requested
- Demand is signaled via `request(n)`

This replaces implicit buffering or blocking with an explicit flow-control protocol.

---
## Implications

- Producers cannot overwhelm consumers by design.    
- Slow consumers are handled through demand signaling, not thread blocking.
- Violating the protocol leads to subtle bugs or undefined behavior.
- Libraries like Reactor, RxJava, and Akka Streams build on this contract.
- Understanding Reactive Streams is essential for reasoning about performance and failure modes in reactive systems.

---
## Related

- [[Reactor]]
- [[Backpressure]]
- [[Mono]]
- [[Flux]]
- [[Reactive-WebClient Debugging Concepts]]
