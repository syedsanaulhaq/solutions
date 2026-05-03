#!/bin/bash
# Register whmcs.hostingocean.co.uk in CyberPanel DB + issue SSL

DOMAIN="whmcs.hostingocean.co.uk"
PARENT="hostingocean.co.uk"
WEBROOT="/home/${DOMAIN}/public_html"

echo "=== Registering in CyberPanel DB ==="
cd /usr/local/CyberCP
/usr/local/CyberCP/bin/python manage.py shell << 'PYEOF' 2>&1
from websiteFunctions.models import ChildDomains, Websites
import sys

domain = 'whmcs.hostingocean.co.uk'
parent_name = 'hostingocean.co.uk'

parent = Websites.objects.filter(domain=parent_name).first()
if not parent:
    print(f"ERROR: Parent {parent_name} not found")
    sys.exit(1)

print(f"Parent found: {parent.domain}, id={parent.id}")
print(f"ChildDomains fields: {[f.name for f in ChildDomains._meta.get_fields()]}")

existing = ChildDomains.objects.filter(domain=domain).first()
if existing:
    print(f"ALREADY_EXISTS: {domain} id={existing.id}")
else:
    # Build kwargs based on available fields
    kwargs = {'domain': domain, 'master': parent, 'phpSelection': 'lsphp83'}
    child = ChildDomains(**kwargs)
    child.save()
    print(f"SUCCESS: {domain} saved with id={child.id}")
PYEOF

echo ""
echo "=== Adding DNS A record for ${DOMAIN} ==="
# CyberPanel stores DNS in PowerDNS DB
mysql -u root -p6xqBcu0rSmXCMs pdns 2>/dev/null << 'SQLEOF'
SELECT id, name FROM domains WHERE name = 'hostingocean.co.uk';
SQLEOF

# Get domain ID and insert A record
DOMAIN_ID=$(mysql -u root -p6xqBcu0rSmXCMs pdns -se "SELECT id FROM domains WHERE name='hostingocean.co.uk';" 2>/dev/null)
if [ -n "${DOMAIN_ID}" ]; then
    EXISTING=$(mysql -u root -p6xqBcu0rSmXCMs pdns -se "SELECT id FROM records WHERE name='whmcs.hostingocean.co.uk' AND type='A';" 2>/dev/null)
    if [ -n "${EXISTING}" ]; then
        echo "DNS A record already exists"
    else
        mysql -u root -p6xqBcu0rSmXCMs pdns -e "INSERT INTO records (domain_id, name, type, content, ttl) VALUES (${DOMAIN_ID}, 'whmcs.hostingocean.co.uk', 'A', '95.111.247.141', 3600);" 2>/dev/null
        echo "DNS A record added: whmcs.hostingocean.co.uk -> 95.111.247.141"
    fi
else
    echo "pdns domain not found - DNS may be external"
fi

echo ""
echo "=== Issuing SSL for ${DOMAIN} ==="
# Use certbot standalone approach or webroot
# First ensure the .well-known dir is accessible
mkdir -p "${WEBROOT}/.well-known/acme-challenge"
chown -R whmcs0001:whmcs0001 "${WEBROOT}/.well-known" 2>/dev/null || true

# Try certbot webroot
certbot certonly --webroot -w "${WEBROOT}" -d "${DOMAIN}" --non-interactive --agree-tos --email admin@hostingocean.co.uk 2>&1 | tail -10
CERT_RESULT=$?

if [ $CERT_RESULT -ne 0 ]; then
    echo "certbot webroot failed, trying acme.sh..."
    /root/.acme.sh/acme.sh --issue -d "${DOMAIN}" --webroot "${WEBROOT}" --server letsencrypt 2>&1 | tail -15
fi

# Check if cert exists
if [ -f "/etc/letsencrypt/live/${DOMAIN}/fullchain.pem" ]; then
    echo "SSL cert obtained via certbot"
    CERTFILE="/etc/letsencrypt/live/${DOMAIN}/fullchain.pem"
    KEYFILE="/etc/letsencrypt/live/${DOMAIN}/privkey.pem"
elif [ -f "/root/.acme.sh/${DOMAIN}_ecc/fullchain.cer" ]; then
    echo "SSL cert obtained via acme.sh (ECC)"
    CERTFILE="/root/.acme.sh/${DOMAIN}_ecc/fullchain.cer"
    KEYFILE="/root/.acme.sh/${DOMAIN}_ecc/${DOMAIN}.key"
elif [ -f "/root/.acme.sh/${DOMAIN}/fullchain.cer" ]; then
    echo "SSL cert obtained via acme.sh"
    CERTFILE="/root/.acme.sh/${DOMAIN}/fullchain.cer"
    KEYFILE="/root/.acme.sh/${DOMAIN}/${DOMAIN}.key"
else
    echo "No SSL cert found yet - DNS may not be pointing here"
    CERTFILE=""
fi

if [ -n "${CERTFILE}" ]; then
    echo ""
    echo "=== Adding SSL to vhost config ==="
    VHOSTCONF="/usr/local/lsws/conf/vhosts/${DOMAIN}/vhost.conf"
    if ! grep -q 'vhssl' "${VHOSTCONF}"; then
        cat >> "${VHOSTCONF}" << SSLEOF

vhssl  {
  keyFile                 ${KEYFILE}
  certFile                ${CERTFILE}
  certChain               1
  sslProtocol             24
  enableECDHE             1
  renegProtection         1
  sslSessionCache         1
  enableSpdy              15
  enableStapling           1
  ocspRespMaxAge           86400
}
SSLEOF
        echo "SSL block added to vhost.conf"
    fi

    # Add SSL listener mapping
    HTTPD="/usr/local/lsws/conf/httpd_config.conf"
    if ! grep -A5 'listener SSL' "${HTTPD}" | grep -q "${DOMAIN}"; then
        # Add map to SSL listener
        sed -i "/listener SSL {/,/^}/ { /map.*solutions\.hostingocean\.co\.uk.*/i\\  map                     ${DOMAIN} ${DOMAIN}" "${HTTPD}"
        echo "SSL listener mapping added"
    fi

    /usr/local/lsws/bin/lswsctrl restart
    sleep 3
    echo "OLS restarted with SSL"
fi

echo ""
echo "=== whmcs.hostingocean.co.uk setup complete ==="
echo "Webroot: ${WEBROOT}"
echo "DB: whmcs_db / whmcs_user / WhmcsDB2026@!"
