#!/bin/bash
# Reset MariaDB root to unix_socket auth (no password) so CyberPanel installer can take over

# Stop MariaDB cleanly
systemctl stop mariadb 2>/dev/null
pkill -9 -f mysqld 2>/dev/null
sleep 3

# Write SQL to restore unix_socket auth and clear password
cat > /tmp/reset.sql <<'SQL'
FLUSH PRIVILEGES;
UPDATE mysql.global_priv SET priv='{"plugin":"unix_socket","authentication_string":""}' WHERE User='root' AND Host='localhost';
DROP DATABASE IF EXISTS cyberpanel;
FLUSH PRIVILEGES;
SQL

# Start unsafe mysqld
mysqld_safe --skip-grant-tables --skip-networking &> /tmp/mysql_safe.log &
MYSQLPID=$!
sleep 8

# Run reset
mysql -u root < /tmp/reset.sql
RESULT=$?
echo "SQL result: $RESULT"

# Kill unsafe mysqld
kill $MYSQLPID 2>/dev/null
pkill -f mysqld_safe 2>/dev/null
pkill -9 -f mysqld 2>/dev/null
sleep 3

# Start MariaDB normally
systemctl start mariadb
sleep 3

# Test access without password (unix_socket)
mysql -u root -e "SELECT 'unix_socket auth OK'; DROP DATABASE IF EXISTS cyberpanel;" 2>&1

# Remove any stale mysqlPassword file so installer generates its own
rm -f /etc/cyberpanel/mysqlPassword
echo "Removed /etc/cyberpanel/mysqlPassword"
echo "DONE"
