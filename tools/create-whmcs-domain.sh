#!/bin/bash
# Create whmcs.hostingocean.co.uk as a child domain manually

DOMAIN="whmcs.hostingocean.co.uk"
PARENT="hostingocean.co.uk"
WEBROOT="/home/${DOMAIN}/public_html"
PHPVER="lsphp83"

echo "=== Creating ${DOMAIN} ==="

# 1. Create system user/group (CyberPanel style)
USERNAME="whmcs0001"
if ! id "${USERNAME}" &>/dev/null; then
    useradd -r -s /bin/false -d "/home/${DOMAIN}" "${USERNAME}" 2>/dev/null || true
    echo "User ${USERNAME} created"
else
    echo "User ${USERNAME} already exists"
fi

# 2. Create directory structure
mkdir -p "${WEBROOT}"
mkdir -p "/home/${DOMAIN}/logs"
chown -R "${USERNAME}:${USERNAME}" "/home/${DOMAIN}"
chmod 755 "${WEBROOT}"
echo "Webroot created: ${WEBROOT}"

# 3. Create a placeholder index.php
cat > "${WEBROOT}/index.php" << 'EOF'
<?php
// WHMCS - Installing...
echo "WHMCS directory ready.";
EOF
chown "${USERNAME}:${USERNAME}" "${WEBROOT}/index.php"

# 4. Register in CyberPanel via Django shell
cd /usr/local/CyberCP
/usr/local/CyberCP/bin/python manage.py shell << PYEOF 2>&1
import sys
try:
    from websiteFunctions.models import ChildDomains, Websites
    parent = Websites.objects.filter(domain='${PARENT}').first()
    if not parent:
        print("ERROR: Parent domain ${PARENT} not found in CyberPanel DB")
        sys.exit(1)
    existing = ChildDomains.objects.filter(domain='${DOMAIN}').first()
    if existing:
        print("ALREADY_EXISTS: ${DOMAIN} already in CyberPanel DB")
    else:
        child = ChildDomains(
            domain='${DOMAIN}',
            master=parent,
            phpSelection='${PHPVER}',
            package=None
        )
        child.save()
        print("SUCCESS: ${DOMAIN} added to CyberPanel DB")
except Exception as e:
    print(f"ERROR: {e}")
PYEOF

# 5. Create OLS vhost config
VHOSTDIR="/usr/local/lsws/conf/vhosts/${DOMAIN}"
mkdir -p "${VHOSTDIR}"

cat > "${VHOSTDIR}/vhost.conf" << VHOSTEOF
docRoot                   /home/${DOMAIN}/public_html
vhDomain                  ${DOMAIN}
vhAliases                 
adminEmails               admin@hostingocean.co.uk
enableGzip                1
enableIpGeo               1

index  {
  useServer               0
  indexFiles              index.php, index.html
}

errorlog /home/${DOMAIN}/logs/${DOMAIN}.error_log {
  useServer               0
  logLevel                WARN
  rollingSize             10M
}

accesslog /home/${DOMAIN}/logs/${DOMAIN}.access_log {
  useServer               0
  logFormat               "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\""
  logHeaders              5
  rollingSize             10M
  keepDays                10
  compressArchive         1
}

scripthandler  {
  add                     lsapi:whmcs0001php php
}

extprocessor whmcs0001php {
  type                    lsapi
  address                 UDS://tmp/lshttpd/whmcs0001php.sock
  maxConns                10
  env                     LSAPI_CHILDREN=10
  initTimeout             600
  retryTimeout            0
  persistConn             1
  pcKeepAliveTimeout      1
  respBuffer              0
  autoStart               1
  path                    /usr/local/lsws/${PHPVER}/bin/lsphp
  extUser                 ${USERNAME}
  extGroup                ${USERNAME}
  memSoftLimit            512M
  memHardLimit            512M
  procSoftLimit           400
  procHardLimit           500
}

phpIniOverride  {

}

module cache {
 storagePath /usr/local/lsws/cachedata/${DOMAIN}
}

rewrite  {
  enable                  1
  autoLoadHtaccess        1
}

context /.well-known/acme-challenge {
  location                /usr/local/lsws/Example/html/.well-known/acme-challenge
  allowBrowse             1
  rewrite  {
    enable                0
  }
  addDefaultCharset       off
  phpIniOverride  {
  }
}

modsecurity  {
  enable                  1
  modsecRules             include /usr/local/lsws/conf/modsec/main.conf
}
VHOSTEOF

echo "OLS vhost config created at ${VHOSTDIR}/vhost.conf"

# 6. Add virtual host to OLS httpd_config.conf
HTTPD="/usr/local/lsws/conf/httpd_config.conf"
if grep -q "virtualhost ${DOMAIN}" "${HTTPD}" 2>/dev/null; then
    echo "Vhost already in httpd_config.conf"
else
    cat >> "${HTTPD}" << VHEOF

virtualhost ${DOMAIN} {
  vhRoot                  /home/${DOMAIN}
  configFile              conf/vhosts/${DOMAIN}/vhost.conf
  allowSymbolLink         1
  enableScript            1
  restrained              1
  setUIDMode              2
}
VHEOF
    echo "Vhost added to httpd_config.conf"
fi

# 7. Add to listeners (both HTTP and SSL)
if grep -q "map.*${DOMAIN}" "${HTTPD}" 2>/dev/null; then
    echo "Listener mapping already exists"
else
    # Add to HTTP listener
    sed -i "/^listener HTTP {/,/^}/ s/map\(\s\+\)hostingocean.co.uk hostingocean.co.uk/map\1hostingocean.co.uk hostingocean.co.uk\n  map                     ${DOMAIN} ${DOMAIN}/" "${HTTPD}" 2>/dev/null || true
    echo "Listener mapping added (manual SSL mapping will follow after cert)"
fi

# Restart OLS
/usr/local/lsws/bin/lswsctrl restart
sleep 4
echo "OLS restarted"
curl -s -o /dev/null -w "HTTP check: %{http_code}\n" http://${DOMAIN}/ 2>/dev/null || echo "(DNS not propagated yet - normal)"
echo ""
echo "=== Done. Next: issue SSL for ${DOMAIN} ==="
