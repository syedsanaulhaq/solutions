# Analytics & Event Tracking Guide

This guide documents all analytics events implemented in `src/lib/analytics.ts`, with usage examples, GA4 custom event names, and Plausible event names.

## Implementation Overview

The analytics stack is configured in `src/components/Analytics.tsx`:

- **Google Analytics 4** — via `gtag.js` (script tag with `GA_MEASUREMENT_ID` env var)
- **Plausible Analytics** — via `plausible.js` (script tag with `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` env var)
- **Microsoft Clarity** — for heatmaps and session recording (via `NEXT_PUBLIC_CLARITY_ID` env var)

The `track()` function in `src/lib/analytics.ts` fires **both** Plausible and GA4 from a single call. It is safe to call server-side (no-ops when `window` is unavailable).

### Required Environment Variables

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=solutions.hostingocean.co.uk
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx
```

---

## Generic Track Function

```typescript
import { track } from '@/lib/analytics'

// fires both Plausible and GA4
track('event_name', { prop1: 'value', prop2: 42 })
```

**Never throws** — analytics failures are caught and silenced so they cannot break the application.

---

## All Tracked Events

### 1. `quote_submit`

Fired when the quote request form is submitted successfully.

```typescript
import { trackQuoteSubmit } from '@/lib/analytics'

trackQuoteSubmit(service, budget)
// e.g. trackQuoteSubmit('AI Chatbot Development', '£10k–£25k')
```

| Parameter | Type | Description |
|---|---|---|
| `service` | string | Selected service from the form |
| `budget` | string | Selected budget band |

**Where it fires:** `src/components/QuoteForm.tsx` (on successful API response)

**GA4 custom event name:** `quote_submit`  
**Plausible event name:** `quote_submit`

**GA4 setup:** In GA4 → Configure → Events → Mark as conversion. Add to funnel.

---

### 2. `calculator_open`

Fired when the pricing calculator is opened or the page is visited.

```typescript
import { trackCalculatorOpen } from '@/lib/analytics'

trackCalculatorOpen()
```

**Where it fires:** `src/app/pricing-calculator/page.tsx` (on mount)

**GA4 custom event name:** `calculator_open`  
**Plausible event name:** `calculator_open`

---

### 3. `calculator_result`

Fired when the pricing calculator completes and shows a result.

```typescript
import { trackCalculatorResult } from '@/lib/analytics'

trackCalculatorResult(service, complexity)
// e.g. trackCalculatorResult('LMS Development', 'complex')
```

| Parameter | Type | Description |
|---|---|---|
| `service` | string | Service type selected |
| `complexity` | string | `'simple'` \| `'moderate'` \| `'complex'` |

**Where it fires:** `src/components/PricingCalculator.tsx` (when estimate is computed)

---

### 4. `cta_click`

Fired when any CTA button is clicked.

```typescript
import { trackCTAClick } from '@/lib/analytics'

trackCTAClick(label, location)
// e.g. trackCTAClick('Get a Quote', 'homepage-hero')
// e.g. trackCTAClick('Start Free Trial', 'chatbot-pricing-card')
// e.g. trackCTAClick('Try Calculator', 'blog-footer-cta')
```

| Parameter | Type | Description |
|---|---|---|
| `label` | string | Button text / CTA name |
| `location` | string | Where on the page the CTA lives |

**Suggested location values:**
- `homepage-hero`
- `homepage-pricing-cta`
- `service-page-hero`
- `blog-post-footer`
- `pricing-calculator-sidebar`
- `navbar`
- `footer`

**Where to add:** Any `<Button>` or `<Link>` component that is a key conversion CTA.

---

### 5. `blog_read`

Fired when a visitor reaches the bottom of a blog article (article read-through).

```typescript
import { trackBlogRead } from '@/lib/analytics'

trackBlogRead(slug, category)
// e.g. trackBlogRead('complete-guide-building-custom-lms-from-scratch', 'LMS Development')
```

| Parameter | Type | Description |
|---|---|---|
| `slug` | string | Blog post slug |
| `category` | string | Blog post category |

**Where it fires:** `src/components/BlogReadTracker.tsx` (Intersection Observer on article end)

**Use for:** Content performance. High `blog_read` → `quote_submit` conversion rate indicates strong bottom-funnel content.

---

### 6. `newsletter_signup`

Fired when the newsletter signup form is submitted successfully.

```typescript
import { trackNewsletterSignup } from '@/lib/analytics'

trackNewsletterSignup(source)
// e.g. trackNewsletterSignup('blog-footer')
// e.g. trackNewsletterSignup('homepage-cta')
```

| Parameter | Type | Description |
|---|---|---|
| `source` | string | Where the signup form was embedded |

**Where it fires:** `src/components/NewsletterSignup.tsx`

---

### 7. `outbound_click`

Fired when a visitor clicks an external/outbound link.

```typescript
import { trackOutboundLink } from '@/lib/analytics'

trackOutboundLink(url)
// e.g. trackOutboundLink('https://github.com/...')
```

---

### 8. `social_share`

Fired when a social share button is clicked.

```typescript
import { trackSocialShare } from '@/lib/analytics'

trackSocialShare(platform, contentType)
// e.g. trackSocialShare('twitter', 'blog-post')
// e.g. trackSocialShare('linkedin', 'case-study')
```

| Parameter | Type | Description |
|---|---|---|
| `platform` | string | `'twitter'` \| `'linkedin'` \| `'copy'` |
| `content_type` | string | Type of content being shared |

**Where it fires:** `src/components/SocialShare.tsx`

---

## Adding a New Event

1. Add a typed helper function to `src/lib/analytics.ts`:

```typescript
export function trackNewEvent(param1: string, param2: string): void {
  track('new_event_name', { param1, param2 })
}
```

2. Import and call it in the component:

```typescript
import { trackNewEvent } from '@/lib/analytics'

// In event handler or useEffect:
trackNewEvent('value1', 'value2')
```

3. Document it in this file with the parameters table and where it fires.

4. Register it in GA4 → Configure → Events if it needs to appear in reports (GA4 auto-collects custom events but they need to be marked as conversions manually if relevant).

---

## GA4 Conversion Events to Configure

In GA4 dashboard (Configure → Events → Mark as conversion):

| Event | Why it matters |
|---|---|
| `quote_submit` | Primary conversion — new lead received |
| `newsletter_signup` | Email list growth |
| `calculator_result` | Strong purchase intent signal |

---

## Plausible Goals to Configure

In Plausible dashboard (Goals section):

| Goal name | Event name |
|---|---|
| Quote Submit | `quote_submit` |
| Calculator Open | `calculator_open` |
| Calculator Result | `calculator_result` |
| Newsletter Signup | `newsletter_signup` |
| Blog Read Complete | `blog_read` |

---

## Useful GA4 Explorations

### Blog → Quote funnel

1. GA4 → Explore → Funnel
2. Step 1: `page_view` with page_path matching `/blog/*`
3. Step 2: `blog_read` (article read-through)
4. Step 3: `cta_click` with label containing "Quote"
5. Step 4: `quote_submit`

### Calculator engagement

1. `calculator_open` → `calculator_result` conversion rate
2. Break down by `service` dimension to see which services drive the most calculator completions

### Top converting content

1. GA4 → Explore → Free Form
2. Dimension: `page_path`
3. Metric: `conversions` (filtered to `quote_submit`)
4. Filter: page_path starts with `/blog/`
