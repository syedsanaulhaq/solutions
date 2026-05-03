#!/usr/bin/env python3
"""Add OLS reverse proxy config for Node.js sites."""
import os

# Config for hostingocean.co.uk -> port 3002
main_proxy = """
extprocessor nodejs_main {
  type                    proxy
  address                 127.0.0.1:3002
  maxConns                100
  pcKeepAliveTimeout      60
  initTimeout             60
  retryTimeout            0
  respBuffer              0
}

context / {
  type                    proxy
  handler                 nodejs_main
  addDefaultCharset       off
}
"""

# Config for solutions.hostingocean.co.uk -> port 3001
solutions_proxy = """
extprocessor nodejs_solutions {
  type                    proxy
  address                 127.0.0.1:3001
  maxConns                100
  pcKeepAliveTimeout      60
  initTimeout             60
  retryTimeout            0
  respBuffer              0
}

context / {
  type                    proxy
  handler                 nodejs_solutions
  addDefaultCharset       off
}
"""

configs = [
    ('/usr/local/lsws/conf/vhosts/hostingocean.co.uk/vhost.conf', main_proxy),
    ('/usr/local/lsws/conf/vhosts/solutions.hostingocean.co.uk/vhost.conf', solutions_proxy),
]

for path, proxy_block in configs:
    with open(path, 'r') as f:
        content = f.read()
    
    # Only add if not already present
    if 'type                    proxy' not in content:
        content += proxy_block
        with open(path, 'w') as f:
            f.write(content)
        print(f"Updated: {path}")
    else:
        print(f"Already has proxy: {path}")

print("Done! Restarting OpenLiteSpeed...")
os.system('/usr/local/lsws/bin/lswsctrl restart')
print("OLS restarted.")
