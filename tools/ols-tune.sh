#!/bin/bash
# Tune OpenLiteSpeed for high-performance UK hosting

echo "=== Tuning OpenLiteSpeed performance ==="

OLS_CONF="/usr/local/lsws/conf/httpd_config.conf"

if [ ! -f "$OLS_CONF" ]; then
    echo "ERROR: OLS config not found at $OLS_CONF"
    exit 1
fi

cp "${OLS_CONF}" "${OLS_CONF}.bak"
echo "Backed up to ${OLS_CONF}.bak"

# Update tuning values
sed -i 's/maxConnections\s\+10000/maxConnections               20000/' "${OLS_CONF}"
sed -i 's/keepAliveTimeout\s\+5 /keepAliveTimeout             15 /' "${OLS_CONF}"
sed -i 's/totalInMemCacheSize\s\+20M/totalInMemCacheSize          256M/' "${OLS_CONF}"
sed -i 's/totalMMapCacheSize\s\+40M/totalMMapCacheSize           512M/' "${OLS_CONF}"
sed -i 's/maxMMapFileSize\s\+256K/maxMMapFileSize              4M/' "${OLS_CONF}"
sed -i 's/logLevel\s\+DEBUG/logLevel             WARN/' "${OLS_CONF}"

echo "OLS tuning values updated"

# Set system limits for OLS
cat > /etc/security/limits.d/99-lsws.conf << 'EOF'
lsadm soft nofile 65535
lsadm hard nofile 65535
nobody soft nofile 65535
nobody hard nofile 65535
root   soft nofile 65535
root   hard nofile 65535
EOF
echo "File descriptor limits written"

# Kernel TCP tuning for hosting
cat > /etc/sysctl.d/99-hostingocean.conf << 'EOF'
net.core.somaxconn = 65535
net.core.netdev_max_backlog = 65535
net.ipv4.tcp_max_syn_backlog = 65535
net.ipv4.tcp_fin_timeout = 10
net.ipv4.tcp_keepalive_time = 1200
net.ipv4.tcp_keepalive_probes = 5
net.ipv4.tcp_keepalive_intvl = 30
net.ipv4.tcp_tw_reuse = 1
net.ipv4.ip_local_port_range = 1024 65535
net.core.rmem_max = 134217728
net.core.wmem_max = 134217728
net.ipv4.tcp_rmem = 4096 87380 134217728
net.ipv4.tcp_wmem = 4096 65536 134217728
net.netfilter.nf_conntrack_max = 1048576
net.netfilter.nf_conntrack_tcp_timeout_established = 3600
fs.file-max = 2097152
fs.inotify.max_user_watches = 524288
vm.swappiness = 10
vm.dirty_ratio = 60
vm.dirty_background_ratio = 2
EOF

sysctl -p /etc/sysctl.d/99-hostingocean.conf 2>&1 | grep -v '^$' | head -20

/usr/local/lsws/bin/lswsctrl restart
sleep 4
echo ""
echo "=== OLS + kernel tuning complete ==="
curl -s -o /dev/null -w "hostingocean.co.uk HTTP: %{http_code}\n" http://localhost:3002/
grep -E 'maxConnections|keepAliveTimeout|totalInMemCacheSize' "${OLS_CONF}" | head -5
