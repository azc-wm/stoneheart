---
domain: dev
type: concept
topics:
  - "[[backend]]"
  - "[[java]]"
status: evergreen
---
## Claim

> Dates are not instants.  
> Only timestamps with a time + offset/zone represent a moment on the timeline.
> 
> Anything missing an offset requires a business decision.

---
## Explanation

In Java (and most backend systems), only values that include a **time and a timezone or offset** can be placed on the timeline.

- `Instant` represents a precise moment in UTC.
- `OffsetDateTime` represents a local date-time plus an explicit offset.    
- `LocalDateTime` has a time but **no offset**.
- `LocalDate` has **neither time nor offset**.

Because `LocalDate` and `LocalDateTime` lack offset information, they cannot be converted to an `Instant` without **choosing a timezone or offset**.

That choice is not technical — it encodes a **business rule**.

Example:

```java
LocalDate.parse("2025-01-19")
  .atStartOfDay(ZoneOffset.UTC)
  .toInstant();
```

This means:

> “A date-only value is interpreted as midnight UTC.”

---
### Common timestamp formats and meaning

**ISO-8601 instant (preferred)**

```
2025-01-19T10:15:30Z
2025-01-19T10:15:30.123Z
```

→ Already UTC, no ambiguity.

**ISO-8601 offset date-time (colon offset)**

```
2025-01-19T10:15:30+02:00
2025-01-19T10:15:30.123+02:00
```

→ Moment is unambiguous, offset included.

**RFC-822 offset (no colon, legacy / DB formats)**

```
2025-01-19T10:15:30+0000
2025-01-19T10:15:30.123+0200
```

→ Still unambiguous, but legacy formatting.

**Date-only values**

```
2025-01-19
```

→ Not a moment; requires an explicit interpretation.

---
## Implications

- Date-only values must **never be interpreted implicitly**.
- Choosing `ZoneId.systemDefault()` introduces:
    - environment-dependent behavior
    - DST-related bugs
    - non-reproducible results
      
- Interpreting date-only values in **UTC** is:
    - deterministic
    - environment-independent
    - suitable for persistence and finance domains
        
- Parsing logic should:
    - prefer ISO-8601 formats
    - explicitly support legacy formats if required
    - document every implicit timezone decision
        
- `Instant` should be the **canonical storage and comparison type**.

---
## Related

- [[Why LocalDate is not a timestamp]]
- [[Timezones are a business decision]]    
- [[Instant as the canonical time type]]
