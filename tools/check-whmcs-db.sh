#!/bin/bash
mysql -u root -p6xqBcu0rSmXCMs -e "SELECT db,user FROM mysql.db WHERE db LIKE '%whmcs%';" 2>/dev/null | grep -v Warning
echo "---"
mysql -u root -p6xqBcu0rSmXCMs -e "SELECT User,Host FROM mysql.user WHERE User='whmcs_user';" 2>/dev/null | grep -v Warning
