#!/bin/bash
for VHOST in hostingocean.co.uk solutions.hostingocean.co.uk; do
    CONF="/usr/local/lsws/conf/vhosts/${VHOST}/vhost.conf"
    if grep -q 'modsecurity\|secRules' "${CONF}" 2>/dev/null; then
        echo "${VHOST}: ModSecurity already in vhost.conf"
    else
        cat >> "${CONF}" << 'MODSECBLOCK'

modsecurity  {
  enable                  1
  modsecRules             include /usr/local/lsws/conf/modsec/main.conf
}
MODSECBLOCK
        echo "${VHOST}: ModSecurity block added"
    fi
done

/usr/local/lsws/bin/lswsctrl restart
sleep 4
echo "OLS restarted"
curl -s -o /dev/null -w "hostingocean.co.uk HTTP: %{http_code}\n" http://localhost:3002/ 2>/dev/null || echo "port 3002 check skipped"
