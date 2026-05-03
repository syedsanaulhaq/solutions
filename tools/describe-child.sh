#!/bin/bash
mysql -u root -p6xqBcu0rSmXCMs cyberpanel 2>/dev/null << 'SQL'
DESCRIBE websiteFunctions_childdomains;
SQL
echo "---Existing rows---"
mysql -u root -p6xqBcu0rSmXCMs cyberpanel 2>/dev/null << 'SQL'
SELECT id, master_id, domain, path, phpSelection FROM websiteFunctions_childdomains LIMIT 5;
SQL
