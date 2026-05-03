#!/bin/bash
mysql -u root -p6xqBcu0rSmXCMs cyberpanel 2>/dev/null << 'EOF'
INSERT IGNORE INTO websiteFunctions_childdomains (master_id, domain, path, ssl, phpSelection, alais)
VALUES (2, 'whmcs.hostingocean.co.uk', '/home/whmcs.hostingocean.co.uk', 0, 'lsphp83', '');
EOF
echo "Inserted. Checking..."
mysql -u root -p6xqBcu0rSmXCMs cyberpanel -e "SELECT id,domain,path,phpSelection FROM websiteFunctions_childdomains WHERE domain LIKE '%whmcs%';" 2>/dev/null | grep -v Warning
