#!/bin/bash
DOMAIN="whmcs.hostingocean.co.uk"
VHOSTCONF="/usr/local/lsws/conf/vhosts/${DOMAIN}/vhost.conf"
HTTPD="/usr/local/lsws/conf/httpd_config.conf"
SSLDIR="/etc/ssl/${DOMAIN}"

# Add SSL block to vhost.conf
cat >> "${VHOSTCONF}" << 'SSLEOF'

vhssl  {
  keyFile                 /etc/ssl/whmcs.hostingocean.co.uk/privkey.pem
  certFile                /etc/ssl/whmcs.hostingocean.co.uk/fullchain.pem
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

# Restart OLS
/usr/local/lsws/bin/lswsctrl restart
sleep 3

# Test
echo "=== Testing HTTPS ==="
curl -sk -o /dev/null -w "HTTPS status: %{http_code}\n" "https://${DOMAIN}/"
echo ""
echo "=== Verifying cert ==="
echo | openssl s_client -connect ${DOMAIN}:443 -servername ${DOMAIN} 2>/dev/null | openssl x509 -noout -dates -subject 2>/dev/null
