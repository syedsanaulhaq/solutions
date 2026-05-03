#!/bin/bash
# Install Memcached daemon + WP-CLI

# --- Memcached daemon ---
echo "=== Installing Memcached daemon ==="
DEBIAN_FRONTEND=noninteractive apt-get install -y memcached libmemcached-tools 2>&1 | grep -E 'newly installed|already|error' | head -5

# Configure Memcached: 256MB, localhost only
cat > /etc/memcached.conf << 'EOF'
-d
logfile /var/log/memcached.log
-m 256
-p 11211
-u memcache
-l 127.0.0.1
-c 1024
-t 4
EOF

systemctl enable memcached
systemctl restart memcached
echo "Memcached: $(systemctl is-active memcached)"

# --- WP-CLI ---
echo "=== Installing WP-CLI ==="
curl -sS -o /usr/local/bin/wp https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
chmod +x /usr/local/bin/wp
wp --info --allow-root 2>&1 | head -5

echo "=== Done ==="
