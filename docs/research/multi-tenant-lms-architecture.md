# Research: Multi-Tenant LMS Architecture Options

- **Author**: Research Agent
- **Date**: 2026-04-26
- **Status**: Complete
- **Scope**: Evaluate architectural patterns, data isolation models, platform choices, and integration approaches for adding a multi-tenant Learning Management System capability to HostingOcean.
- **Triggered by**: Product requirement to offer managed LMS as a hosted service alongside existing domain and hosting products.

---

## 1. Executive Summary

A multi-tenant LMS must serve multiple independent customer organisations ("tenants") from shared infrastructure while guaranteeing data isolation, brand customisation, independent feature flags, and per-tenant billing. Four architectural patterns are viable; two are realistic for HostingOcean's current AWS + Node.js + Docker stack. The recommendation is a **silo-per-tenant database with a shared application tier** in the near term, migrating toward a **pool model with row-level security** once the tenant count exceeds ~200. Moodle is the lowest-risk open-source LMS engine to embed; its PHP runtime is already referenced in prior project scope.

---

## 2. Problem Definition

HostingOcean needs to offer LMS hosting as a product (analogous to managed WordPress/cPanel). Key requirements:

| Requirement | Detail |
|---|---|
| Tenant isolation | One tenant's data must never be visible to another, even on misconfiguration |
| Custom branding | Each tenant controls their domain, logo, colour scheme, email templates |
| Independent lifecycle | Tenants can be provisioned, suspended, upgraded, and deleted independently |
| Scale range | Support from 1 to 10,000+ tenants on the same platform |
| Compliance | FERPA (US education), GDPR (EU); audit logs per tenant |
| Cost efficiency | Infrastructure cost per tenant must decrease as platform scales |
| Operational simplicity | Provisioning a new tenant should be fully automated |

---

## 3. Multi-Tenancy Patterns Evaluated

### 3.1 Silo Model — One Database (and optionally one instance) per Tenant

Each tenant gets a fully isolated database schema or DB instance and may get a dedicated application container.

**Isolation level**: Maximum — hardware/process boundary.

| Aspect | Detail |
|---|---|
| Data isolation | Complete; no risk of cross-tenant leakage |
| Customisation | Trivial — per-tenant config, schema migrations, plugins independent |
| Compliance | Easiest; data residency can be enforced at the DB level |
| Performance | Predictable; no noisy-neighbour problem |
| Provisioning | Slower; spinning up a DB per tenant adds ~30–90 s |
| Cost at scale | High — 1,000 tenants = 1,000 DB instances (RDS cost prohibitive) |
| Operational overhead | High — schema migrations must fan out across every tenant DB |

**Best fit**: Low tenant count (< 200), enterprise/regulated customers, dedicated-hosting SKU.

---

### 3.2 Pool Model — Shared Database, Tenant ID Column + Row-Level Security

All tenants share one (or a small number of) database instances. Every table carries a `tenant_id` column; application code or database-level RLS enforces scoping.

**Isolation level**: Logical — strong if RLS is implemented at the DB layer (PostgreSQL RLS policies); weaker if enforced only in application code.

| Aspect | Detail |
|---|---|
| Data isolation | Good with PostgreSQL RLS; risk if application layer is the only guard |
| Customisation | Managed via a `tenants` config table; plugin/theme state requires careful schema design |
| Compliance | Feasible; GDPR right-to-erasure is a bulk delete by `tenant_id` |
| Performance | Shared indices; cross-tenant index bloat; risk of noisy-neighbour queries |
| Provisioning | Fast — inserting a tenant record takes milliseconds |
| Cost at scale | Low — 10,000 tenants on a handful of DB instances |
| Operational overhead | Low — one migration run updates all tenants |

**Best fit**: High tenant count, SMB/self-service market, cost-sensitive deployments.

---

### 3.3 Bridge Model — Shared Application, Per-Tenant Schema (PostgreSQL schemas)

One database server, one database, but each tenant gets their own PostgreSQL schema (namespace). The `search_path` is set per connection.

**Isolation level**: Medium — schema separation provides good logical isolation; still shares the DB process.

| Aspect | Detail |
|---|---|
| Data isolation | Good; schema boundaries prevent accidental cross-tenant joins |
| Customisation | Per-schema migrations possible but require orchestration |
| Compliance | Data deletion is a `DROP SCHEMA` — fast and clean |
| Performance | Schema-per-tenant bloats the pg_catalog; degrades above ~1,000 schemas |
| Provisioning | Moderate — `CREATE SCHEMA` + run migrations per tenant (~5–15 s) |
| Cost at scale | Medium — fewer DB instances than silo; but performance ceiling lower than pool |
| Operational overhead | Medium — migrations must iterate schemas; tooling support is patchy |

**Best fit**: Mid-range tenant counts (200–2,000), where isolation is important but full silo cost is prohibitive.

---

### 3.4 Hybrid Model — Tiered Isolation by Tenant Plan

Enterprise tenants get silo isolation; SMB tenants share a pool. The platform dynamically routes connections based on tenant tier stored in a central control plane.

| Aspect | Detail |
|---|---|
| Data isolation | Configurable per tier |
| Customisation | Full on enterprise; limited on shared |
| Compliance | Per-tier SLA and audit scope |
| Performance | Enterprise: predictable; SMB: pool trade-offs |
| Provisioning | Complex routing logic; tenant record must carry connection metadata |
| Cost at scale | Optimal — premium tenants pay for silo; SMB subsidised by pooling |
| Operational overhead | High — two migration pipelines, two monitoring strategies |

**Best fit**: SaaS products with tiered pricing (Starter / Business / Enterprise).

---

## 4. LMS Engine Options

### 4.1 Moodle

- **Language**: PHP 8.x
- **Licence**: GPLv3
- **Multi-tenancy**: Not natively multi-tenant in a single instance; each tenant typically gets their own Moodle instance. MoodleNet/HQ projects are exploring shared-instance multi-tenancy but are not production-ready.
- **Database**: MySQL / MariaDB / PostgreSQL
- **Deployment**: Docker-compose or Kubernetes; official Docker images maintained.
- **Extensibility**: ~1,800 plugins; strong LTI 1.3, xAPI (Tin Can), SCORM support.
- **Operational notes**: Moodle instances are stateful (data directory for uploads); session handling must be externalised (Redis) for horizontal scaling.
- **Fit for HostingOcean**: High — silo-per-tenant maps cleanly to one Moodle container + one DB per tenant. Automation via Moodle CLI (`moosh` or native admin CLI) is mature.

### 4.2 Canvas LMS (Instructure)

- **Language**: Ruby on Rails
- **Licence**: AGPLv3 (open-source core)
- **Multi-tenancy**: Natively multi-tenant via its "root account" sub-account hierarchy within a single instance.
- **Database**: PostgreSQL (required)
- **Deployment**: Complex; requires Postgres, Redis, Cassandra (jobs), and a dedicated background worker fleet. Minimum viable self-hosted deployment is resource-intensive (~8–16 GB RAM).
- **Fit for HostingOcean**: Medium — native multi-tenancy is attractive, but the operational overhead of self-hosting Canvas is very high. Best considered for a large-scale dedicated offering.

### 4.3 Open edX

- **Language**: Python (Django)
- **Licence**: AGPL v3
- **Multi-tenancy**: "Organizations" and "Sites" support logical multi-tenancy in a single deployment via the Tutor operator.
- **Database**: MySQL + MongoDB + Elasticsearch + Redis (minimum stack).
- **Deployment**: Tutor (Kubernetes-native operator) is the recommended path.
- **Fit for HostingOcean**: Low for v1 — polyglot data stack (MySQL + Mongo + Elastic) conflicts with the platform's PostgreSQL-centric infrastructure. High DevOps investment before first customer.

### 4.4 Custom LMS (Build)

- Build on Node.js + Express (already in the stack), React frontend, PostgreSQL.
- LTI 1.3 provider, xAPI statement store, course/module/quiz primitives.
- Full control over multi-tenancy model.
- **Fit for HostingOcean**: Only viable if the product requires deep differentiation. Time-to-market is 9–18 months for a feature-competitive LMS. Not recommended for v1.

---

## 5. Comparison Matrix

| Criterion | Moodle (silo) | Canvas (single-instance) | Open edX (Tutor) | Custom Build |
|---|---|---|---|---|
| Multi-tenancy maturity | ★★★ (via automation) | ★★★★★ | ★★★★ | ★★ (built from scratch) |
| Operational complexity | ★★★ | ★★ | ★★ | ★★★★ |
| Feature completeness | ★★★★ | ★★★★★ | ★★★★★ | ★ |
| Standards compliance (LTI, xAPI, SCORM) | ★★★★★ | ★★★★★ | ★★★★ | ★ |
| AWS + Docker fit | ★★★★ | ★★★ | ★★★ | ★★★★★ |
| Time to first tenant | Days | Weeks | Weeks | Months |
| Cost at 1,000 tenants | High (DB per tenant) | Low | Medium | N/A |
| Vendor/community risk | Low | Medium (Instructure controls) | Medium (2U controls) | None |
| PHP in stack | Yes (new runtime) | No | No | No |

---

## 6. Infrastructure Architecture (Recommended: Moodle Silo on AWS)

```
┌─────────────────────────────────────────────────────────────────────┐
│  Control Plane (HostingOcean backend — Node.js/Express)             │
│  - Tenant provisioning API (/api/lms/tenants)                       │
│  - Lifecycle management (create, suspend, delete, upgrade)          │
│  - Billing integration                                              │
└──────────────────────────┬──────────────────────────────────────────┘
                           │  Terraform / SDK automation
          ┌────────────────▼─────────────────────────────┐
          │            AWS ECS / EKS                      │
          │  ┌──────────────┐  ┌──────────────┐           │
          │  │ Tenant A     │  │ Tenant B     │  ...      │
          │  │ Moodle       │  │ Moodle       │           │
          │  │ (container)  │  │ (container)  │           │
          │  └──────┬───────┘  └──────┬───────┘           │
          │         │                 │                    │
          │  ┌──────▼───────┐  ┌──────▼───────┐           │
          │  │ RDS Postgres │  │ RDS Postgres │  ...      │
          │  │ (tenant-a)   │  │ (tenant-b)   │           │
          │  └──────────────┘  └──────────────┘           │
          └──────────────────────────────────────────────┘
                           │
          ┌────────────────▼──────────────────────────────┐
          │  Shared Services                              │
          │  - ElastiCache Redis (session store per tenant)│
          │  - S3 (moodledata per tenant, separate prefix) │
          │  - CloudFront (CDN, tenant custom domains)     │
          │  - Route 53 (wildcard + per-tenant CNAME)      │
          │  - SES (per-tenant email identity)             │
          └───────────────────────────────────────────────┘
```

**Provisioning automation sequence:**
1. Control plane receives `POST /api/lms/tenants` with tenant config.
2. Terraform (or SDK) creates: RDS instance, ECS task definition, S3 prefix, Route 53 record.
3. Moodle CLI run inside a one-shot container: `install`, `admin user`, `site config`.
4. ECS service started; health-check passes; tenant marked active.
5. Billing meter starts.

---

## 7. Migration Path: Silo → Pool

When tenant count approaches 500+, RDS-per-tenant becomes cost-prohibitive:

1. Introduce **Aurora PostgreSQL** with logical replication; pool tenants onto shared clusters using `tenant_id` + **PostgreSQL Row-Level Security policies**.
2. Small/free-tier tenants move to pool; premium tenants keep dedicated instances.
3. Moodle requires patching to inject `tenant_id` into every query or to set `search_path` per request — this requires a custom Moodle plugin or a middleware proxy (PgBouncer with tenant-aware routing).
4. This is a non-trivial migration; plan for 2–3 engineering sprints.

---

## 8. Key Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Moodle PHP runtime adds operational surface | Medium | Medium | Containerise fully; no bare-metal Moodle; use official Docker image |
| RDS cost explosion at scale | High | High | Architect silo-first but design provisioning API to support pool routing from day 1 |
| Moodle upgrades break custom plugins | Medium | High | Pin Moodle version in container image; staged upgrade pipeline per tenant |
| Data leakage across tenants | Low | Critical | Network-level isolation (separate VPC subnets or security groups per tenant); RDS not publicly accessible |
| GDPR right-to-erasure complexity | Medium | High | Silo model makes deletion a single `DROP DATABASE`; document this in runbooks |
| Per-tenant domain TLS management | Medium | Medium | AWS Certificate Manager + CloudFront with SNI; automate via ACM wildcard + per-tenant SAN |

---

## 9. Recommendations

1. **Phase 1 (0–200 tenants)**: Deploy Moodle in a silo model — one ECS task + one RDS PostgreSQL instance per tenant. Automate provisioning via the HostingOcean control plane + the existing Terraform `ec2` module (extend with an `lms` module). Use S3 for `moodledata` with per-tenant key prefix.

2. **Phase 2 (200–2,000 tenants)**: Introduce Aurora Serverless v2 shared clusters for SMB tenants. Route connections through PgBouncer. Enterprise tenants remain on dedicated RDS. Build tenant-tier routing into the control plane.

3. **Phase 3 (2,000+ tenants)**: Evaluate Canvas or Open edX for a fully native multi-tenant shared instance, or invest in a custom LMS layer built on the existing Node.js stack with the pool + RLS pattern.

4. **Do not build a custom LMS in Phase 1** — the feature gap versus Moodle is too large for the timeline.

5. **Create a Terraform `lms` module** extending the existing `ec2` module to encapsulate per-tenant ECS task, RDS instance, S3 prefix, and Route 53 record as a single reusable unit.

---

## 10. Suggested Follow-on ADRs

- `ADR-0002`: LMS engine selection (Moodle vs Canvas vs Open edX)
- `ADR-0003`: Multi-tenancy isolation model (silo vs pool vs bridge)
- `ADR-0004`: Tenant provisioning automation approach (Terraform vs CDK vs custom SDK)

---

## 11. References

- [Moodle Docker official image](https://hub.docker.com/r/bitnami/moodle)
- [Canvas LMS open-source](https://github.com/instructure/canvas-lms)
- [Open edX Tutor operator](https://docs.tutor.edly.io/)
- [PostgreSQL Row-Level Security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- [AWS Multi-Tenant SaaS patterns (whitepapers)](https://docs.aws.amazon.com/whitepapers/latest/saas-architecture-fundamentals/multi-tenant-architecture.html)
- [moosh — Moodle Shell](https://moosh-online.com/)
- [infrastructure/terraform/modules/ec2](../../../infrastructure/terraform/modules/ec2/main.tf)
- [ADR-0001 — Express.js backend framework](../adr/adr-0001-express-backend-framework.md)
