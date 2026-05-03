#!/bin/bash
set -e

echo "=== Building hosting-main-site ==="
cd /var/www/hostingocean/frontend/hosting-main-site
npm ci
npm run build
echo "hosting-main-site build done"

echo ""
echo "=== Building solutions-site ==="
cd /var/www/hostingocean/frontend/solutions-site
npm ci
npm run build
echo "solutions-site build done"

echo ""
echo "=== All builds complete ==="
