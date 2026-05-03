#!/bin/bash
DOMAIN="whmcs.hostingocean.co.uk"
WEBROOT="/home/${DOMAIN}/public_html"

echo "=== Issuing SSL for ${DOMAIN} ==="

# Ensure .well-known dir is accessible
mkdir -p "${WEBROOT}/.well-known/acme-challenge"
chmod -R 755 "${WEBROOT}/.well-known"

# Try acme.sh with Let's Encrypt
if [ -x "/root/.acme.sh/acme.sh" ]; then
    /root/.acme.sh/acme.sh --issue -d "${DOMAIN}" \
        --webroot "${WEBROOT}" \
        --server letsencrypt \
        --force 2>&1
    ACME_EXIT=$?
    
    if [ $ACME_EXIT -eq 0 ]; then
        CERTDIR="/root/.acme.sh/${DOMAIN}_ecc"
        [ -d "${CERTDIR}" ] || CERTDIR="/root/.acme.sh/${DOMAIN}"
        CERTFILE="${CERTDIR}/fullchain.cer"
        KEYFILE="${CERTDIR}/${DOMAIN}.key"
        echo "SSL issued via acme.sh"
    fi
fi

# Fallback: try acme.sh with ZeroSSL or Buypass
if [ ! -f "${CERTFILE:-}" ]; then
    /root/.acme.sh/acme.sh --issue -d "${DOMAIN}" \
        --webroot "${WEBROOT}" \
        --server zerossl 2>&1
    CERTDIR="/root/.acme.sh/${DOMAIN}_ecc"
    [ -d "${CERTDIR}" ] || CERTDIR="/root/.acme.sh/${DOMAIN}"
    CERTFILE="${CERTDIR}/fullchain.cer"
    KEYFILE="${CERTDIR}/${DOMAIN}.key"
fi

if [ ! -f "${CERTFILE:-}" ]; then
    echo "ERROR: Could not obtain SSL certificate"
    echo "Manual command to run after DNS fully propagates:"
    echo "  /root/.acme.sh/acme.sh --issue -d ${DOMAIN} --webroot ${WEBROOT} --server letsencrypt"
    exit 1
fi

echo ""
echo "=== Cert file: ${CERTFILE} ==="
echo "=== Key file:  ${KEYFILE} ==="

# Install cert to /etc/ssl/whmcs.hostingocean.co.uk/
SSLDIR="/etc/ssl/${DOMAIN}"
mkdir -p "${SSLDIR}"
/root/.acme.sh/acme.sh --install-cert -d "${DOMAIN}" \
    --cert-file "${SSLDIR}/cert.pem" \
    --key-file "${SSLDIR}/privkey.pem" \
    --fullchain-file "${SSLDIR}/fullchain.pem" \
    --reloadcmd "/usr/local/lsws/bin/lswsctrl restart" 2>&1

# Add SSL block to vhost.conf
VHOSTCONF="/usr/local/lsws/conf/vhosts/${DOMAIN}/vhost.conf"
if ! grep -q 'vhssl' "${VHOSTCONF}"; then
    cat >> "${VHOSTCONF}" << SSLEOF

vhssl  {
  keyFile                 ${SSLDIR}/privkey.pem
  certFile                ${SSLDIR}/fullchain.pem
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
else
    echo "SSL block already in vhost.conf"
fi

# Restart OLS
/usr/local/lsws/bin/lswsctrl restart
sleep 3

echo ""
echo "=== Testing HTTPS ==="
curl -sk -o /dev/null -w "HTTPS status: %{http_code}\n" "https://${DOMAIN}/"
echo ""
echo "=== SSL complete for ${DOMAIN} ==="
