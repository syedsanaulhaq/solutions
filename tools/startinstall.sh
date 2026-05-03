#!/bin/bash
pkill -f 'cyberpanel.sh|install.py' 2>/dev/null
sleep 1
cd /root/cyberpanel
nohup bash cyberpanel.sh default > /root/cyberpanel_final.log 2>&1 &
echo "PID:$!"
