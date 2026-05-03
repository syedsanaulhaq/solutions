#!/bin/bash
for s in lshttpd fail2ban memcached clamav-daemon clamav-freshclam spamassassin mariadb; do
    printf "%-22s %s\n" "$s" "$(systemctl is-active $s)"
done
echo ""
echo "=== ModSecurity in vhosts ==="
grep -l 'modsecurity' /usr/local/lsws/conf/vhosts/*/vhost.conf 2>/dev/null
echo ""
echo "=== Fail2ban jails ==="
fail2ban-client status 2>/dev/null | grep 'Jail list'
echo ""
echo "=== iptables INPUT rules ==="
iptables -L INPUT -n --line-numbers | head -12
