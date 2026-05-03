#!/bin/bash
DOMAIN="whmcs.hostingocean.co.uk"
HTTPD="/usr/local/lsws/conf/httpd_config.conf"

# Add to Default listener (HTTP)
sed -i "s|  map                     hostingocean.co.uk hostingocean.co.uk\n|  map                     hostingocean.co.uk hostingocean.co.uk\n  map                     ${DOMAIN} ${DOMAIN}\n|g" "${HTTPD}" 2>/dev/null

# Use python for reliable multiline sed
python3 << PYEOF
import re

with open('${HTTPD}', 'r') as f:
    content = f.read()

domain = '${DOMAIN}'
map_line = f'  map                     {domain} {domain}'

# If already there, skip
if map_line in content:
    print(f"{domain} already in httpd_config.conf")
    exit(0)

# Add after every occurrence of "map  hostingocean.co.uk hostingocean.co.uk" in listener sections
old = '  map                     hostingocean.co.uk hostingocean.co.uk'
new = f'  map                     hostingocean.co.uk hostingocean.co.uk\n{map_line}'

# Do replacement for Default, SSL, SSL IPv6 listeners
updated = content.replace(old, new)
additions = updated.count(map_line) - content.count(map_line)

with open('${HTTPD}', 'w') as f:
    f.write(updated)

print(f"Added {additions} listener map entries for {domain}")
PYEOF

/usr/local/lsws/bin/lswsctrl restart
sleep 3
echo "OLS restarted"
echo "=== Verify listener mappings ==="
grep "whmcs\|hostingocean" /usr/local/lsws/conf/httpd_config.conf | grep -v "^#"
