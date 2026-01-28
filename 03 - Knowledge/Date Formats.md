---
domain: dev
type: concept
topics:
  - "[[backend]]"
status: evergreen
---
## Claim

> Date formats describe _representation_, not _meaning_.  
> Only representations that include a time **and** an offset/zone describe a moment on the timeline.

---
## Explanation

Date and time formats fall into a small number of conceptual categories.  
The most important distinction is whether a format encodes a **timeline moment** or merely a **calendar value**.

A format that lacks either:
- a **time**, or
- a **timezone / offset**

cannot unambiguously represent a moment in time.

---
## 1. Timeline-safe formats (unambiguous)

These formats include both **time** and **offset/zone** and can be placed directly on the timeline.

### ISO-8601 Instant (UTC)

```
2025-01-19T10:15:30Z
2025-01-19T10:15:30.123Z
```

**Meaning**
- Always UTC
- Globally unambiguous


**Caveats**
- None
- Preferred for APIs, logs, and storage

---
### ISO-8601 Offset Date-Time (colon offset)

```
2025-01-19T10:15:30+02:00
2025-01-19T10:15:30.123+00:00
```

**Meaning**
- Local time + explicit offset from UTC
- Represents a precise moment


**Caveats**
- Offset ≠ timezone (DST rules are not encoded)
- Same local time may map to different instants depending on offset
    
---

### RFC-822 Offset Date-Time (no colon, legacy)

```
2025-01-19T10:15:30+0000
2025-01-19T10:15:30.123+0200
```

**Meaning**
- Equivalent to ISO offset formats
- Common in legacy systems and databases

**Caveats**
- Legacy format
- Often inconsistent (millis optional)
- Still unambiguous if offset is present


---

## 2. Context-dependent formats (require interpretation)

These formats do **not** encode a complete moment and require an external rule.

---

### Local Date-Time (no offset)

```
2025-01-19T10:15:30
2025-01-19T10:15:30.123
```

**Meaning**
- Date and time, but _no location in time_


**Caveats**
- Requires a timezone assumption
- DST ambiguity (gaps and overlaps)
- Unsafe for storage without context

---
### Date-only

```
2025-01-19
```

**Meaning**
- A calendar date    
- No time, no offset


**Caveats**
- Not a moment
- Must be interpreted via a business rule:
    - start of day UTC
    - start of day local 
    - noon UTC (DST-safe trick)   
    - reject entirely  

---

## 3. Zone-based formats (partially ambiguous)

### Timezone-named date-time

```
2025-01-19T10:15:30 Europe/Paris
```

**Meaning**
- Local time + IANA timezone rules


**Caveats**
- Requires up-to-date timezone database
- Historical DST rules may change
- Still ambiguous during DST transitions without disambiguation

---

## 4. Common industry formats & pitfalls

### UNIX Epoch (seconds / milliseconds)

```
1705668930
1705668930123
```

**Meaning**
- Seconds or milliseconds since 1970-01-01T00:00:00Z


**Caveats**
- Unit ambiguity (seconds vs millis)
- Loses human readability
- Leap seconds ignored


---

### HTTP / RFC-1123 dates

```
Sun, 19 Jan 2025 10:15:30 GMT
```

**Meaning**
- UTC timestamp used in HTTP headers


**Caveats**
- Textual month/day names
- Locale-sensitive if improperly parsed

---

### Custom / localized formats

```
19/01/2025
01-19-2025
```

**Meaning**
- Human-oriented display formats


**Caveats*
- Locale dependent    
- Ambiguous across regions
- Should never be used for APIs or storage


---
## Implications

- Not all date formats represent time equally
- Offset or zone is required for unambiguous moments
- Date-only values encode **business meaning**, not time
- Storage and comparison should use:
    - ISO-8601 instants
    - or epoch timestamps
    
- Parsing logic must:
    - explicitly document assumptions
    - reject or normalize ambiguous formats


---

## Rules of thumb

- **APIs:** ISO-8601 with offset or `Z`
- **Storage:** UTC instants or epoch millis
- **UI:** localized, human-readable formats
- **Finance / billing:** never rely on system timezone

---

## Related

- [[Dates are not instants]]
- [[Timezones are a business decision]]
- [[Why date-only values are dangerous]]
- [[UTC as a storage standard]]
