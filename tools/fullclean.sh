#!/bin/bash
# Full cleanup before fresh CyberPanel install attempt

echo "=== Step 1: Kill any running installer ==="
pkill -9 -f 'cyberpanel.sh|install.py|installCyberPanel' 2>/dev/null
echo "Killed installer processes"

echo "=== Step 2: Reset MariaDB root to unix_socket ==="
systemctl stop mariadb 2>/dev/null
pkill -9 -f mysqld 2>/dev/null
sleep 3

cat > /tmp/fixroot.sql <<'SQL'
UPDATE mysql.global_priv 
SET priv = json_set(
  CASE WHEN priv IS NULL OR priv = '' THEN '{}' ELSE priv END,
  '$.plugin', 'unix_socket',
  '$.authentication_string', '',
  '$.access', 18446744073709551615
)
WHERE User='root' AND Host='localhost';
FLUSH PRIVILEGES;
SQL

mysqld_safe --skip-grant-tables --skip-networking &>/tmp/mysql_safe.log &
MYSQLPID=$!
sleep 8
mysql -u root < /tmp/fixroot.sql
echo "Root reset result: $?"
kill $MYSQLPID 2>/dev/null
pkill -f mysqld_safe 2>/dev/null
pkill -9 -f mysqld 2>/dev/null
sleep 3
systemctl start mariadb
sleep 3

echo "=== Step 3: Clean up DB state ==="
mysql -u root -e "DROP USER IF EXISTS 'cyberpanel'@'localhost'; DROP DATABASE IF EXISTS cyberpanel; FLUSH PRIVILEGES;" 2>&1

echo "=== Step 4: Remove stale system users/groups ==="
userdel ftpuser 2>/dev/null && echo "Deleted ftpuser" || echo "ftpuser not found"
userdel cyberpanel 2>/dev/null && echo "Deleted cyberpanel user" || echo "cyberpanel user not found"
groupdel ftpgroup 2>/dev/null && echo "Deleted ftpgroup" || echo "ftpgroup not found"
groupdel cyberpanel 2>/dev/null && echo "Deleted cyberpanel group" || echo "cyberpanel group not found"
groupdel vmail 2>/dev/null && echo "Deleted vmail" || echo "vmail not found"
userdel vmail 2>/dev/null && echo "Deleted vmail user" || true
groupdel mail 2>/dev/null || true

echo "=== Step 5: Remove stale password file ==="
rm -f /etc/cyberpanel/mysqlPassword
echo "Removed mysqlPassword file"

echo "=== Step 6: Verify MariaDB root access ==="
mysql -u root -e "SELECT 'unix_socket OK'; CREATE DATABASE IF NOT EXISTS testclean; DROP DATABASE testclean;" 2>&1

echo "=== Cleanup complete ==="
getent passwd ftpuser cyberpanel 2>&1 | head -5
getent group ftpgroup cyberpanel 2>&1 | head -5
