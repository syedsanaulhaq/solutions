#!/bin/bash
set -e
DEPLOY=/var/www/solutions.hostingocean.co.uk/frontend/solutions-site/deploy
cd /tmp
rm -rf deploy_new
mkdir deploy_new
unzip -q standalone.zip -d deploy_new
mkdir -p deploy_new/.next
unzip -q static.zip -d deploy_new/.next
cp -r $DEPLOY/public deploy_new/public 2>/dev/null || true
cp $DEPLOY/.env.local deploy_new/.env.local 2>/dev/null || true
pm2 stop solutions-site 2>/dev/null || true
rm -rf ${DEPLOY}_bak
mv $DEPLOY ${DEPLOY}_bak 2>/dev/null || true
mv /tmp/deploy_new $DEPLOY
cd $DEPLOY
pm2 start server.js --name solutions-site --update-env 2>/dev/null || pm2 restart solutions-site
pm2 save
echo "DEPLOY_DONE"
