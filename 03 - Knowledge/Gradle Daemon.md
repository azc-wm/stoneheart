---
domain: dev
type: definition
topics:
  - "[[java]]"
  - "[[build-tools]]"
status: evergreen
---
## Claim

> The Gradle Daemon is a long-lived background JVM that executes Gradle builds and is reused across runs to reduce startup and configuration overhead, trading faster builds for persistent memory/state.

---
## Explanation

The **Gradle Daemon** is a process Gradle keeps alive after a build finishes. When you run another Gradle command, Gradle can reuse that already-running JVM instead of starting a fresh one, which typically improves build performance because it avoids:
- JVM startup and classloading cost
- repeated Gradle initialization
- cold JIT compilation

### How to control it

**Project-wide (recommended):** in `gradle.properties`
- `org.gradle.daemon=true` enables daemon reuse (default for most environments)
- `org.gradle.daemon=false` forces one-off Gradle JVMs

**Per command:**
- `./gradlew <task>` uses daemon (unless disabled)
- `./gradlew <task> --no-daemon` forces no daemon for that run
- `./gradlew --stop` stops all running daemons for this Gradle installation

### Practical tradeoffs

**Daemon enabled**
- Faster iterative builds
- Persistent JVM means persistent heap/metaspace usage
- Can accumulate memory pressure across many builds or large tasks (leading to OOM if heap is undersized)

**Daemon disabled**
- Slower builds (fresh JVM each time)
- More predictable memory behavior per run
- Useful for troubleshooting OOMs or daemon state issues

---
## Implications

- If you see intermittent build OOMs or weird state, try:
  - stopping daemons (`./gradlew --stop`)
  - running once with `--no-daemon`
  - increasing `org.gradle.jvmargs` (heap/metaspace)

- In CI, daemon can still be beneficial, but only if JVM args are appropriately sized and the environment reuses workers.

- Heavy tasks (dependency analysis, large test suites, annotation processing) may need higher heap or reduced parallelism, especially with daemon reuse.

---
## Related
- [[Gradle]]
- [[Daemon]]