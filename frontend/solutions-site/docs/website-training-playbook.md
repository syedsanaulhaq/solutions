# Website Training Playbook (ECP-style)

Use this playbook to train an agent from website content quickly and safely.

## 1) Build a source pack

Run:

```bash
node scripts/build-website-knowledge-pack.mjs tmp/ecp-voter-pack.md \
  https://ecp.gov.pk/for-voters \
  https://ecp.gov.pk/how-to-register \
  https://ecp.gov.pk/check-your-registration \
  https://ecp.gov.pk/faqs \
  https://ecp.gov.pk/electoral-databases \
  https://ecp.gov.pk/8300-sms-service \
  https://ecp.gov.pk/national-voters-day
```

This creates a plain-text pack with URL-level excerpts.

## 2) Curate before training

- Remove navigation noise and repeated boilerplate.
- Keep only actionable facts and procedures.
- Preserve source URLs so the model can cite official pages.
- Mark uncertain or changing facts as "verify on source".

## 3) Ground the assistant

- Add the curated pack to the system context (or prompt template).
- Add behavior rules:
  - non-partisan
  - do not invent forms/deadlines
  - redirect to official source on uncertainty
- Keep response format short and coach-like for voice UI.

## 4) Refresh cadence

- Rebuild pack weekly or on content updates.
- Diff new pack vs old pack before replacing.
- Keep versioned snapshots under source control.

## 5) Production checks

- Ask 20 test questions from the sourced domain.
- Verify each answer maps to real source content.
- Confirm fallback answer appears for out-of-scope questions.

## 6) Security and compliance

- Avoid scraping restricted or private areas.
- Respect terms of use and robots policies.
- Do not store personal data in the knowledge pack.

