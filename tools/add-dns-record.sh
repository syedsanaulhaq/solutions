#!/bin/bash
# Add DNS A record for whmcs.hostingocean.co.uk in PowerDNS (stored in cyberpanel DB)

# Check domain ID for hostingocean.co.uk
mysql -u root -p6xqBcu0rSmXCMs cyberpanel 2>/dev/null << 'SQL'
SELECT id, name FROM domains WHERE name = 'hostingocean.co.uk';
SQL

DOMAIN_ID=$(mysql -u root -p6xqBcu0rSmXCMs cyberpanel -sN 2>/dev/null -e "SELECT id FROM domains WHERE name='hostingocean.co.uk';")
echo "Domain ID: ${DOMAIN_ID}"

if [ -z "${DOMAIN_ID}" ]; then
    echo "ERROR: hostingocean.co.uk zone not found in PowerDNS"
    echo "Checking all zones..."
    mysql -u root -p6xqBcu0rSmXCMs cyberpanel 2>/dev/null -e "SELECT id, name FROM domains LIMIT 20;"
    exit 1
fi

# Check if A record already exists
EXISTING=$(mysql -u root -p6xqBcu0rSmXCMs cyberpanel -sN 2>/dev/null -e "SELECT id FROM records WHERE name='whmcs.hostingocean.co.uk' AND type='A';")
if [ -n "${EXISTING}" ]; then
    echo "A record already exists (id=${EXISTING})"
    mysql -u root -p6xqBcu0rSmXCMs cyberpanel 2>/dev/null -e "SELECT name, type, content, ttl FROM records WHERE name='whmcs.hostingocean.co.uk';"
else
    mysql -u root -p6xqBcu0rSmXCMs cyberpanel 2>/dev/null << SQL
INSERT INTO records (domain_id, name, type, content, ttl, prio, auth)
VALUES (${DOMAIN_ID}, 'whmcs.hostingocean.co.uk', 'A', '95.111.247.141', 3600, 0, 1);
SQL
    echo "A record inserted"
    # Increase zone serial
    mysql -u root -p6xqBcu0rSmXCMs cyberpanel 2>/dev/null << SQL
UPDATE records 
SET content = REGEXP_REPLACE(content, '[0-9]{10}', UNIX_TIMESTAMP())
WHERE domain_id = ${DOMAIN_ID} AND type = 'SOA';
SQL
    echo "SOA serial updated"
fi

# Flush PowerDNS cache
pdns_control purge whmcs.hostingocean.co.uk 2>/dev/null || true
pdns_control reload 2>/dev/null || true

# Verify
echo ""
echo "=== DNS check ==="
sleep 2
dig @127.0.0.1 whmcs.hostingocean.co.uk A +short 2>&1
