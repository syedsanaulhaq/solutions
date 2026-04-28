# ADR-0001: Use Express.js as the Backend API Framework

- **Status**: Accepted
- **Date**: 2026-04-26
- **Deciders**: Platform Engineering Team
- **Tags**: backend, architecture, node

---

## Context

HostingOcean requires a backend HTTP API to serve the frontend SPA, SDK clients (JS, Python, PHP), and future internal services. The platform is a hosting product with needs typical of a control-plane API: RESTful resource management, authentication middleware, request validation, structured logging, and a clear path to adding background workers and webhooks later.

The team is JavaScript-first — the same language is used across the frontend (React/Vite), the CLI tooling, and the JS SDK. Node.js was already chosen as the runtime to unify the stack and reduce context-switching overhead. The key decision was which HTTP framework to build on top of that runtime.

Constraints that influenced the decision:

- **Team fluency** — the team has existing Express.js experience; a steep learning curve would slow initial delivery.
- **Ecosystem maturity** — the framework must have a large, stable middleware ecosystem (auth, validation, logging, rate-limiting).
- **Minimal abstraction overhead** — the API surface area is well-understood; a thin framework is preferable to an opinionated full-stack solution.
- **Long-term maintainability** — the framework must be actively maintained with a clear LTS/security-patch story.
- **Container-first deployment** — no framework-specific runtime requirements; must work cleanly inside a Node 20 Alpine Docker image.

## Decision

We will use **Express.js 4.x** (targeting the 4.19+ release line) as the HTTP framework for the backend API, with a modular structure separating routes, controllers, services, and middleware.

## Consequences

### Positive

- Immediate productivity — the team ships without a learning curve.
- Enormous middleware ecosystem (`helmet`, `cors`, `morgan`, `express-validator`, `passport`, `express-rate-limit`, etc.) covers every cross-cutting concern without writing custom solutions.
- Extremely lightweight: no ORM, no template engine, no CLI scaffold forced on the project — dependencies are opted into deliberately.
- Widely understood by contractors, new hires, and the open-source community; onboarding is fast.
- Plays well with any test runner (Jest + Supertest is the de facto standard for integration testing Express apps).
- No framework-specific Docker considerations; runs as a plain Node.js process.

### Negative

- Express 4.x is in maintenance mode; Express 5.x (which supports async error propagation natively) is in RC but not yet stable at decision time. We must manage async errors manually via `asyncHandler` wrappers until Express 5 is adopted.
- Express provides minimal structure out of the box — the team must enforce conventions (route → controller → service layering, centralised error handling) through code review and linting rather than framework guardrails.
- No built-in dependency injection; testing services in isolation requires manual mocking patterns.
- Performance ceiling is lower than native-HTTP frameworks (Fastify, Hono) for high-throughput scenarios, though this is not a current bottleneck.

### Neutral / Trade-offs

- Express 5.x migration is a planned future step; the current modular architecture is designed to make the upgrade low-risk (no Express-specific abstractions leak into controllers or services).
- Choosing a thin framework means more upfront architecture decisions (error handling strategy, validation library, logging format) that an opinionated framework would prescribe. These were made explicitly and documented in the codebase.

## Considered Alternatives

| Option | Pros | Cons | Reason rejected |
|--------|------|------|-----------------|
| **Fastify** | Native async support, JSON schema validation built-in, significantly faster throughput | Lower team familiarity, plugin system has steeper learning curve, smaller middleware ecosystem | Speed advantage not needed at current scale; team ramp-up cost outweighs benefit |
| **NestJS** | Strong opinionated structure, TypeScript-first, built-in DI, decorators | Heavyweight for an API of this size, forces TypeScript immediately, hides HTTP layer behind abstractions | Over-engineered for current scope; TypeScript migration deferred to a future ADR |
| **Hapi.js** | Built-in validation (Joi), strong plugin isolation | Declining community adoption, steeper API surface, less middleware availability | Community momentum does not justify adoption risk |
| **Koa** | Cleaner async middleware model (Express 5 predecessor), smaller core | Even smaller ecosystem than Express, middleware not drop-in compatible | Does not offer enough improvement over Express 5 to justify ecosystem tradeoff |
| **Plain Node.js `http`** | Zero dependencies, maximum control | Significant boilerplate for routing, middleware chaining, body parsing | Not sustainable for a team-maintained production API |

## References

- [Express.js 4.x documentation](https://expressjs.com/en/4x/api.html)
- [Express.js 5.x release notes (RC)](https://expressjs.com/en/guide/migrating-5.html)
- [Fastify benchmarks](https://fastify.dev/benchmarks/)
- [backend/src/app.js](../../backend/src/app.js) — current Express app configuration
- [backend/package.json](../../backend/package.json) — declared dependencies
