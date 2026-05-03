#!/bin/bash
# Full cleanup before fresh CyberPanel install
echo "=== Checking MySQL password ==="
PASS=$(cat /etc/cyberpanel/mysqlPassword 2>/dev/null)
echo "Current password file: '$PASS'"

echo "=== Testing MySQL connection ==="
if [ -n "$PASS" ]; then
  mysql -u root -p"$PASS" -e "SELECT user,plugin FROM mysql.user;" 2>&1 | head -10
else
  mysql -u root -e "SELECT user,plugin FROM mysql.user;" 2>&1 | head -10
fi

echo "=== Current groups ==="
getent group ftpgroup ftpuser vmail cyberpanel 2>&1
echo "=== Current users ==="
getent passwd ftpuser cyberpanel 2>&1
