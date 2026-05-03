#!/bin/bash
# Create my.hostingocean.co.uk subdomain manually for WHMCS

DOMAIN="my.hostingocean.co.uk"
PARENT="hostingocean.co.uk"
WEBROOT="/home/${DOMAIN}/public_html"
PHP_USER="hosti9601"  # same user as parent

echo "=== Creating ${DOMAIN} ==="

# 1. Create directory structure
mkdir -p "${WEBROOT}"
mkdir -p "/home/${DOMAIN}/logs"
chown -R ${PHP_USER}:${PHP_USER} "/home/${DOMAIN}" 2>/dev/null || true

echo "Webroot: ${WEBROOT}"

# 2. Create a placeholder page
cat > "${WEBROOT}/index.html" << 'EOF'
<!DOCTYPE html>
<html><body><p>my.hostingocean.co.uk - Ready for WHMCS</p></body></html>
EOF

# 3. Create OLS vhost config directory
mkdir -p /usr/local/lsws/conf/vhosts/${DOMAIN}

# 4. Write vhost config (PHP, no proxy)
cat > /usr/local/lsws/conf/vhosts/${DOMAIN}/vhost.conf << VHOSTEOF
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
  keepDays                30
  compressArchive         1
}

scripthandler  {
  add                     lsapi:my9601 php
}

extprocessor my9601 {
  type                    lsapi
  address                 UDS://tmp/lshttpd/my9601.sock
  maxConns                10
  env                     LSAPI_CHILDREN=10
  initTimeout             600
  retryTimeout            0
  persistConn             1
  pcKeepAliveTimeout      1
  respBuffer              0
  autoStart               1
  path                    /usr/local/lsws/lsphp83/bin/lsphp
  extUser                 ${PHP_USER}
  extGroup                ${PHP_USER}
  memSoftLimit            1024M
  memHardLimit            1024M
  procSoftLimit           400
  procHardLimit           500
}

phpIniOverride  {

}

module cache {
  storagePath             /usr/local/lsws/cachedata/${DOMAIN}
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

echo "vhost.conf created"

# 5. Add vhost to main httpd_config.conf if not already present
MAIN_CONF="/usr/local/lsws/conf/httpd_config.conf"
if grep -q "virtualhost ${DOMAIN}" "${MAIN_CONF}" 2>/dev/null; then
    echo "Vhost already in httpd_config.conf"
else
    cat >> "${MAIN_CONF}" << VHCONF

virtualhost ${DOMAIN} {
  vhRoot                  /home/${DOMAIN}
  configFile              conf/vhosts/${DOMAIN}/vhost.conf
  allowSymbolLink         1
  enableScript            1
  restrained              0
  setUIDMode              0
}
VHCONF
    echo "Added virtualhost to httpd_config.conf"
fi

# 6. Add to HTTP listener
if grep -q "map.*${DOMAIN}.*${DOMAIN}" "${MAIN_CONF}"; then
    echo "Listener map already exists"
else
    # Add to HTTP IPv4 listener
    sed -i "/listener HTTP IPv4 {/,/^}/s|^\(}\)$|  map                     ${DOMAIN} ${DOMAIN}\n\1|" "${MAIN_CONF}" 2>/dev/null || true
    # Add to HTTP IPv6 listener  
    sed -i "/listener HTTP IPv6 {/,/^}/s|^\(}\)$|  map                     ${DOMAIN} ${DOMAIN}\n\1|" "${MAIN_CONF}" 2>/dev/null || true
    echo "Listener maps added"
fi

# 7. Register in CyberPanel DB
cd /usr/local/CyberCP
/usr/local/CyberCP/bin/python manage.py shell << 'PYEOF' 2>/dev/null
import django, os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'CyberCP.settings')

from websiteFunctions.models import Websites, ChildDomains
from loginSystem.models import Administrator

parent = Websites.objects.filter(domain='hostingocean.co.uk').first()
admin = Administrator.objects.filter(userName='admin').first()

if parent:
    existing = ChildDomains.objects.filter(domain='my.hostingocean.co.uk').first()
    if existing:
        print("DB: Already exists")
    else:
        child = ChildDomains(
            masterDomain=parent,
            domain='my.hostingocean.co.uk',
            phpSelection='PHP 8.3',
            domainOwner=admin,
            state=1
        )
        child.save()
        print("DB: Created successfully")
else:
    print("DB: Parent domain not found - manual DNS only")
PYEOF

# 8. Restart OLS
/usr/local/lsws/bin/lswsctrl restart
sleep 3
echo "OLS restarted"

# 9. Test HTTP access
curl -s -o /dev/null -w "HTTP status: %{http_code}\n" -H "Host: ${DOMAIN}" http://localhost/ 2>/dev/null || echo "HTTP test: OLS restarted"

echo ""
echo "=== ${DOMAIN} created ==="
echo "Webroot: ${WEBROOT}"
echo "Now issue SSL via: certbot --webroot -w ${WEBROOT} -d ${DOMAIN}"
