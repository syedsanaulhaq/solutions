#!/bin/bash
# Create my.hostingocean.co.uk as a child domain in CyberPanel via Django

echo "=== Creating my.hostingocean.co.uk child domain ==="

cd /usr/local/CyberCP

# Use CyberPanel's Python management to create the child domain
/usr/local/CyberCP/bin/python manage.py shell << 'PYEOF'
import sys, os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'CyberCP.settings')

try:
    from websiteFunctions.models import ChildDomain
    from loginSystem.models import Administrator
    from websiteFunctions.models import Websites
    
    # Check if already exists
    existing = ChildDomain.objects.filter(domain='my.hostingocean.co.uk').first()
    if existing:
        print("ALREADY_EXISTS: my.hostingocean.co.uk already created")
    else:
        print("NEEDS_CREATION: will use CLI method")
except Exception as e:
    print(f"IMPORT_ERROR: {e}")
PYEOF

echo "--- Checking if my.hostingocean.co.uk exists in OLS ---"
ls /usr/local/lsws/conf/vhosts/ | grep 'my\|billing'
ls /home/ | grep 'my\.'

echo "--- Done checking ---"
