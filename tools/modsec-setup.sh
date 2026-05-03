#!/bin/bash
# Enable ModSecurity WAF with OWASP CRS in OpenLiteSpeed
# CyberPanel/OLS has built-in ModSecurity support

echo "=== Setting up ModSecurity WAF ==="

# Create modsec config directory
mkdir -p /usr/local/lsws/conf/modsec

# Install ModSecurity recommended conf
cat > /usr/local/lsws/conf/modsec/modsec.conf << 'EOF'
# ModSecurity Core Rules - OpenLiteSpeed
SecRuleEngine On
SecRequestBodyAccess On
SecRequestBodyLimit 13107200
SecRequestBodyNoFilesLimit 131072
SecRequestBodyInMemoryLimit 131072
SecRequestBodyLimitAction Reject
SecResponseBodyAccess Off
SecPcreMatchLimit 100000
SecPcreMatchLimitRecursion 100000
SecTmpDir /tmp/
SecDataDir /tmp/
SecAuditEngine RelevantOnly
SecAuditLogRelevantStatus "^(?:5|4(?!04))"
SecAuditLogParts ABIJDEFHZ
SecAuditLogType Serial
SecAuditLog /usr/local/lsws/logs/modsec_audit.log
SecArgumentSeparator &
SecCookieFormat 0
SecUnicodeMapFile unicode.mapping 20127
SecStatusEngine Off
EOF

# Download OWASP CRS
echo "=== Downloading OWASP Core Rule Set ==="
cd /usr/local/lsws/conf/modsec

if [ ! -d "owasp-crs" ]; then
    curl -fsSL https://github.com/coreruleset/coreruleset/archive/refs/tags/v4.7.0.tar.gz -o crs.tar.gz 2>&1
    if [ -f crs.tar.gz ] && [ -s crs.tar.gz ]; then
        tar -xzf crs.tar.gz
        mv coreruleset-4.7.0 owasp-crs
        rm crs.tar.gz
        echo "OWASP CRS v4.7.0 downloaded"
    else
        echo "CRS download failed, using minimal ruleset"
        mkdir -p owasp-crs/rules
    fi
fi

# Create CRS setup conf
if [ -f /usr/local/lsws/conf/modsec/owasp-crs/crs-setup.conf.example ]; then
    cp /usr/local/lsws/conf/modsec/owasp-crs/crs-setup.conf.example \
       /usr/local/lsws/conf/modsec/owasp-crs/crs-setup.conf
fi

# Create main modsec includes file for OLS
cat > /usr/local/lsws/conf/modsec/main.conf << 'EOF'
Include /usr/local/lsws/conf/modsec/modsec.conf
Include /usr/local/lsws/conf/modsec/owasp-crs/crs-setup.conf
Include /usr/local/lsws/conf/modsec/owasp-crs/rules/*.conf
EOF

echo "=== ModSecurity files created ==="
ls -la /usr/local/lsws/conf/modsec/
echo ""

# Enable ModSecurity in OLS via httpd_config.xml
HTTPD_CONF="/usr/local/lsws/conf/httpd_config.xml"
if [ -f "$HTTPD_CONF" ]; then
    if grep -q "modsecurity" "$HTTPD_CONF" 2>/dev/null; then
        echo "ModSecurity already in httpd_config.xml"
    else
        # Add ModSecurity config before </httpServerConfig>
        sed -i 's|</httpServerConfig>|<modsecurity>\n  <enabled>1</enabled>\n  <modsecurity>path(/usr/local/lsws/conf/modsec/main.conf)</modsecurity>\n</modsecurity>\n</httpServerConfig>|' "$HTTPD_CONF"
        echo "ModSecurity added to httpd_config.xml"
    fi
else
    echo "httpd_config.xml not found at $HTTPD_CONF"
    ls /usr/local/lsws/conf/*.xml 2>/dev/null | head -5
fi

# Restart OLS
/usr/local/lsws/bin/lswsctrl restart 2>/dev/null
sleep 3
echo "OLS restarted"
echo ""
echo "=== ModSecurity WAF setup complete ==="
