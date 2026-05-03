#!/bin/bash
echo "=== Listener sections ==="
grep -n "listener\|map " /usr/local/lsws/conf/httpd_config.conf | head -40
echo ""
echo "=== Vhost conf0 diff ==="
diff /usr/local/lsws/conf/vhosts/whmcs.hostingocean.co.uk/vhost.conf0 /usr/local/lsws/conf/vhosts/whmcs.hostingocean.co.uk/vhost.conf 2>/dev/null | head -20
