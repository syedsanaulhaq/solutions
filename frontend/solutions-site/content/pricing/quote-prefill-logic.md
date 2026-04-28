# Quote Form Prefill Logic — Query Parameter Mapping

The Get a Quote form at `/get-a-quote` reads URL query parameters on mount and uses them to pre-populate form fields. This allows CTAs on any page to pre-select the relevant service, reducing friction for the user.

---

## Supported Query Parameters

| Parameter | Form Field | Accepted Values |
|---|---|---|
| `service` | Service selector | See service options below |
| `budget` | Budget selector | See budget options below |
| `source` | Hidden (tracked in lead) | Any string, e.g. `calculator`, `blog`, `pricing` |

### `service` parameter values

These must match the option labels exactly (URL-encoded):

| URL Value | Label Shown |
|---|---|
| `AI+Chatbot+Development` | AI Chatbot Development |
| `LMS+Development` | LMS Development |
| `React+%2F+Next.js+Development` | React / Next.js Development |
| `Node.js+API+Development` | Node.js API Development |
| `Automation+%26+Integrations` | Automation & Integrations |
| `Other+%2F+Not+Sure+Yet` | Other / Not Sure Yet |

### `budget` parameter values

| URL Value | Label Shown |
|---|---|
| `Under+%C2%A35%2C000` | Under £5,000 |
| `%C2%A35%2C000+%E2%80%93+%C2%A315%2C000` | £5,000 – £15,000 |
| `%C2%A315%2C000+%E2%80%93+%C2%A330%2C000` | £15,000 – £30,000 |
| `%C2%A330%2C000+%E2%80%93+%C2%A360%2C000` | £30,000 – £60,000 |
| `%C2%A360%2C000%2B` | £60,000+ |
| `Not+Sure+Yet` | Not Sure Yet |

---

## Implementation — Reading Params in the Form Component

The quote form component should read from `useSearchParams()` on mount and set the initial state:

```typescript
// src/app/get-a-quote/page.tsx (or the form component)
'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const SERVICE_OPTIONS = [
  'AI Chatbot Development',
  'LMS Development',
  'React / Next.js Development',
  'Node.js API Development',
  'Automation & Integrations',
  'Other / Not Sure Yet',
];

const BUDGET_OPTIONS = [
  'Under £5,000',
  '£5,000 – £15,000',
  '£15,000 – £30,000',
  '£30,000 – £60,000',
  '£60,000+',
  'Not Sure Yet',
];

export default function QuoteForm() {
  const searchParams = useSearchParams();
  
  const [service, setService] = useState('');
  const [budget, setBudget] = useState('');

  useEffect(() => {
    const rawService = searchParams.get('service') ?? '';
    const rawBudget = searchParams.get('budget') ?? '';

    // Match decoded param value against known option labels
    const matchedService = SERVICE_OPTIONS.find(
      opt => opt.toLowerCase() === decodeURIComponent(rawService).toLowerCase()
    );
    const matchedBudget = BUDGET_OPTIONS.find(
      opt => opt.toLowerCase() === decodeURIComponent(rawBudget).toLowerCase()
    );

    if (matchedService) setService(matchedService);
    if (matchedBudget) setBudget(matchedBudget);
  }, [searchParams]);

  // ... rest of form
}
```

---

## Example CTA URLs

### Service-specific CTAs (no budget pre-selected)

```
AI Chatbot:
/get-a-quote?service=AI+Chatbot+Development

LMS Development:
/get-a-quote?service=LMS+Development

React/Next.js:
/get-a-quote?service=React+%2F+Next.js+Development

Node.js:
/get-a-quote?service=Node.js+API+Development

Automation:
/get-a-quote?service=Automation+%26+Integrations
```

### With budget pre-selected (from pricing calculator result)

```
Mid-range chatbot project:
/get-a-quote?service=AI+Chatbot+Development&budget=%C2%A315%2C000+%E2%80%93+%C2%A330%2C000

Enterprise LMS:
/get-a-quote?service=LMS+Development&budget=%C2%A360%2C000%2B

Small automation:
/get-a-quote?service=Automation+%26+Integrations&budget=%C2%A35%2C000+%E2%80%93+%C2%A315%2C000
```

### With source tracking

```
From blog:
/get-a-quote?service=AI+Chatbot+Development&source=blog

From pricing calculator:
/get-a-quote?service=LMS+Development&budget=%C2%A315%2C000+%E2%80%93+%C2%A330%2C000&source=calculator

From service page:
/get-a-quote?service=Automation+%26+Integrations&source=service-page
```

---

## Pricing Calculator → Quote Form Handoff

When the pricing calculator displays a result, the "Get a Detailed Proposal" CTA should encode both service and budget from the calculator state:

```typescript
// src/app/pricing-calculator/page.tsx (result CTA)
function ResultCTA({ service, budgetRange }: { service: string; budgetRange: string }) {
  const quoteUrl = `/get-a-quote?${new URLSearchParams({
    service,
    budget: budgetRange,
    source: 'calculator',
  }).toString()}`;

  return (
    <a href={quoteUrl}>
      Get a Detailed Proposal →
    </a>
  );
}
```

The `URLSearchParams` constructor handles encoding automatically — no manual URL-encoding needed.

---

## Lead Source Tracking in the API

The `source` parameter is passed through to the quote API and stored in the lead record:

```typescript
// In the form submission handler:
const response = await fetch('/api/quote', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name,
    email,
    service,
    budget,
    description,
    source: searchParams.get('source') ?? 'form', // 'form' is the default
  }),
});
```

The lead record in `data/leads.json` will then include `"source": "calculator"` or `"source": "blog"`, allowing you to filter leads by acquisition channel in the admin dashboard.

---

## Recommended CTA URL Reference Table

| Page | Service | Budget | Source | Full URL |
|---|---|---|---|---|
| Homepage hero | — | — | homepage | `/get-a-quote?source=homepage` |
| AI Chatbot service page | AI Chatbot Development | — | service-chatbot | `/get-a-quote?service=AI+Chatbot+Development&source=service-chatbot` |
| LMS service page | LMS Development | — | service-lms | `/get-a-quote?service=LMS+Development&source=service-lms` |
| Automation service page | Automation & Integrations | — | service-automation | `/get-a-quote?service=Automation+%26+Integrations&source=service-automation` |
| AI Chatbot blog post | AI Chatbot Development | — | blog | `/get-a-quote?service=AI+Chatbot+Development&source=blog` |
| LMS blog post | LMS Development | — | blog | `/get-a-quote?service=LMS+Development&source=blog` |
| Pricing calculator | (dynamic) | (dynamic) | calculator | Built dynamically — see URLSearchParams example above |
| Portfolio page | — | — | portfolio | `/get-a-quote?source=portfolio` |
