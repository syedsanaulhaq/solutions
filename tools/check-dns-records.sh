#!/bin/bash
mysql -u root -p6xqBcu0rSmXCMs cyberpanel 2>/dev/null << 'SQL'
SELECT id, domain_id, name, type, content, ttl, auth FROM records 
WHERE name LIKE '%whmcs%' OR name LIKE '%hostingocean%'
ORDER BY name, type;
SQL
