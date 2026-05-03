#!/bin/bash
# Create websites in CyberPanel via CLI

CYBERPANEL_PYTHON=/usr/local/CyberCP/bin/python
CYBERPANEL_CLI=/usr/local/CyberCP/cli/cyberPanel.py

cd /usr/local/CyberCP

# Create main hosting site
echo "Creating hostingocean.co.uk..."
$CYBERPANEL_PYTHON $CYBERPANEL_CLI createWebsite \
  --domainName hostingocean.co.uk \
  --owner admin \
  --email admin@hostingocean.co.uk \
  --package Default \
  --php 8.3 \
  --ssl 0 \
  --dkim 1 \
  --openBasedir 0 2>&1

echo ""
echo "Creating solutions.hostingocean.co.uk..."
$CYBERPANEL_PYTHON $CYBERPANEL_CLI createWebsite \
  --domainName solutions.hostingocean.co.uk \
  --owner admin \
  --email admin@hostingocean.co.uk \
  --package Default \
  --php 8.3 \
  --ssl 0 \
  --dkim 1 \
  --openBasedir 0 2>&1

echo ""
echo "Creating www.hostingocean.co.uk as child domain..."
$CYBERPANEL_PYTHON $CYBERPANEL_CLI createChild \
  --masterDomain hostingocean.co.uk \
  --childDomain www.hostingocean.co.uk \
  --owner admin 2>&1

echo "Done!"
