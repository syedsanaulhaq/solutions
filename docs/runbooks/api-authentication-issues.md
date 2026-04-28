# Runbook: API Authentication Issues

- **Service**: backend
- **Severity**: P2 (widespread auth failures → P1)
- **Last Reviewed**: 2026-04-26
- **Owner**: Platform Engineering / Support Team

---

## Overview

This runbook covers diagnosis and resolution of authentication failures on the HostingOcean backend API (`/api/*`). Authentication is enforced via `Authorization: Bearer <token>` headers on protected routes. This document applies to both customer-reported `401 Unauthorized` / `403 Forbidden` errors and internally detected auth-related alert spikes. Use this runbook whenever a user cannot authenticate, a client SDK reports auth errors, or auth error rates exceed baseline thresholds.

---

## Prerequisites

- [ ] Access to AWS CloudWatch Logs (log group: `/hostingocean/backend`)
- [ ] Access to the ECS console or `ecs-exec` permissions for the backend service
- [ ] `aws` CLI configured with appropriate read permissions
- [ ] Access to the secrets store (AWS Secrets Manager / `.env` in dev)
- [ ] The affected tenant ID, user ID, or API key (from the customer report or alert)

---

## Symptoms

- Customer reports: *"I get a 401 error every time I call the API"* or *"My API key stopped working"*
- Alert: elevated `4xx` error rate on `/api/*` routes in CloudWatch
- Log pattern:

  ```json
  {"timestamp":"...","level":"warn","message":"Unauthorized","meta":{"path":"/api/users","method":"GET"}}
  ```

- SDK clients (`@hostingocean/sdk`, Python SDK, PHP SDK) throw `HostingOceanError` with `statusCode: 401` or `403`
- Frontend shows login loop or "Session expired" banner

---

## Diagnosis

### Step 1 — Confirm the API is up and accepting requests

```bash
curl -sf https://api.hostingocean.com/api/health | jq .
```

Expected output:
```json
{ "status": "ok", "timestamp": "...", "uptime": 123, "version": "0.1.0" }
```

If this returns an error or times out, the issue is **service availability**, not auth — follow the backend-health runbook instead.

---

### Step 2 — Reproduce the auth failure

Replace `<TOKEN>` with the customer's reported token:

```bash
curl -i -H "Authorization: Bearer <TOKEN>" \
     https://api.hostingocean.com/api/users
```

Possible responses and what they mean:

| Response | Likely cause |
|---|---|
| `401` with `"Unauthorized"` | Token missing, malformed, expired, or not recognised |
| `403` with `"Forbidden"` | Token is valid but the caller lacks permission for this resource |
| `400` | Request malformed — not an auth issue |
| `500` | Auth middleware throwing an unhandled error — check logs immediately |

---

### Step 3 — Inspect the Authorization header format

A valid header must be exactly:
```
Authorization: Bearer eyJ...
```

Common malformation patterns:

```bash
# Wrong — "bearer" lowercase only (case-sensitive check in some middleware versions)
Authorization: bearer eyJ...

# Wrong — missing "Bearer " prefix
Authorization: eyJ...

# Wrong — extra whitespace
Authorization: Bearer  eyJ...  (double space)

# Wrong — token contains literal "Bearer" twice
Authorization: Bearer Bearer eyJ...
```

Ask the customer or check the SDK request logs for the raw header value.

---

### Step 4 — Decode and inspect the token

```bash
# Decode JWT payload without verifying signature (diagnosis only)
echo "<TOKEN>" | cut -d'.' -f2 | base64 -d 2>/dev/null | jq .
```

Check:
- `exp` (expiry epoch) — compare to `date +%s`; if `exp < now`, the token is **expired**
- `iss` (issuer) — must match the expected issuer for this environment
- `aud` (audience) — must match the API's expected audience value
- `sub` (subject) — should be a valid user/tenant ID

```bash
# Quick expiry check
EXP=$(echo "<TOKEN>" | cut -d'.' -f2 | base64 -d 2>/dev/null | jq -r '.exp')
NOW=$(date +%s)
echo "Token expires in $((EXP - NOW)) seconds"
```

If the result is negative, the token is expired — see **Resolution A**.

---

### Step 5 — Check backend logs for the specific request

```bash
# CloudWatch — last 100 auth-related log lines
aws logs filter-log-events \
  --log-group-name /hostingocean/backend \
  --filter-pattern '"401" OR "403" OR "Unauthorized" OR "Forbidden"' \
  --start-time $(date -d '30 minutes ago' +%s000) \
  --query 'events[].message' \
  --output text \
  | tail -50
```

Look for:
- `"TokenExpiredError"` — token has expired
- `"JsonWebTokenError"` — token is malformed or signature verification failed
- `"jwt secret"` or `"secret"` — secret may be misconfigured (never log the secret value itself)
- `"invalid signature"` — signing secret mismatch between issuer and verifier

---

### Step 6 — Verify the JWT secret / JWKS configuration

```bash
# Check the secret is present in the running container environment
aws ecs execute-command \
  --cluster hostingocean-<ENV> \
  --task <TASK_ID> \
  --container backend \
  --interactive \
  --command "printenv | grep -i jwt | grep -v SECRET_VALUE"
```

Expected: `JWT_SECRET` (or equivalent) is set and non-empty. **Do not print its value in any log or ticket.**

If the variable is missing or empty, the auth middleware will fail on every request — see **Resolution C**.

---

### Step 7 — Check CORS for browser-originated failures

If the report comes from a browser client (frontend or embedded widget):

```bash
# Confirm the CORS_ORIGIN env var matches the frontend's origin
aws ecs execute-command \
  --cluster hostingocean-<ENV> \
  --task <TASK_ID> \
  --container backend \
  --interactive \
  --command "printenv CORS_ORIGIN"
```

Expected: `https://app.hostingocean.com` (or the correct origin for the environment).

A CORS mismatch causes the browser to block the preflight request before the `Authorization` header is even sent, producing a network error that looks like an auth failure on the client side.

---

## Resolution

### Option A — Token Expired

> **When to use**: `exp` field in token payload is in the past.

The client must obtain a new token. This is expected behaviour, not a platform defect.

**For customers using the API directly:**
- Instruct them to re-authenticate via `POST /api/auth/token` (or the applicable auth endpoint) to obtain a new access token.
- If using a refresh token flow, advise them to call the refresh endpoint before expiry.

**For customers whose tokens expire too quickly:**
- Check the token TTL configuration in the auth service. Default should be 1 hour for access tokens, 30 days for refresh tokens.
- If TTL was recently shortened (e.g. during a security incident), notify affected customers.

Verify resolution:
```bash
curl -i -H "Authorization: Bearer <NEW_TOKEN>" \
     https://api.hostingocean.com/api/users
# Expect: 200 OK
```

---

### Option B — Malformed Token / Invalid Signature

> **When to use**: Logs show `JsonWebTokenError` or `invalid signature`; token decodes but claims look wrong.

**Step 1** — Confirm the token was issued by the correct service (not a test token used in production, or a token from a different environment).

**Step 2** — If the signing secret was recently rotated:
- Tokens issued before rotation are invalid immediately (no grace period by default).
- Identify the rotation timestamp from Secrets Manager version history.
- Notify affected users that they must re-authenticate.

**Step 3** — If no recent rotation, the token may have been tampered with or truncated in transit. Ask the customer to re-authenticate and re-test.

Verify resolution:
```bash
curl -i -H "Authorization: Bearer <FRESH_TOKEN>" \
     https://api.hostingocean.com/api/users
# Expect: 200 OK
```

---

### Option C — JWT Secret Missing or Misconfigured in Environment

> **When to use**: All requests return `401`; logs show auth middleware error; `JWT_SECRET` env var is empty or missing from the container.

**This is a P1 incident if it affects production.**

**Step 1** — Identify the correct secret value from AWS Secrets Manager:
```bash
aws secretsmanager get-secret-value \
  --secret-id hostingocean/<ENV>/jwt-secret \
  --query 'SecretString' \
  --output text
```

**Step 2** — Update the ECS task definition environment variable and force a new deployment:
```bash
# Update the secret reference in the task definition, then redeploy
aws ecs update-service \
  --cluster hostingocean-<ENV> \
  --service backend \
  --force-new-deployment
```

**Step 3** — Monitor the deployment rollout:
```bash
aws ecs wait services-stable \
  --cluster hostingocean-<ENV> \
  --services backend
```

Verify resolution:
```bash
curl -i -H "Authorization: Bearer <VALID_TOKEN>" \
     https://api.hostingocean.com/api/users
# Expect: 200 OK
```

---

### Option D — CORS Blocking Browser Auth Requests

> **When to use**: Browser console shows CORS preflight failure; backend logs show no request was received at all.

**Step 1** — Update `CORS_ORIGIN` in the ECS task definition to match the frontend's exact origin (scheme + hostname + port):
```
CORS_ORIGIN=https://app.hostingocean.com
```

Multiple origins require comma-separated values if supported, or a wildcard pattern (avoid `*` in production for credentialed requests).

**Step 2** — Redeploy:
```bash
aws ecs update-service \
  --cluster hostingocean-<ENV> \
  --service backend \
  --force-new-deployment
```

Verify resolution by retrying the browser request and confirming the `Access-Control-Allow-Origin` response header is present and correct.

---

### Option E — 403 Forbidden (Valid Token, Missing Permission)

> **When to use**: Token decodes correctly and is not expired, but the API returns `403`.

The user is authenticated but not authorised for the requested resource. This is an **authorisation** issue, not an authentication issue.

- Check the user's role/permission assignments in the database or identity provider.
- Confirm the route's permission requirement matches the user's role.
- If this is a new route or recently changed permission model, verify the middleware was applied correctly in `backend/src/api/routes/`.
- Do **not** escalate as an auth outage — open a separate access-control investigation ticket.

---

## Rollback

If a secret rotation or environment variable change caused the regression:

```bash
# Revert to the previous task definition revision
PREVIOUS_REVISION=$(aws ecs describe-services \
  --cluster hostingocean-<ENV> \
  --services backend \
  --query 'services[0].taskDefinition' \
  --output text | sed 's/:[0-9]*$/:PREV_REVISION_NUMBER/')

aws ecs update-service \
  --cluster hostingocean-<ENV> \
  --service backend \
  --task-definition $PREVIOUS_REVISION
```

---

## Escalation

If unresolved after **30 minutes**:

| Level | Contact | Channel |
|---|---|---|
| L1 | On-call support engineer | PagerDuty — "API Auth" policy |
| L2 | Backend platform engineer | Slack `#backend-oncall` |
| L3 | Security team (if credential compromise suspected) | Slack `#security-incidents` + email security@hostingocean.com |

**If credential compromise is suspected** (e.g. a valid secret is being used by an unknown party), immediately rotate the `JWT_SECRET` via Secrets Manager and trigger an emergency redeployment — do not wait for normal escalation.

---

## Post-Incident

- [ ] Incident ticket created and linked to affected tenant(s)
- [ ] Root cause identified and documented in the ticket
- [ ] If secret was exposed: security incident process initiated
- [ ] If CORS misconfiguration: deployment pipeline reviewed for env var validation
- [ ] Customer notified with resolution summary and any required re-authentication steps
- [ ] This runbook updated if diagnosis steps were unclear or incomplete

---

## References

- [backend/src/middleware/errorHandler.js](../../backend/src/middleware/errorHandler.js)
- [backend/src/app.js](../../backend/src/app.js) — CORS and helmet configuration
- [backend/src/config/index.js](../../backend/src/config/index.js) — environment variable reference
- [clients/js-sdk/src/HostingOceanClient.js](../../clients/js-sdk/src/HostingOceanClient.js) — SDK Authorization header implementation
- [JWT.io debugger](https://jwt.io/) — decode tokens during diagnosis
- [AWS Secrets Manager — Rotating secrets](https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html)
