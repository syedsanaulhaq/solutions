# HostingOcean Solutions — Deployment Guide

## Overview

This document covers how to deploy the `solutions-site` Next.js application to the production VPS.

**Production server:** `95.111.247.141`  
**Deployment path:** `/var/www/solutions.hostingocean.co.uk/frontend/solutions-site/`  
**Process manager:** PM2 (`solutions-site`)  
**Reverse proxy:** Apache → port 3000  
**Git branch:** `develop` (push here; deploy manually)  

---

## 1. Environment Variables

The following environment variables must be set in the `.env.local` file on the production server.

| Variable | Required | Description |
|---|---|---|
| `SMTP_HOST` | Yes | SMTP server hostname |
| `SMTP_PORT` | Yes | SMTP server port (usually 465 or 587) |
| `SMTP_USER` | Yes | SMTP authentication username |
| `SMTP_PASS` | Yes | SMTP authentication password |
| `LEAD_NOTIFY_EMAIL` | Yes | Email address to receive new lead notifications |
| `ADMIN_PASSWORD` | Yes | Password for the admin dashboard |
| `OPENAI_API_KEY` | Yes | OpenAI API key (for AI chatbot) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional | Plausible analytics domain |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | Google Analytics 4 measurement ID |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Optional | Microsoft Clarity project ID |
| `HUBSPOT_ACCESS_TOKEN` | Optional | HubSpot CRM access token |
| `NOTION_TOKEN` | Optional | Notion integration token |
| `NOTION_DATABASE_ID` | Optional | Notion database ID for lead capture |

---

## 2. First-Time Server Setup

```bash
# SSH into the server
ssh root@95.111.247.141

# Install Node.js 20 (if not already present)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Install PM2 globally
npm install -g pm2

# Create deployment directory
mkdir -p /var/www/solutions.hostingocean.co.uk/frontend/solutions-site

# Clone the repository
cd /var/www/solutions.hostingocean.co.uk
git clone https://github.com/syedsanaulhaq/solutions.git .

# Navigate to the site directory
cd frontend/solutions-site

# Create environment file
nano .env.local
# (paste in all required environment variables)

# Install dependencies and build
npm install
npm run build

# Start with PM2
pm2 start npm --name "solutions-site" -- start
pm2 save
pm2 startup  # follow the command it outputs
```

---

## 3. Routine Deployment (after every push to develop)

```bash
# SSH into the server
ssh root@95.111.247.141

# Navigate to the deployment directory
cd /var/www/solutions.hostingocean.co.uk/frontend/solutions-site

# Pull the latest changes
git pull origin develop

# Install any new dependencies
npm install --production=false

# Build the application
npm run build

# Restart PM2 process (zero-downtime reload)
pm2 reload solutions-site

# Verify the process is running
pm2 status

# Check logs for errors
pm2 logs solutions-site --lines 50
```

---

## 4. Verifying the Deployment

After deploying, run through the post-deployment smoke test in `qa-checklist.md`:

```bash
# Quick server-side check: is the process running?
pm2 status

# Check the last 100 lines of logs for errors
pm2 logs solutions-site --lines 100 --nostream

# Test the homepage responds
curl -I http://localhost:3000

# Test the API is responding
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","source":"deploy-test"}'
```

---

## 5. Rolling Back a Deployment

If a deployment causes issues:

```bash
# SSH into the server
ssh root@95.111.247.141
cd /var/www/solutions.hostingocean.co.uk/frontend/solutions-site

# Find the previous working commit
git log --oneline -10

# Roll back to the previous commit
git checkout <commit-hash>

# Rebuild
npm run build

# Restart
pm2 reload solutions-site
```

---

## 6. Apache Configuration

Apache is configured to proxy port 80 and 443 to the Next.js process on port 3000.

Config file location: `/etc/apache2/sites-available/solutions.hostingocean.co.uk.conf`

Key directives:
```apache
ProxyPreserveHost On
ProxyPass / http://localhost:3000/
ProxyPassReverse / http://localhost:3000/
```

To reload Apache after config changes:
```bash
apache2ctl configtest  # always check config before reloading
systemctl reload apache2
```

---

## 7. Data Files

The following data files are written to at runtime and should NOT be overwritten during deployment:

- `data/newsletter-subscribers.json` — newsletter subscriber list
- `data/leads.json` — captured leads (if using file-based storage)

Back these up before a git checkout if they exist on the server:

```bash
cp data/newsletter-subscribers.json /tmp/newsletter-subscribers.backup.json
```

---

## 8. Monitoring

PM2 provides basic monitoring:

```bash
pm2 monit          # live CPU/memory dashboard
pm2 logs           # live log stream
pm2 status         # process status
```

For production alerting, consider configuring PM2's built-in `pm2-logrotate` module:

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 50M
pm2 set pm2-logrotate:retain 7
```
