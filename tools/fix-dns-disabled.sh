#!/bin/bash
# Fix the disabled=NULL and check existing working records
mysql -u root -p6xqBcu0rSmXCMs cyberpanel 2>/dev/null << 'SQL'
-- Check what disabled value other A records have
SELECT id, name, type, disabled, auth FROM records WHERE type='A' AND disabled IS NOT NULL LIMIT 5;
SQL
echo "---"
# Fix whmcs record
mysql -u root -p6xqBcu0rSmXCMs cyberpanel 2>/dev/null << 'SQL'
UPDATE records SET disabled=0, change_date=UNIX_TIMESTAMP() WHERE id=35;
SQL
echo "Fixed. Testing..."
pdns_control purge 2>/dev/null || true
sleep 2
dig @127.0.0.1 whmcs.hostingocean.co.uk A +noall +answer
echo "---Public DNS---"
dig whmcs.hostingocean.co.uk A +short 2>/dev/null || echo "(may need time to propagate)"
