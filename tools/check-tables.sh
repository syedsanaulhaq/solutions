#!/bin/bash
mysql -u root -p6xqBcu0rSmXCMs cyberpanel 2>/dev/null << 'SQL'
SHOW TABLES LIKE '%child%';
SQL
echo "---"
mysql -u root -p6xqBcu0rSmXCMs cyberpanel 2>/dev/null << 'SQL'
SHOW TABLES LIKE '%domain%';
SQL
