#!/bin/bash
# Install CSF (ConfigServer Security & Firewall) - standard for hosting
# CSF integrates natively with CyberPanel UI

echo "=== Installing CSF dependencies ==="
DEBIAN_FRONTEND=noninteractive apt-get install -y \
    libwww-perl liblwp-protocol-https-perl libgd-graph-perl \
    perl-doc iptables 2>&1 | grep -E 'newly installed|already|error' | head -5

echo "=== Downloading + installing CSF ==="
cd /tmp
rm -rf csf
wget -q https://download.configserver.com/csf.tgz
tar -xzf csf.tgz
cd csf
sh install.sh 2>&1 | tail -10

echo "=== Configuring CSF for hosting ==="
# Backup original config
cp /etc/csf/csf.conf /etc/csf/csf.conf.bak

# Apply hosting-optimised settings
# Open ports required for a UK hosting company
sed -i 's/^TCP_IN = .*/TCP_IN = "20,21,22,25,53,80,110,143,443,465,587,993,995,2082,2083,2086,2087,2095,2096,3306,8080,8090,8443"/' /etc/csf/csf.conf
sed -i 's/^TCP_OUT = .*/TCP_OUT = "20,21,22,25,37,43,53,80,110,113,443,587,873,2087,2089,2703"/' /etc/csf/csf.conf
sed -i 's/^UDP_IN = .*/UDP_IN = "20,21,53"/' /etc/csf/csf.conf
sed -i 's/^UDP_OUT = .*/UDP_OUT = "20,21,53,113,123"/' /etc/csf/csf.conf

# Syslog/connection flood protection
sed -i 's/^CT_LIMIT = .*/CT_LIMIT = 100/' /etc/csf/csf.conf
sed -i 's/^CT_INTERVAL = .*/CT_INTERVAL = 30/' /etc/csf/csf.conf
sed -i 's/^CT_BLOCK_TIME = .*/CT_BLOCK_TIME = 1800/' /etc/csf/csf.conf
sed -i 's/^CT_COUNT = .*/CT_COUNT = "22;5,80;100,443;100,8090;20"/' /etc/csf/csf.conf

# SYN flood protection
sed -i 's/^SYNFLOOD = .*/SYNFLOOD = "1"/' /etc/csf/csf.conf
sed -i 's/^SYNFLOOD_RATE = .*/SYNFLOOD_RATE = "100\/s"/' /etc/csf/csf.conf
sed -i 's/^SYNFLOOD_BURST = .*/SYNFLOOD_BURST = "150"/' /etc/csf/csf.conf

# ICMP flood protection  
sed -i 's/^ICMP_IN = .*/ICMP_IN = "1"/' /etc/csf/csf.conf
sed -i 's/^ICMP_IN_LIMIT = .*/ICMP_IN_LIMIT = "10\/s"/' /etc/csf/csf.conf

# Port scan detection
sed -i 's/^PS_INTERVAL = .*/PS_INTERVAL = "300"/' /etc/csf/csf.conf
sed -i 's/^PS_LIMIT = .*/PS_LIMIT = "10"/' /etc/csf/csf.conf

# Login tracking (work with Fail2ban)
sed -i 's/^LF_SSHD = .*/LF_SSHD = "5"/' /etc/csf/csf.conf
sed -i 's/^LF_FTPD = .*/LF_FTPD = "10"/' /etc/csf/csf.conf
sed -i 's/^LF_SMTPAUTH = .*/LF_SMTPAUTH = "5"/' /etc/csf/csf.conf
sed -i 's/^LF_POP3D = .*/LF_POP3D = "10"/' /etc/csf/csf.conf
sed -i 's/^LF_IMAPD = .*/LF_IMAPD = "10"/' /etc/csf/csf.conf
sed -i 's/^LF_TRIGGER = .*/LF_TRIGGER = "30"/' /etc/csf/csf.conf
sed -i 's/^LF_PERMBAN = .*/LF_PERMBAN = "10"/' /etc/csf/csf.conf

# Email alerts to admin
sed -i 's/^LF_ALERT_TO = .*/LF_ALERT_TO = "admin@hostingocean.co.uk"/' /etc/csf/csf.conf

# Whitelist server's own IP and localhost
echo "127.0.0.1" >> /etc/csf/csf.allow
echo "95.111.247.141" >> /etc/csf/csf.allow

# Start CSF in TESTING mode first (TESTING=1 means firewall rules expire every 5 min)
# We'll switch to live mode after verification
sed -i 's/^TESTING = .*/TESTING = "0"/' /etc/csf/csf.conf

csf -r 2>&1 | tail -5
sleep 2

echo ""
echo "=== CSF status ==="
csf -l 2>&1 | head -10 || echo "CSF active (use 'csf -l' to list rules)"
csf -v 2>&1 | head -3
echo ""
echo "=== CSF installed and running ==="
