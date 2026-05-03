#!/bin/bash
# Configure and start ClamAV + SpamAssassin

# Start ClamAV services
systemctl start clamav-freshclam clamav-daemon
sleep 4
echo "clamav-daemon: $(systemctl is-active clamav-daemon)"
echo "clamav-freshclam: $(systemctl is-active clamav-freshclam)"

# Configure SpamAssassin
mkdir -p /etc/spamassassin
cat > /etc/spamassassin/local.cf << 'EOF'
required_score 5.0
rewrite_header Subject [SPAM]
use_bayes 1
bayes_auto_learn 1
bayes_auto_learn_threshold_nonspam 0.1
bayes_auto_learn_threshold_spam 12.0
skip_rbl_checks 0
ifplugin Mail::SpamAssassin::Plugin::SPF
  use_spf 1
  spf_timeout 5
endif
trusted_networks 127.0.0.0/8
score URIBL_BLOCKED 0
report_safe 0
EOF
echo "SpamAssassin local.cf written"

# Enable SpamAssassin
sed -i 's/^ENABLED=0/ENABLED=1/' /etc/default/spamassassin 2>/dev/null || true
sed -i 's/^CRON=0/CRON=1/' /etc/default/spamassassin 2>/dev/null || true

systemctl enable spamassassin
systemctl start spamassassin
sleep 3
echo "spamassassin: $(systemctl is-active spamassassin)"

# Update SpamAssassin rules
sa-update 2>&1 | tail -3 || true

echo ""
echo "=== Services status ==="
echo "clamav-daemon: $(systemctl is-active clamav-daemon)"
echo "clamav-freshclam: $(systemctl is-active clamav-freshclam)"
echo "spamassassin: $(systemctl is-active spamassassin)"
clamscan --version | head -1
spamassassin --version | head -1
