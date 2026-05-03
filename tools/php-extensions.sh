#!/bin/bash
# Install all available lsphp extensions for PHP 8.0, 8.1, 8.2, 8.3
# These are the packages available in the LiteSpeed repo

VERSIONS="80 81 82 83"
EXTS="common curl imagick imap intl memcached mysql opcache redis ioncube apcu ldap pgsql sqlite3 igbinary"

echo "=== Installing PHP extensions for all lsphp versions ==="

for VER in $VERSIONS; do
    echo "--- Installing for lsphp${VER} ---"
    PKGS=""
    for EXT in $EXTS; do
        PKGS="$PKGS lsphp${VER}-${EXT}"
    done
    DEBIAN_FRONTEND=noninteractive apt-get install -y $PKGS 2>&1 | grep -E 'newly installed|upgraded|is already|error|Unable' | head -10
    echo "lsphp${VER}: done"
done

echo ""
echo "=== Verifying key extensions ==="
for VER in $VERSIONS; do
    PHPBIN=$(ls /usr/local/lsws/lsphp${VER}/bin/php* 2>/dev/null | head -1)
    if [ -f "$PHPBIN" ]; then
        MODS=$($PHPBIN -m 2>/dev/null | grep -E 'curl|gd|imagick|imap|intl|mbstring|mysql|opcache|redis|ioncube|apcu|memcached|zip|soap|xml' | tr '\n' ' ')
        echo "lsphp${VER}: $MODS"
    else
        echo "lsphp${VER}: binary not found"
    fi
done

echo ""
echo "=== PHP extension installation complete ==="
