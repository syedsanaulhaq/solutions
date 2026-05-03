#!/bin/bash
# Install ClamAV + SpamAssassin for email scanning

echo "=== Installing ClamAV ==="
DEBIAN_FRONTEND=noninteractive apt-get install -y clamav clamav-daemon clamav-freshclam 2>&1 | grep -E 'newly installed|already|error' | head -5

# Stop freshclam before updating DB
systemctl stop clamav-freshclam 2>/dev/null || true

# Update virus definitions
echo "Updating ClamAV database..."
freshclam 2>&1 | tail -5

# Configure ClamAV daemon
sed -i 's/^#TCPSocket/TCPSocket/' /etc/clamav/clamd.conf 2>/dev/null || true
sed -i 's/^#TCPAddr/TCPAddr/' /etc/clamav/clamd.conf 2>/dev/null || true

systemctl enable clamav-freshclam clamav-daemon
systemctl start clamav-freshclam
systemctl start clamav-daemon
sleep 3
echo "ClamAV: $(systemctl is-active clamav-daemon)"

echo ""
echo "=== Installing SpamAssassin ==="
DEBIAN_FRONTEND=noninteractive apt-get install -y spamassassin spamc 2>&1 | grep -E 'newly installed|already|error' | head -5

# Configure SpamAssassin
cat > /etc/spamassassin/local.cf << 'EOF'
# HostingOcean SpamAssassin Config
# Required score to be considered spam
required_score 5.0

# Rewrite subject of spam
rewrite_header Subject [SPAM]

# UK-friendly: enable Bayes filtering
use_bayes 1
bayes_auto_learn 1
bayes_auto_learn_threshold_nonspam 0.1
bayes_auto_learn_threshold_spam 12.0

# Enable DNS-based checks (RBLs)
skip_rbl_checks 0

# Enable SPF checks
ifplugin Mail::SpamAssassin::Plugin::SPF
  use_spf 1
  spf_timeout 5
endif

# Trusted networks (localhost)
trusted_networks 127.0.0.0/8

# Score adjustments
score URIBL_BLOCKED 0

# UK-specific: report language
report_safe 0
EOF

# Enable SpamAssassin daemon
sed -i 's/^ENABLED=0/ENABLED=1/' /etc/default/spamassassin 2>/dev/null || true
sed -i 's/^CRON=0/CRON=1/' /etc/default/spamassassin 2>/dev/null || true

systemctl enable spamassassin
systemctl start spamassassin
sleep 2
echo "SpamAssassin: $(systemctl is-active spamassassin)"

# Update SpamAssassin rules
sa-update 2>&1 | tail -3 || true

echo ""
echo "=== ClamAV + SpamAssassin installation complete ==="
clamscan --version 2>/dev/null | head -1
spamassassin --version 2>/dev/null | head -1
