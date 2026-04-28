# HostingOcean Solutions — QA Checklist

Complete this checklist before every client review and before every production deployment.

---

## 1. Functionality

- [ ] All navigation links work and route to the correct pages
- [ ] All forms submit successfully (happy path tested)
- [ ] All forms show appropriate validation errors on bad input
- [ ] Empty states display correctly (no data, no results)
- [ ] All API routes return correct status codes (200/201/400/404/500)
- [ ] Authentication-gated pages are inaccessible without correct credentials
- [ ] All interactive elements (dropdowns, modals, tabs) work as expected

---

## 2. Cross-Browser & Device Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest) — especially on macOS and iOS
- [ ] Edge (latest)
- [ ] Mobile — iOS Safari (375px viewport)
- [ ] Mobile — Android Chrome (360px viewport)
- [ ] Tablet — iPad / 768px breakpoint
- [ ] Desktop — 1280px and 1920px viewports

---

## 3. Performance

- [ ] Lighthouse Performance score ≥ 85 on mobile
- [ ] Lighthouse Performance score ≥ 95 on desktop
- [ ] No images without `width` and `height` attributes
- [ ] All images use appropriate formats (WebP/AVIF where supported)
- [ ] No render-blocking third-party scripts without `async` or `defer`
- [ ] Core Web Vitals: LCP < 2.5s, FID/INP < 200ms, CLS < 0.1

---

## 4. SEO

- [ ] Every page has a unique, descriptive `<title>` tag (50–60 characters)
- [ ] Every page has a unique `<meta name="description">` (120–160 characters)
- [ ] Open Graph tags present on all public pages (`og:title`, `og:description`, `og:image`)
- [ ] Sitemap is accessible at `/sitemap.xml` and contains all public pages
- [ ] `robots.txt` is accessible and correct
- [ ] No broken internal links (check with a crawler or manual pass)
- [ ] Structured data (JSON-LD) present on blog posts and product pages
- [ ] Canonical tags point to the correct URL

---

## 5. Accessibility

- [ ] All images have meaningful `alt` text (or `alt=""` for decorative images)
- [ ] Colour contrast ratio ≥ 4.5:1 for body text, ≥ 3:1 for large text
- [ ] Interactive elements are keyboard-navigable (Tab, Enter, Space, Escape)
- [ ] Focus indicators are visible on all interactive elements
- [ ] Forms have associated `<label>` elements for every input
- [ ] ARIA attributes used correctly where needed

---

## 6. Security

- [ ] No secrets or API keys committed to the repository
- [ ] All environment variables are loaded from `.env` / server environment
- [ ] Input validation on all API endpoints (reject unexpected fields)
- [ ] No sensitive data logged to console in production
- [ ] HTTP headers: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` set
- [ ] Dependencies have no known critical CVEs (`npm audit`)

---

## 7. Content & Copy

- [ ] No placeholder text (Lorem ipsum, "TODO", "TBC") on any visible page
- [ ] Contact details are accurate (email, phone, address if applicable)
- [ ] No typos in headings or CTAs
- [ ] All prices are correct and up to date

---

## 8. Post-Deployment Smoke Test

After every production deployment, verify these immediately:

- [ ] Homepage loads correctly
- [ ] Navigation works on mobile
- [ ] Quote form submits and sends notification email
- [ ] Admin dashboard loads and displays leads
- [ ] Blog listing and individual post pages load
- [ ] No JavaScript errors in the browser console
- [ ] No 500 errors in the server logs
