# Runbook: {Title}

- **Service**: {e.g. backend, database, frontend}
- **Severity**: P1 | P2 | P3
- **Last Reviewed**: YYYY-MM-DD
- **Owner**: {Team or person}

---

## Overview

> One paragraph describing what this runbook covers — the system, the scenario, and when to use this document.

## Prerequisites

- [ ] Access to {system / console / dashboard}
- [ ] `{tool}` installed and configured
- [ ] Permissions: {required role or IAM policy}

## Symptoms

> Describe what operators observe that triggers this runbook (alerts, error messages, user reports).

- Alert: `{alert name}` firing in {monitoring system}
- Log pattern: `{example log line}`
- User impact: {describe visible effect}

---

## Diagnosis

### Step 1 — Verify the issue

```bash
# Check service health
{command}
```

Expected output:
```
{expected}
```

If output differs, proceed to Step 2.

### Step 2 — Check logs

```bash
# Tail recent errors
{command}
```

Look for: `{error pattern}`

### Step 3 — Check dependencies

```bash
# Verify database connectivity
{command}

# Verify downstream service
{command}
```

---

## Resolution

### Option A — {Quick fix / restart}

> When to use: {condition}

```bash
{command}
```

Verify resolution:

```bash
{verification command}
```

---

### Option B — {Deeper fix}

> When to use: {condition}

1. Step one
2. Step two
3. Step three

---

## Rollback

> If the resolution worsens the situation, follow these steps to roll back.

```bash
{rollback command}
```

---

## Escalation

If unresolved after **{N} minutes**, escalate:

| Level | Contact | Channel |
|-------|---------|---------|
| L1 | On-call engineer | PagerDuty |
| L2 | {Team lead} | Slack `#{channel}` |
| L3 | {Service owner} | {Contact} |

---

## Post-Incident

- [ ] Incident ticket created in {system}
- [ ] Timeline documented
- [ ] Root cause identified
- [ ] Follow-up tasks created
- [ ] This runbook updated if steps were unclear

## References

- [Architecture diagram]()
- [Related ADR]()
- [Monitoring dashboard]()
