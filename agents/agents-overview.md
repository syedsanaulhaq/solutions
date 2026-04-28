# HostingOcean — Agents Overview

**Last updated**: 2026-04-26

This document provides a summary of all AI agents in the HostingOcean platform, their roles, responsibilities, tools, and boundaries. Each agent has a dedicated `system.md` file with full details.

---

## Agent Roster

| Agent            | System Prompt                                      | Primary Domain                          |
|------------------|----------------------------------------------------|-----------------------------------------|
| Code Agent       | [system.md](code-agent/system.md)       | Software development & code maintenance |
| DevOps Agent     | [system.md](devops-agent/system.md)     | Infrastructure, CI/CD & deployments     |
| Docs Agent       | [system.md](docs-agent/system.md)       | Technical documentation                 |
| Chatbot Agent    | [system.md](chatbot-agent/system.md)    | Conversational AI & chatbot flows       |
| Research Agent   | [system.md](research-agent/system.md)   | Technology research & analysis          |
| Support Agent    | [system.md](support-agent/system.md)    | Customer support & issue triage         |

---

## Agent Summaries

### Code Agent
**Purpose**: Write, edit, review, and maintain code across all platform modules — backend, frontend, infrastructure, agents, clients, products, and tooling.

**Key responsibilities**:
- Feature development end-to-end across all workspace folders
- Bug fixing with root-cause analysis and test coverage
- Code review and targeted refactoring
- Security: OWASP Top 10 compliance on all code written or modified

**Tools**: `read`, `edit`, `search`, `execute`, `todo`
**Writes to**: `backend/src/`, `backend/tests/`, `backend/scripts/`, `frontend/src/`, `frontend/public/`, `frontend/tests/`, `agents/`, `clients/*/src/`, `clients/*/tests/`, `products/`, `tools/`
**Read-only on**: `infrastructure/`, `docs/`
**Commits to**: `develop` branch

---

### DevOps Agent
**Purpose**: Manage infrastructure provisioning, CI/CD pipelines, deployments, database operations, secrets, monitoring, and operational reliability across all environments.

**Key responsibilities**:
- IaC authoring and maintenance (`infrastructure/`)
- CI/CD pipeline creation and debugging
- Coordinated deployments including DB migrations in the same rollout
- Secrets management via platform secret stores — never in source control
- Monitoring, alerting, and runbook maintenance
- Cost management and resource hygiene

**Tools**: `read`, `edit`, `search`, `execute`, `todo`
**Writes to**: `infrastructure/terraform/`, `infrastructure/pipelines/`, `infrastructure/docker/`, `infrastructure/scripts/`, `tools/scripts/`, `docs/runbooks/`, `backend/scripts/`, `backend/src/config/`
**Read-only on**: `backend/src/` (non-config), `frontend/`, `docs/` (except runbooks)
**Environments**: `development` → `staging` → `production`
**Commits to**: `develop` branch; production applies require explicit confirmation

---

### Docs Agent
**Purpose**: Create, maintain, and improve all platform documentation — keeping it accurate, audience-appropriate, and in sync with the codebase.

**Key responsibilities**:
- API reference documentation (verified against source code)
- Architecture Decision Records (ADRs) with sequential IDs
- Runbooks for operational procedures
- README files for every workspace folder
- Onboarding and developer guides
- Changelogs following Keep a Changelog format
- Technical specifications

**Tools**: `read`, `edit`, `search`, `todo`
**Writes to**: `docs/api/`, `docs/adr/`, `docs/guides/`, `docs/specs/`, `docs/changelogs/`, `*/README.md` (workspace roots)
**Read-only on**: `docs/runbooks/` (DevOps Agent owns), `docs/research/` (Research Agent owns), all source code

---

### Chatbot Agent
**Purpose**: Design, build, and maintain conversational AI experiences — customer support bots, onboarding assistants, billing assistants, and internal helpdesk bots.

**Key responsibilities**:
- Conversation flow design (goal-oriented, ≤5 turns to resolution)
- Intent and entity management with diverse training utterances
- Response authoring in HostingOcean brand voice
- Escalation and human handoff logic with full context transfer
- Knowledge base content management in `docs/`
- Backend API integration for chatbot actions
- Safety guardrails and prompt injection prevention

**Tools**: `read`, `edit`, `search`, `todo`
**Writes to**: `agents/chatbot-agent/`, `docs/guides/`, `frontend/src/components/` (chatbot widget), `frontend/src/services/` (chatbot API), `backend/src/api/` (chatbot endpoints), `backend/src/services/` (chatbot logic)
**Read-only on**: `docs/` (except guides), `products/`, all other source folders
**Bots covered**: Customer Support, Onboarding Assistant, Billing Assistant, Internal Helpdesk

---

### Research Agent
**Purpose**: Investigate, analyze, and synthesize information to inform technical and product decisions — producing structured, evidence-based research outputs.

**Key responsibilities**:
- Technology evaluation against consistent criteria (performance, security, cost, fit)
- Vendor and third-party service assessment (SLA, pricing, lock-in, security certs)
- Competitive analysis of the hosting market
- Best practices and standards research (OWASP, NIST, CNCF, RFCs)
- Proof of concept documentation
- Decision briefs ready for conversion to ADRs

**Tools**: `read`, `search`, `web`, `todo`
**Writes to**: `docs/research/`, `docs/adr/`
**Read-only on**: All source code, infrastructure, and all other `docs/` subfolders

---

### Support Agent
**Purpose**: Investigate customer-reported issues, diagnose root causes, draft empathetic support responses, and escalate complex cases with structured context.

**Key responsibilities**:
- Issue diagnosis (customer-side vs. platform-side)
- Support response drafting with precise, actionable steps
- Ticket triage and classification by tier, product area, and severity
- Structured escalation with full context summaries
- Knowledge base contribution for novel issues
- Billing and account support (surfaces requests for approval — does not apply autonomously)
- Security incident handling with immediate Tier 3 escalation

**Tools**: `read`, `search`, `web`, `todo`
**Writes to**: `docs/runbooks/`, `docs/guides/`
**Read-only on**: `docs/api/`, `products/`, `backend/`, `infrastructure/`, all source code
**Support tiers**: Tier 1 (common) → Tier 2 (technical) → Tier 3 (engineering/DevOps)

---

## Tool Matrix

| Agent          | read | edit | search | execute | web | todo |
|----------------|:----:|:----:|:------:|:-------:|:---:|:----:|
| Code Agent     | ✓    | ✓    | ✓      | ✓       |     | ✓    |
| DevOps Agent   | ✓    | ✓    | ✓      | ✓       |     | ✓    |
| Docs Agent     | ✓    | ✓    | ✓      |         |     | ✓    |
| Chatbot Agent  | ✓    | ✓    | ✓      |         |     | ✓    |
| Research Agent | ✓    |      | ✓      |         | ✓   | ✓    |
| Support Agent  | ✓    |      | ✓      |         | ✓   | ✓    |

---

## Shared Constraints (All Agents)

- **Branch policy**: Always commit and push to `develop`. Never push directly to `main` without a deployment flow.
- **Destructive operations**: Always require explicit user confirmation (delete, drop, reset, force-push).
- **Secrets**: Never commit credentials, tokens, or connection strings to source control.
- **Scope discipline**: Only modify files relevant to the assigned task.
- **Security**: Follow OWASP Top 10 on any code or configuration touched.

---

## Write Scope Matrix

| Folder                        | Code | DevOps | Docs | Chatbot | Research | Support |
|-------------------------------|:----:|:------:|:----:|:-------:|:--------:|:-------:|
| `backend/src/api/`            | W    | —      | R    | W       | R        | R       |
| `backend/src/controllers/`    | W    | —      | R    | —       | R        | R       |
| `backend/src/services/`       | W    | —      | R    | W       | R        | R       |
| `backend/src/models/`         | W    | —      | R    | —       | R        | R       |
| `backend/src/middleware/`     | W    | —      | R    | —       | R        | R       |
| `backend/src/config/`         | W    | W      | R    | —       | R        | R       |
| `backend/src/utils/`          | W    | —      | R    | —       | R        | R       |
| `backend/tests/`              | W    | —      | R    | —       | R        | R       |
| `backend/scripts/`            | W    | W      | R    | —       | R        | R       |
| `frontend/src/components/`    | W    | —      | R    | W       | R        | —       |
| `frontend/src/pages/`         | W    | —      | R    | —       | R        | —       |
| `frontend/src/services/`      | W    | —      | R    | W       | R        | —       |
| `frontend/src/` (other)       | W    | —      | R    | —       | R        | —       |
| `frontend/tests/`             | W    | —      | R    | —       | R        | —       |
| `infrastructure/terraform/`   | R    | W      | R    | —       | R        | R       |
| `infrastructure/pipelines/`   | R    | W      | R    | —       | R        | R       |
| `infrastructure/docker/`      | R    | W      | R    | —       | R        | R       |
| `infrastructure/scripts/`     | R    | W      | R    | —       | R        | R       |
| `clients/*/src/`              | W    | —      | R    | —       | R        | —       |
| `clients/*/tests/`            | W    | —      | R    | —       | R        | —       |
| `products/`                   | W    | —      | R    | R       | R        | R       |
| `tools/scripts/`              | W    | W      | R    | —       | R        | —       |
| `tools/cli/`                  | W    | —      | R    | —       | R        | —       |
| `tools/generators/`           | W    | —      | R    | —       | R        | —       |
| `docs/api/`                   | R    | R      | W    | R       | R        | R       |
| `docs/adr/`                   | R    | R      | W    | R       | W        | R       |
| `docs/runbooks/`              | R    | W      | R    | R       | R        | W       |
| `docs/guides/`                | R    | R      | W    | W       | R        | W       |
| `docs/research/`              | R    | R      | R    | R       | W        | R       |
| `docs/specs/`                 | R    | R      | W    | R       | R        | R       |
| `docs/changelogs/`            | R    | R      | W    | R       | R        | R       |
| `agents/chatbot-agent/`       | R    | —      | R    | W       | R        | —       |
| `agents/` (other)             | W    | —      | R    | R       | R        | —       |
| `*/README.md`                 | R    | R      | W    | R       | R        | R       |

**W** = Write, **R** = Read, **—** = No access needed
