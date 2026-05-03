#!/bin/bash
# Tune MariaDB for production hosting + configure OPcache for all PHP versions
# Server: 7.8GB RAM → allocate ~2GB to MariaDB InnoDB pool

# --- MariaDB tuning ---
echo "=== Tuning MariaDB ==="

cat > /etc/mysql/mariadb.conf.d/99-hostingocean.cnf << 'EOF'
[mysqld]
# HostingOcean Production Tuning
# Server: 7.8GB RAM

# InnoDB - primary storage engine
innodb_buffer_pool_size         = 2G
innodb_buffer_pool_instances    = 2
innodb_log_file_size            = 256M
innodb_log_buffer_size          = 64M
innodb_flush_log_at_trx_commit  = 2
innodb_flush_method             = O_DIRECT
innodb_file_per_table           = 1
innodb_stats_on_metadata        = 0
innodb_read_io_threads          = 4
innodb_write_io_threads         = 4

# Connection limits
max_connections                 = 300
max_connect_errors              = 1000000
wait_timeout                    = 300
interactive_timeout             = 300
connect_timeout                 = 10

# Query cache (disabled in MariaDB 10.1.7+, use innodb buffer instead)
query_cache_type                = 0
query_cache_size                = 0

# Temp tables + sorting
tmp_table_size                  = 64M
max_heap_table_size             = 64M
sort_buffer_size                = 4M
join_buffer_size                = 4M
read_buffer_size                = 2M
read_rnd_buffer_size            = 8M

# MyISAM (legacy tables)
key_buffer_size                 = 64M
myisam_sort_buffer_size         = 64M

# Logging
slow_query_log                  = 1
slow_query_log_file             = /var/log/mysql/slow.log
long_query_time                 = 2
log_queries_not_using_indexes   = 0

# Binary logging (for replication/recovery)
expire_logs_days                = 7
max_binlog_size                 = 100M

# Character set - UTF8MB4 (emoji support)
character_set_server            = utf8mb4
collation_server                = utf8mb4_unicode_ci
character_set_client_handshake  = FALSE

# Security
local_infile                    = 0
skip_name_resolve               = 1

# Open files
open_files_limit                = 65535
table_open_cache                = 4000
table_definition_cache          = 2000

[mysql]
default-character-set           = utf8mb4

[client]
default-character-set           = utf8mb4
EOF

# Ensure slow log dir exists
mkdir -p /var/log/mysql
chown mysql:mysql /var/log/mysql

# Restart MariaDB
systemctl restart mariadb
sleep 3
echo "MariaDB status: $(systemctl is-active mariadb)"
mysql -u root -p"$(cat /etc/cyberpanel/mysqlPassword)" -e "SHOW VARIABLES LIKE 'innodb_buffer_pool_size';" 2>/dev/null | grep innodb

# --- OPcache tuning for all PHP versions ---
echo ""
echo "=== Tuning OPcache for all PHP versions ==="

for VER in 8.0 8.1 8.2 8.3; do
    VNUM="${VER/./}"
    INI_PATH="/usr/local/lsws/lsphp${VNUM}/etc/php/${VER}/litespeed/php.ini"
    if [ -f "$INI_PATH" ]; then
        # Check if already configured
        if grep -q "opcache.memory_consumption=256" "$INI_PATH" 2>/dev/null; then
            echo "lsphp${VNUM}: OPcache already tuned"
            continue
        fi

        cat >> "$INI_PATH" << 'OPCACHE'

; HostingOcean OPcache Tuning
opcache.enable=1
opcache.enable_cli=0
opcache.memory_consumption=256
opcache.interned_strings_buffer=32
opcache.max_accelerated_files=20000
opcache.max_wasted_percentage=10
opcache.validate_timestamps=1
opcache.revalidate_freq=2
opcache.fast_shutdown=1
opcache.enable_file_override=0
opcache.save_comments=1
opcache.huge_code_pages=0
OPCACHE
        echo "lsphp${VNUM}: OPcache configured at $INI_PATH"
    else
        echo "lsphp${VNUM}: php.ini not found at $INI_PATH"
    fi
done

# Reload OLS to pick up PHP ini changes
/usr/local/lsws/bin/lswsctrl restart 2>/dev/null || killall -USR1 lshttpd 2>/dev/null
sleep 2
echo ""
echo "=== MariaDB + OPcache tuning complete ==="
