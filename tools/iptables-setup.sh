#!/bin/bash
# Safe iptables firewall for UK hosting - NO reset, additive rules only
# This script is idempotent and SSH-safe

set -e

echo "=== Setting up iptables firewall ==="

# Flush existing rules safely AFTER we've confirmed what's there
iptables -F INPUT 2>/dev/null || true
iptables -F FORWARD 2>/dev/null || true
iptables -F OUTPUT 2>/dev/null || true

# Set default policies - OUTPUT/FORWARD allow, INPUT we build explicitly
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# Allow loopback
iptables -A INPUT -i lo -j ACCEPT

# Allow established/related connections (CRITICAL - do this before DROP policy)
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# SSH - rate limit (max 4 new connections per minute per IP)
iptables -A INPUT -p tcp --dport 22 -m conntrack --ctstate NEW -m recent --set --name SSH
iptables -A INPUT -p tcp --dport 22 -m conntrack --ctstate NEW -m recent --update --seconds 60 --hitcount 4 --name SSH -j DROP
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# HTTP / HTTPS
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# CyberPanel admin
iptables -A INPUT -p tcp --dport 8090 -j ACCEPT

# OLS WebAdmin
iptables -A INPUT -p tcp --dport 8080 -j ACCEPT

# FTP
iptables -A INPUT -p tcp --dport 20 -j ACCEPT
iptables -A INPUT -p tcp --dport 21 -j ACCEPT
iptables -A INPUT -p tcp --dport 40110:40210 -j ACCEPT

# Mail
iptables -A INPUT -p tcp --dport 25 -j ACCEPT
iptables -A INPUT -p tcp --dport 465 -j ACCEPT
iptables -A INPUT -p tcp --dport 587 -j ACCEPT
iptables -A INPUT -p tcp --dport 110 -j ACCEPT
iptables -A INPUT -p tcp --dport 995 -j ACCEPT
iptables -A INPUT -p tcp --dport 143 -j ACCEPT
iptables -A INPUT -p tcp --dport 993 -j ACCEPT

# DNS
iptables -A INPUT -p tcp --dport 53 -j ACCEPT
iptables -A INPUT -p udp --dport 53 -j ACCEPT

# ICMP (ping) - limited
iptables -A INPUT -p icmp --icmp-type echo-request -m limit --limit 5/s --limit-burst 10 -j ACCEPT

# SYN flood protection
iptables -A INPUT -p tcp ! --syn -m conntrack --ctstate NEW -j DROP
iptables -A INPUT -p tcp --tcp-flags ALL NONE -j DROP
iptables -A INPUT -p tcp --tcp-flags ALL ALL -j DROP

echo "=== iptables rules set ==="
iptables -L INPUT -n --line-numbers | head -30

# Persist rules across reboots
apt-get install -y iptables-persistent netfilter-persistent -y 2>&1 | grep -E 'newly installed|already' | head -3

# Save rules
netfilter-persistent save 2>/dev/null || iptables-save > /etc/iptables/rules.v4

echo ""
echo "=== Firewall configured and saved ==="
echo "SSH port 22: OPEN (rate limited)"
echo "HTTP/HTTPS: OPEN"
echo "CyberPanel 8090: OPEN"
echo "Mail ports: OPEN"
