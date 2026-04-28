# HostingOcean Solutions — Project Delivery Process

## Overview

Every client project follows a structured six-phase delivery process designed to ensure quality, clear communication, and zero-surprise handoffs.

---

## Phase 1 — Discovery & Scoping (Days 1–5)

**Goal:** Fully understand what needs to be built before writing a single line of code.

**Activities:**
- Review the completed quote request from the admin dashboard
- Schedule a 30–60 minute discovery call with the client
- Document requirements in a brief (use the standard brief template)
- Identify third-party services or APIs the project depends on
- Define acceptance criteria for every deliverable

**Outputs:**
- Written project brief (shared with client for sign-off)
- Technology decision document (stack, hosting, integrations)
- Rough estimate with ±20% confidence bounds

---

## Phase 2 — Design & Architecture (Days 5–10)

**Goal:** Agree on the interface and technical approach before building.

**Activities:**
- Create wireframes or mockups for key screens (Figma or similar)
- Define the data model and API contract
- Identify potential technical risks and mitigation strategies
- Set up the project repository, CI pipeline, and staging environment

**Outputs:**
- Approved wireframes/mockups (client sign-off required)
- Architecture diagram (stored in repo under `docs/`)
- Staging environment URL

---

## Phase 3 — Development (Days 10–35)

**Goal:** Build the agreed scope. No scope creep without a formal change request.

**Activities:**
- Work in 1-week sprints with daily progress notes in the task board
- Push to `develop` branch; staging auto-deploys from `develop`
- Shared Loom video or written update at the end of each sprint
- Any out-of-scope requests are documented in a change request (CR) with impact on time/cost

**Outputs:**
- Working features on staging environment
- Sprint update notes
- Signed CR documents for any scope changes

---

## Phase 4 — QA & Review (Days 35–45)

**Goal:** Ensure the deliverable meets the acceptance criteria before client review.

**Activities:**
- Internal QA pass using the `qa-checklist.md`
- Client UAT (user acceptance testing) on staging
- Bug fixes and polish from UAT feedback
- Final approval from client in writing (email acceptable)

**Outputs:**
- Completed QA checklist
- UAT feedback log with resolution notes
- Written client sign-off

---

## Phase 5 — Deployment (Days 45–50)

**Goal:** Deploy to production with zero downtime and a tested rollback path.

**Activities:**
- Follow `deployment-guide.md` step by step
- Deploy during low-traffic window (preferably before 9 AM or after 9 PM)
- Verify all environment variables are set on the production server
- Smoke-test all critical user journeys post-deploy
- Monitor error logs for 24 hours post-deploy

**Outputs:**
- Production deployment confirmation
- Post-deploy smoke test checklist signed off
- Client notified with go-live confirmation

---

## Phase 6 — Handoff & Support (Days 50–60)

**Goal:** Leave the client fully equipped to run and maintain their product.

**Activities:**
- Deliver project handoff document (links, credentials, architecture notes)
- Record a walkthrough video of the admin interface (if applicable)
- Answer client questions during a 14-day support window
- Log known issues or future improvements in a separate backlog document

**Outputs:**
- Handoff document delivered
- Walkthrough recording shared
- Support window formally closed

---

## Change Request Process

When a client requests something outside the agreed scope:

1. Acknowledge the request immediately — never ignore it
2. Write up a CR note with: description, estimated hours, cost impact, timeline impact
3. Get written approval before doing any work
4. Log the CR as a separate item on the task board

---

## Communication Standards

- Respond to client messages within **4 business hours**
- Never promise a deadline you are not 95% confident you can meet
- Over-communicate progress — silence breeds anxiety
- All significant decisions must be confirmed in writing (email or message thread)
