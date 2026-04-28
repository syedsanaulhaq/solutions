# Spec: {Title}

- **Status**: Draft | In Review | Approved | Implemented | Deprecated
- **Author**: {Name}
- **Date**: YYYY-MM-DD
- **Version**: 0.1.0
- **Related ADR**: [ADR-{NUMBER}](../adr/adr-{number}.md)

---

## 1. Overview

> A concise summary (2–4 sentences) of what is being built, why it is needed, and what success looks like.

## 2. Goals

- **G1** — {Specific, measurable goal}
- **G2** — {Specific, measurable goal}

## 3. Non-Goals

> Explicitly list what this spec does NOT cover to prevent scope creep.

- This spec does not address {X}
- Authentication / authorization is out of scope unless stated otherwise

## 4. Background & Context

> Any domain knowledge, prior art, or decisions a reader needs to understand this spec. Link to ADRs, research docs, or external references.

## 5. Requirements

### 5.1 Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-1 | {The system shall…} | Must |
| FR-2 | {The system shall…} | Should |
| FR-3 | {The system shall…} | Could |

Priority scale: **Must** (MVP blocker) / **Should** (important) / **Could** (nice to have)

### 5.2 Non-Functional Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-1 | Latency (p95) | < 200 ms |
| NFR-2 | Availability | 99.9 % |
| NFR-3 | {Security / compliance} | {Standard} |

## 6. Design

### 6.1 High-Level Architecture

> Insert diagram or describe component interactions.

```
[Component A] --> [Component B] --> [Data store]
```

### 6.2 Data Model

```
{EntityName}
  id          UUID        PK
  field       VARCHAR(255)
  createdAt   TIMESTAMP
  updatedAt   TIMESTAMP
```

### 6.3 API Contract

> Reference or inline the relevant API doc section.

See [API docs](../api/{resource}.md)

### 6.4 Error Handling

| Scenario | Behaviour |
|----------|-----------|
| {Input invalid} | Return `400 VALIDATION_ERROR` |
| {Resource not found} | Return `404 NOT_FOUND` |
| {Dependency down} | Return `503`, log, alert |

## 7. Security Considerations

- Input validation: {describe approach}
- Authentication: {describe approach}
- Data sensitivity: {PII / PCI / none}
- Threat model: {link or inline}

## 8. Testing Plan

| Test type | Coverage target | Tool |
|-----------|----------------|------|
| Unit | 80 % | Jest / pytest / PHPUnit |
| Integration | Key flows | Supertest |
| E2E | Happy path + 2 error paths | Playwright |

## 9. Rollout Plan

1. **Phase 1** — {Internal / staging}: {Date}
2. **Phase 2** — {Canary / % of traffic}: {Date}
3. **Phase 3** — **Full rollout**: {Date}

Feature flag: `{flag_name}` (if applicable)

## 10. Open Questions

| # | Question | Owner | Due | Status |
|---|----------|-------|-----|--------|
| 1 | {Question} | {Name} | YYYY-MM-DD | Open |

## 11. References

- 
