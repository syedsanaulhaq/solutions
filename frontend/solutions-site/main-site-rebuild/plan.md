# Main HostingOcean.co.uk Site Rebuild Plan

**Objective:** Rebuild the main hostingocean.co.uk website using the Solutions design system (Next.js 15, Tailwind CSS, ShadCN UI) to create a unified brand experience across all HostingOcean properties.

**Current state:** hostingocean.co.uk is the main domain serving hosting/domain products via WHMCS. The Solutions site (solutions.hostingocean.co.uk) is a separate Next.js application.

**Target state:** hostingocean.co.uk rebuilt in Next.js, serving as the parent brand — with hosting products via WHMCS integration, and Solutions as a prominent service offering on the same domain or subdomain.

---

## 1. Architecture Decision

### Option A: Unified single domain (Recommended)

```
hostingocean.co.uk/             ← Next.js homepage
hostingocean.co.uk/hosting/     ← Hosting products (Next.js pages, add-to-cart links WHMCS)
hostingocean.co.uk/domains/     ← Domain search (WHMCS iframe or API)
hostingocean.co.uk/solutions/   ← Migrated from solutions subdomain
hostingocean.co.uk/support/     ← Link to WHMCS client area
hostingocean.co.uk/blog/        ← Unified blog
my.hostingocean.co.uk/          ← WHMCS client area (unchanged)
```

**Pros:** Single domain authority for SEO, unified brand, no subdomain confusion.  
**Cons:** More complex deployment — Apache proxy rules required for WHMCS coexistence.

### Option B: Subdomain model (Current + enhanced)

```
hostingocean.co.uk/         ← Rebuilt in Next.js (hosting/domain focus)
solutions.hostingocean.co.uk/ ← Keep as-is (already deployed)
my.hostingocean.co.uk/      ← WHMCS client area (unchanged)
```

**Pros:** Simpler — each app deploys independently. Existing VPS setup unchanged.  
**Cons:** Split domain authority, separate SEO profiles.

**Recommendation:** Option B for speed-to-market (3–4 weeks). Option A after 6 months if both sites are established.

---

## 2. Folder Structure (New Next.js Site)

```
frontend/
  main-site/
    src/
      app/
        page.tsx                 ← Homepage
        layout.tsx               ← Root layout (Navbar, Footer, Analytics)
        hosting/
          shared-hosting/
            page.tsx
          vps/
            page.tsx
          dedicated/
            page.tsx
          reseller/
            page.tsx
        domains/
          page.tsx               ← Domain search
          transfer/
            page.tsx
        solutions/
          page.tsx               ← Link/redirect to solutions.hostingocean.co.uk
        blog/
          page.tsx               ← Blog index
          [slug]/
            page.tsx             ← Blog post
        support/
          page.tsx               ← Support hub / link to client area
        about/
          page.tsx
        contact/
          page.tsx
        api/
          domain-check/
            route.ts             ← WHMCS domain availability API wrapper
          newsletter/
            route.ts
      components/
        ui/                      ← ShadCN components (copied from solutions-site)
        Navbar.tsx
        Footer.tsx
        Analytics.tsx
        DomainSearchBox.tsx
        PricingTable.tsx
        HostingCTA.tsx
      lib/
        analytics.ts             ← Same as solutions-site
        whmcs.ts                 ← WHMCS API client
        seo.ts
      data/
        hosting-plans.json       ← Shared hosting tiers, prices
        domain-pricing.json      ← TLD pricing
    public/
    next.config.js               ← output: 'standalone'
    tailwind.config.ts           ← Same brand tokens as solutions-site
    package.json
```

---

## 3. Page Structure

### Homepage (`/`)

**Sections:**
1. Hero — "Professional web hosting for UK businesses" — domain search box as primary CTA
2. Hosting categories strip — Shared, VPS, Dedicated, Reseller (icon cards)
3. Popular hosting plans — 3-tier pricing table (Starter, Business, Pro)
4. Domain pricing — Common TLDs with live pricing
5. Solutions CTA strip — "Need custom software? Visit HostingOcean Solutions →"
6. Trust signals — uptime, UK support, years in business, customer count
7. Blog previews — 3 latest posts
8. Footer — full nav, social links, legal links

---

### Hosting pages (`/hosting/shared-hosting`, etc.)

**Sections:**
1. Hero — plan headline + key specs
2. Features list (icon grid)
3. Pricing table — 3 tiers with WHMCS "Order Now" links
4. FAQ
5. CTA — "Not sure? Contact us" + live chat link

**WHMCS integration note:** "Order Now" buttons link directly to WHMCS cart: `https://my.hostingocean.co.uk/cart.php?a=add&pid=[PRODUCT_ID]`

---

### Domain search (`/domains`)

**Sections:**
1. Domain search box (calls `/api/domain-check` → WHMCS API)
2. TLD pricing table
3. Bulk domain checker link (WHMCS)
4. Domain transfer section
5. FAQ

---

### Blog (`/blog`)

Reuse the same blog data pattern from solutions-site (`data/blog.json`) but with hosting-focused content. Both sites can share a single CMS or use separate `blog.json` files per site.

---

### Support (`/support`)

1. Links to `my.hostingocean.co.uk` for tickets / client area
2. Knowledge base links
3. Status page link
4. Contact form

---

## 4. WHMCS Integration Plan

### A. Product catalogue sync

Create a `src/lib/whmcs.ts` module wrapping the WHMCS API:

```typescript
// src/lib/whmcs.ts
const WHMCS_API_URL = process.env.WHMCS_API_URL!;  // e.g. https://my.hostingocean.co.uk/includes/api.php
const WHMCS_API_ID = process.env.WHMCS_API_IDENTIFIER!;
const WHMCS_API_SECRET = process.env.WHMCS_API_SECRET!;

export async function getProducts(groupId?: number) {
  const params = new URLSearchParams({
    action: 'GetProducts',
    identifier: WHMCS_API_ID,
    secret: WHMCS_API_SECRET,
    responsetype: 'json',
    ...(groupId ? { gid: String(groupId) } : {}),
  });
  const res = await fetch(`${WHMCS_API_URL}?${params}`, { next: { revalidate: 3600 } });
  return res.json();
}

export async function checkDomain(domain: string) {
  const params = new URLSearchParams({
    action: 'DomainWhois',
    identifier: WHMCS_API_ID,
    secret: WHMCS_API_SECRET,
    responsetype: 'json',
    domain,
  });
  const res = await fetch(`${WHMCS_API_URL}?${params}`);
  return res.json();
}
```

### B. Domain availability check

`/api/domain-check` Route Handler wraps the WHMCS `DomainWhois` action. The domain search box on the Next.js site calls this endpoint, keeping WHMCS credentials server-side.

```typescript
// src/app/api/domain-check/route.ts
export async function GET(req: NextRequest) {
  const domain = req.nextUrl.searchParams.get('domain');
  if (!domain) return NextResponse.json({ error: 'No domain provided' }, { status: 400 });
  const result = await checkDomain(domain);
  return NextResponse.json(result);
}
```

### C. Order flow

All "Order Now" / "Add to Cart" buttons link directly to WHMCS with product IDs:

```
https://my.hostingocean.co.uk/cart.php?a=add&pid=1   ← Starter hosting
https://my.hostingocean.co.uk/cart.php?a=add&pid=2   ← Business hosting
https://my.hostingocean.co.uk/cart.php?a=add&pid=3   ← Pro hosting
```

Map product IDs from WHMCS admin → update `data/hosting-plans.json` with the correct IDs.

### D. Client area

`my.hostingocean.co.uk` remains the WHMCS client area. The main Next.js site links out to it:
- "Login" → `https://my.hostingocean.co.uk/clientarea.php`
- "My Tickets" → `https://my.hostingocean.co.uk/supporttickets.php`
- "Manage Services" → `https://my.hostingocean.co.uk/clientarea.php?action=services`

### E. Required WHMCS env vars

```
WHMCS_API_URL=https://my.hostingocean.co.uk/includes/api.php
WHMCS_API_IDENTIFIER=your_api_identifier
WHMCS_API_SECRET=your_api_secret
```

---

## 5. Design System — Shared Tokens

Both sites use the same Tailwind config. Copy `tailwind.config.ts` from solutions-site verbatim:

```typescript
// Brand tokens (shared)
colors: {
  brand: {
    blue: '#2563EB',     // primary
    dark: '#0F172A',     // backgrounds
    sky: '#38BDF8',      // accents
  },
}
```

ShadCN components: copy `src/components/ui/` from solutions-site. No changes needed — same design primitives apply.

---

## 6. Deployment Plan

### VPS setup (separate PM2 process)

The main site runs as a second PM2 process on the same VPS:

```bash
# Server structure
/var/www/hostingocean.co.uk/
  frontend/
    main-site/
      deploy/       ← Next.js standalone build
        .next/
          standalone/
            server.js   ← node server, PORT=3001
          static/
```

### Apache virtual host

```apache
# /etc/apache2/sites-available/hostingocean.co.uk.conf
<VirtualHost *:443>
    ServerName hostingocean.co.uk
    ServerAlias www.hostingocean.co.uk

    ProxyPass /whmcs/ https://my.hostingocean.co.uk/ nocanon
    ProxyPassReverse /whmcs/ https://my.hostingocean.co.uk/

    ProxyPass / http://localhost:3001/
    ProxyPassReverse / http://localhost:3001/

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/hostingocean.co.uk/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/hostingocean.co.uk/privkey.pem
</VirtualHost>
```

### PM2 process

```bash
PORT=3001 pm2 start .next/standalone/server.js --name main-site
pm2 save
```

### Build & deploy script (same pattern as solutions-site)

```powershell
# Local build
npm run build
tar -czf standalone.tar.gz -C .next/standalone .
tar -czf static.tar.gz -C .next/static .

# Upload
pscp -batch -pw "PASSWORD" standalone.tar.gz static.tar.gz root@95.111.247.141:/var/www/hostingocean.co.uk/frontend/main-site/

# Deploy
plink -batch -pw "PASSWORD" root@95.111.247.141 "cd /var/www/hostingocean.co.uk/frontend/main-site && rm -rf deploy && mkdir -p deploy/.next/static && tar -xzf standalone.tar.gz -C deploy && tar -xzf static.tar.gz -C deploy/.next/static && pm2 restart main-site && echo OK"
```

---

## 7. DNS Switch Plan

### Current state (assumed)

```
hostingocean.co.uk     A      → VPS IP (Apache, currently serving WHMCS or old site)
www.hostingocean.co.uk CNAME  → hostingocean.co.uk
my.hostingocean.co.uk  A      → VPS IP (WHMCS client area, same server)
```

### Switch sequence (zero-downtime)

**Step 1 — Pre-switch (before DNS change):**
- Deploy the Next.js main site to the VPS on port 3001
- Verify it's working at `http://95.111.247.141:3001` directly
- Configure the Apache vhost for `hostingocean.co.uk` to proxy → 3001
- Test the Apache vhost using a local `/etc/hosts` override before cutting DNS

**Step 2 — Reduce TTL (24–48 hours before switch):**
- Set `hostingocean.co.uk` A record TTL to 300 seconds (5 min)
- This minimises propagation time when you cut over

**Step 3 — Switch (planned maintenance window, off-peak):**
- Confirm the Apache vhost is active and PM2 process is running
- No DNS change needed if the VPS IP is the same — only Apache config changes
- If hosting a new IP: update the A record to point to the new server
- Monitor for 15 minutes post-switch

**Step 4 — SSL certificate:**
```bash
certbot --apache -d hostingocean.co.uk -d www.hostingocean.co.uk
```

**Step 5 — Verify:**
```bash
curl -s -o /dev/null -w "%{http_code}" https://hostingocean.co.uk/
# Expected: 200
curl -s -o /dev/null -w "%{http_code}" https://my.hostingocean.co.uk/
# Expected: 200 (WHMCS unaffected)
```

### WHMCS isolation

`my.hostingocean.co.uk` must remain pointing at WHMCS throughout. It has its own Apache vhost and is not affected by the main site changes. The only risk is if both are on the same IP and Apache config is edited carelessly — take a backup of `/etc/apache2/sites-available/` before making any changes.

---

## 8. Project Timeline

| Phase | Tasks | Duration |
|---|---|---|
| 1. Setup | Create project, copy design system from solutions-site, configure Tailwind + ShadCN | 2–3 days |
| 2. Core pages | Homepage, hosting pages, domain search, about, contact | 1–2 weeks |
| 3. WHMCS integration | `whmcs.ts` client, domain check API, product data sync | 3–5 days |
| 4. Blog | Blog index + post pages, migrate/add initial content | 3–5 days |
| 5. Analytics + SEO | Analytics.tsx, sitemap, robots.txt, meta tags | 1–2 days |
| 6. QA | Cross-browser, mobile, performance, WHMCS link testing | 3–5 days |
| 7. Deployment | VPS setup, Apache vhost, SSL, PM2, DNS verification | 1–2 days |
| **Total** | | **4–6 weeks** |

---

## 9. Immediate Next Steps

1. Create `frontend/main-site/` project structure
2. Run `npx create-next-app@latest main-site --typescript --tailwind --app`
3. Copy `tailwind.config.ts` and `src/components/ui/` from solutions-site
4. Add `WHMCS_API_URL`, `WHMCS_API_IDENTIFIER`, `WHMCS_API_SECRET` to `.env.local`
5. Pull product list from WHMCS API and save to `data/hosting-plans.json`
6. Build the homepage with domain search as the primary conversion element
