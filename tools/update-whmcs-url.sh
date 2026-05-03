#!/bin/bash
set -e
SRCDIR="/var/www/hostingocean/frontend/hosting-main-site"

echo "=== Replacing my.hostingocean.co.uk → whmcs.hostingocean.co.uk ==="
# Replace in all source files
grep -rl "my\.hostingocean\.co\.uk" "${SRCDIR}/src" --include="*.ts" --include="*.tsx" --include="*.js" | while read f; do
    sed -i 's/my\.hostingocean\.co\.uk/whmcs.hostingocean.co.uk/g' "$f"
    echo "Updated: $f"
done

# Also update .env.example
sed -i 's/my\.hostingocean\.co\.uk/whmcs.hostingocean.co.uk/g' "${SRCDIR}/.env.example" 2>/dev/null || true

echo ""
echo "=== Remaining references ==="
grep -r "my\.hostingocean" "${SRCDIR}/src" 2>/dev/null | wc -l

echo ""
echo "=== Creating .env.production ==="
cat > "${SRCDIR}/.env.production" << 'ENVEOF'
NEXT_PUBLIC_WHMCS_URL=https://whmcs.hostingocean.co.uk
NEXT_PUBLIC_SITE_URL=https://hostingocean.co.uk
WHMCS_API_URL=https://whmcs.hostingocean.co.uk/includes/api.php
ENVEOF

echo "=== Rebuilding Next.js ==="
cd "${SRCDIR}"
export NODE_ENV=production
npm run build 2>&1
echo "Build exit: $?"
