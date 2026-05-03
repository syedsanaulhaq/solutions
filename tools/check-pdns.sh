#!/bin/bash
# Check full record details for whmcs
mysql -u root -p6xqBcu0rSmXCMs cyberpanel 2>/dev/null << 'SQL'
DESCRIBE records;
SQL
echo "---"
mysql -u root -p6xqBcu0rSmXCMs cyberpanel 2>/dev/null << 'SQL'
SELECT * FROM records WHERE id=35;
SQL
echo "---pdns conf---"
cat /etc/powerdns/pdns.conf 2>/dev/null | grep -v "^#" | grep -v "^$" | head -20
cat /etc/pdns/pdns.conf 2>/dev/null | grep -v "^#" | grep -v "^$" | head -20
