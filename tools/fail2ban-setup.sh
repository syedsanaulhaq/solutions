#!/bin/bash
# Install and configure Fail2ban for a UK hosting environment
# Covers: SSH, CyberPanel, WordPress xmlrpc, OLS 4xx flooding

echo "=== Installing Fail2ban ==="
DEBIAN_FRONTEND=noninteractive apt-get install -y fail2ban 2>&1 | grep -E 'newly installed|already|error' | head -5

# --- Main jail.local ---
cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
# Ban for 1 hour
bantime  = 3600
# 10 minute detection window
findtime = 600
# 5 failures = ban
maxretry = 5
# UK-friendly: don't ban private/local IPs
ignoreip = 127.0.0.1/8 ::1 10.0.0.0/8 172.16.0.0/12 192.168.0.0/16

# Email alerts
destemail = admin@hostingocean.co.uk
sender    = fail2ban@hostingocean.co.uk
sendername = Fail2Ban-HostingOcean

# Action: ban + log (no email by default to avoid spam)
action = %(action_)s

# Backend
backend = auto

[sshd]
enabled  = true
port     = ssh
logpath  = %(sshd_log)s
maxretry = 3
bantime  = 7200

[sshd-ddos]
enabled  = true
port     = ssh
filter   = sshd
logpath  = %(sshd_log)s
maxretry = 10
findtime = 120
bantime  = 86400

[cyberpanel]
enabled  = true
port     = 8090
filter   = cyberpanel
logpath  = /usr/local/lsws/logs/access.log
maxretry = 5
bantime  = 7200

[wordpress]
enabled  = true
port     = http,https
filter   = wordpress
logpath  = /usr/local/lsws/logs/access.log
maxretry = 5
bantime  = 3600

[openlitespeed-botscan]
enabled  = true
port     = http,https
filter   = openlitespeed-botscan
logpath  = /usr/local/lsws/logs/access.log
maxretry = 20
findtime = 60
bantime  = 3600

[phpmyadmin]
enabled  = true
port     = http,https
filter   = phpmyadmin-syslog
logpath  = /var/log/syslog
maxretry = 5
bantime  = 7200

[postfix]
enabled  = true
port     = smtp,465,submission
backend  = systemd
journalmatch = _SYSTEMD_UNIT=postfix@-.service
maxretry = 5

[dovecot]
enabled  = true
port     = pop3,pop3s,imap,imaps,submission,465,sieve
backend  = systemd
journalmatch = _SYSTEMD_UNIT=dovecot.service
maxretry = 5

[postfix-sasl]
enabled  = true
port     = smtp,465,submission,imap,imaps,pop3,pop3s
backend  = systemd
journalmatch = _SYSTEMD_UNIT=postfix@-.service
maxretry = 3
bantime  = 3600
EOF

# --- Custom filter: CyberPanel login ---
cat > /etc/fail2ban/filter.d/cyberpanel.conf << 'EOF'
[Definition]
failregex = ^.*"POST /verifyLogin HTTP.*" 403.*$
            ^.*"POST /verifyLogin HTTP.*" 401.*$
            ^.*Failed login attempt from <HOST>.*$
ignoreregex =
EOF

# --- Custom filter: WordPress brute force ---
cat > /etc/fail2ban/filter.d/wordpress.conf << 'EOF'
[Definition]
failregex = ^<HOST> .* "POST .*wp-login\.php HTTP.*" [45]\d\d .*$
            ^<HOST> .* "POST .*xmlrpc\.php HTTP.*" [45]\d\d .*$
            ^<HOST> .* "GET .*wp-login\.php\?.*failed.*HTTP.*" .*$
ignoreregex =
EOF

# --- Custom filter: OLS bot scanning ---
cat > /etc/fail2ban/filter.d/openlitespeed-botscan.conf << 'EOF'
[Definition]
failregex = ^<HOST> .* "(GET|POST|HEAD) .*\.(php|asp|aspx|cgi|pl|py|rb|sh|env|git|svn|htaccess|config|bak|sql|zip|tar|gz).*" (404|403|400|405) .*$
ignoreregex = ^<HOST> .* "GET .*(\.css|\.js|\.png|\.jpg|\.gif|\.ico|\.woff|\.ttf).*" .*$
EOF

# Enable and start Fail2ban
systemctl enable fail2ban
systemctl restart fail2ban
sleep 3

echo ""
echo "=== Fail2ban status ==="
fail2ban-client status 2>&1
echo ""
echo "Active jails:"
fail2ban-client status 2>&1 | grep "Jail list"
