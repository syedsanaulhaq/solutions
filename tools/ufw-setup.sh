#!/bin/bash
# UFW firewall setup for UK hosting environment

ufw --force reset
ufw default deny incoming
ufw default allow outgoing

# Core services
ufw allow 22/tcp    comment 'SSH'
ufw allow 80/tcp    comment 'HTTP'
ufw allow 443/tcp   comment 'HTTPS'
ufw allow 8090/tcp  comment 'CyberPanel Admin'
ufw allow 8080/tcp  comment 'OLS WebAdmin'

# FTP
ufw allow 20/tcp    comment 'FTP data'
ufw allow 21/tcp    comment 'FTP control'
ufw allow 40110:40210/tcp comment 'FTP passive'

# Mail
ufw allow 25/tcp    comment 'SMTP'
ufw allow 465/tcp   comment 'SMTPS'
ufw allow 587/tcp   comment 'SMTP submission'
ufw allow 110/tcp   comment 'POP3'
ufw allow 995/tcp   comment 'POP3S'
ufw allow 143/tcp   comment 'IMAP'
ufw allow 993/tcp   comment 'IMAPS'

# DNS (for PowerDNS)
ufw allow 53/tcp    comment 'DNS TCP'
ufw allow 53/udp    comment 'DNS UDP'

# Rate-limit SSH brute force at firewall level
ufw limit 22/tcp    comment 'SSH rate limit'

# Enable firewall
ufw --force enable
ufw status verbose
