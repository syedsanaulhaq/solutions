#!/bin/bash
# Restore root privileges and set up for CyberPanel installer

# Root can connect via unix_socket but lost GRANT privileges
# Fix by stopping MariaDB and using skip-grant-tables to restore access bits

systemctl stop mariadb 2>/dev/null
pkill -9 -f mysqld 2>/dev/null
sleep 3

# Use json_set to ONLY update plugin/auth_string, preserving access bits
cat > /tmp/fixgrants.sql <<'SQL'
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

# Start unsafe mysqld
mysqld_safe --skip-grant-tables --skip-networking &> /tmp/mysql_safe.log &
MYSQLPID=$!
sleep 8

# Apply fix
mysql -u root < /tmp/fixgrants.sql
echo "Grants fix result: $?"

# Kill unsafe mysqld
kill $MYSQLPID 2>/dev/null
pkill -f mysqld_safe 2>/dev/null
pkill -9 -f mysqld 2>/dev/null
sleep 3

# Start MariaDB normally
systemctl start mariadb
sleep 3

# Test full access
mysql -u root -e "SHOW GRANTS FOR 'root'@'localhost';" 2>&1
mysql -u root -e "CREATE DATABASE IF NOT EXISTS testgrant; DROP DATABASE testgrant; SELECT 'Full access OK';" 2>&1

# Remove stale password file
rm -f /etc/cyberpanel/mysqlPassword
echo "Ready for CyberPanel install"
echo "DONE"
