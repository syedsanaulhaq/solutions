# HostingOcean Main Site — Deployment & Infrastructure Guide

## Overview

| Property | Value |
|---|---|
| **Project** | `hosting-main-site` |
| **Framework** | Next.js 14 (standalone output) |
| **Port** | 3001 |
| **VPS** | `root@95.111.247.141` |
| **Deploy path** | `/var/www/hostingocean.co.uk/frontend/main-site/deploy/` |
| **PM2 process** | `main-site` |
| **Public URL** | `https://www.hostingocean.co.uk` |
| **WHMCS URL** | `https://my.hostingocean.co.uk` |

---

## 1. WHMCS Integration — Direct Links Only

WHMCS lives at `my.hostingocean.co.uk` and is **not rebuilt**. The new site links to it directly:

| Action | URL |
|---|---|
| Client Login | `https://my.hostingocean.co.uk/clientarea.php` |
| Order Hosting | `https://my.hostingocean.co.uk/cart.php?a=add&pid={PID}` |
| Register Domain | `https://my.hostingocean.co.uk/cart.php?a=add&domain=register` |
| Open Ticket | `https://my.hostingocean.co.uk/submitticket.php` |
| Manage Services | `https://my.hostingocean.co.uk/clientarea.php?action=services` |
| Knowledge Base | `https://my.hostingocean.co.uk/knowledgebase.php` |
| Announcements | `https://my.hostingocean.co.uk/announcements.php` |

All link constants live in `src/lib/whmcs.ts`.

---

## 2. WHMCS Theme Matching

To visually match WHMCS to the new site's dark/blue branding:

1. In WHMCS Admin → **Setup → General Settings → Template**: use the **"twenty-one"** template (closest to modern dark blue).
2. Create a custom CSS override at `WHMCS_ROOT/templates/twenty-one/css/custom.css`:

```css
:root {
  --color-primary: #2563EB;
  --color-primary-dark: #1d4ed8;
  --color-bg: #0F172A;
}
body { font-family: 'Inter', system-ui, sans-serif; }
.btn-primary, .primarybtn { background-color: #2563EB !important; border-color: #2563EB !important; }
.btn-primary:hover { background-color: #1d4ed8 !important; }
```

3. Set the logo in WHMCS Admin → **Setup → General Settings → Logo**.

---

## 3. VPS Setup — First Deploy

### 3.1 Create directories

```bash
mkdir -p /var/www/hostingocean.co.uk/frontend/main-site/deploy
mkdir -p /var/www/hostingocean.co.uk/frontend/main-site/deploy/.next/static
```

### 3.2 PM2 ecosystem file

Create `/var/www/hostingocean.co.uk/pm2.config.js`:

```js
module.exports = {
  apps: [{
    name: 'main-site',
    script: '/var/www/hostingocean.co.uk/frontend/main-site/deploy/server.js',
    cwd: '/var/www/hostingocean.co.uk/frontend/main-site/deploy',
    env: {
      NODE_ENV: 'production',
      PORT: 3001,
      HOSTNAME: '0.0.0.0',
    }
  }]
};
```

### 3.3 Start the process

```bash
pm2 start /var/www/hostingocean.co.uk/pm2.config.js
pm2 save
```

---

## 4. Apache Virtual Host Config

Add to `/etc/apache2/sites-available/hostingocean.co.uk.conf`:

```apache
<VirtualHost *:80>
    ServerName hostingocean.co.uk
    ServerAlias www.hostingocean.co.uk
    Redirect permanent / https://www.hostingocean.co.uk/
</VirtualHost>

<VirtualHost *:443>
    ServerName www.hostingocean.co.uk
    ServerAlias hostingocean.co.uk

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/hostingocean.co.uk/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/hostingocean.co.uk/privkey.pem

    # Next.js app (port 3001)
    ProxyPreserveHost On
    ProxyPass /_next/ http://127.0.0.1:3001/_next/
    ProxyPassReverse /_next/ http://127.0.0.1:3001/_next/
    ProxyPass / http://127.0.0.1:3001/
    ProxyPassReverse / http://127.0.0.1:3001/

    # Serve Next.js static files directly
    Alias /_next/static /var/www/hostingocean.co.uk/frontend/main-site/deploy/.next/static
    <Directory /var/www/hostingocean.co.uk/frontend/main-site/deploy/.next/static>
        Options -Indexes
        AllowOverride None
        Require all granted
        Header set Cache-Control "public, max-age=31536000, immutable"
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/hostingocean-error.log
    CustomLog ${APACHE_LOG_DIR}/hostingocean-access.log combined
</VirtualHost>
```

Enable and restart:

```bash
a2ensite hostingocean.co.uk.conf
a2enmod proxy proxy_http headers ssl
systemctl reload apache2
```

---

## 5. SSL Certificate (Let's Encrypt)

```bash
certbot --apache -d hostingocean.co.uk -d www.hostingocean.co.uk
```

---

## 6. Build & Deploy Script (Windows → VPS)

```powershell
# Run from: e:\Projects\HostingOcean\frontend\hosting-main-site\

# 1. Install dependencies
npm ci

# 2. Build
npm run build

# 3. Package standalone server
$tarDir = ".next\standalone"
$tarFile = "standalone.tar.gz"
tar -czf $tarFile -C $tarDir .

# 4. Package static assets
$staticFile = "static.tar.gz"
tar -czf $staticFile -C ".next\static" .

# 5. Copy to VPS (requires PuTTY pscp in PATH)
$vpsHost = "root@95.111.247.141"
$vpsPath = "/var/www/hostingocean.co.uk/frontend/main-site"
pscp $tarFile "${vpsHost}:${vpsPath}/"
pscp $staticFile "${vpsHost}:${vpsPath}/"

# 6. Deploy on VPS
plink -batch $vpsHost @"
  set -e
  cd $vpsPath
  rm -rf deploy-new
  mkdir -p deploy-new
  tar -xzf standalone.tar.gz -C deploy-new
  mkdir -p deploy-new/.next/static
  tar -xzf static.tar.gz -C deploy-new/.next/static
  cp -r deploy public 2>/dev/null || true
  rm -rf deploy
  mv deploy-new deploy
  pm2 restart main-site || pm2 start /var/www/hostingocean.co.uk/pm2.config.js
  echo "Deploy complete"
"@

Write-Host "Deployed successfully." -ForegroundColor Green
```

---

## 7. DNS Switch Plan

**Current:** `hostingocean.co.uk` likely pointing to old shared hosting.

**Steps to switch:**

1. Log into domain registrar (Namecheap, 123-Reg, etc.)
2. Update DNS A records:
   ```
   hostingocean.co.uk     A    95.111.247.141
   www.hostingocean.co.uk A    95.111.247.141
   ```
3. Reduce TTL to 300 seconds at least 24h before the switch.
4. Wait for DNS propagation (5–60 minutes post-switch with low TTL).
5. Test: `curl -I https://www.hostingocean.co.uk` should return HTTP 200.
6. After confirming, restore TTL to 3600 or 86400.

**WHMCS stays at:** `my.hostingocean.co.uk` — do not change its DNS.

---

## 8. Environment Variables (VPS)

Create `/var/www/hostingocean.co.uk/frontend/main-site/deploy/.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://www.hostingocean.co.uk
NEXT_PUBLIC_WHMCS_URL=https://my.hostingocean.co.uk
WHMCS_API_IDENTIFIER=<your-api-identifier>
WHMCS_API_SECRET=<your-api-secret>
WHMCS_API_URL=https://my.hostingocean.co.uk/includes/api.php
SMTP_HOST=<smtp-host>
SMTP_PORT=587
SMTP_USER=<smtp-user>
SMTP_PASS=<smtp-password>
CONTACT_EMAIL=hello@hostingocean.co.uk
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=hostingocean.co.uk
NEXT_PUBLIC_CLARITY_ID=<clarity-id>
```

---

## 9. Port Summary

| Service | Port | PM2 Name |
|---|---|---|
| solutions.hostingocean.co.uk | 3000 | `solutions-site` |
| www.hostingocean.co.uk | 3001 | `main-site` |
