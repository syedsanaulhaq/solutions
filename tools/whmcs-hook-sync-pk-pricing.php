<?php
/**
 * WHMCS Hook: Auto-sync pk.hostingocean.co.uk pricing
 *
 * Place this file at:
 *   /home/hostingoceanuk/public_html/whmcs/includes/hooks/sync_pk_pricing.php
 *
 * Triggers:
 *   - ProductAdd   → runs sync immediately when a new product is created
 *   - ProductEdit  → runs sync immediately when a product price/name is changed
 *   - AfterCronJob → runs sync after WHMCS's own daily cron (belt-and-braces)
 */

if (!defined('WHMCS')) {
    die('Direct access not permitted');
}

define('PK_SYNC_SCRIPT', '/var/www/hostingocean/frontend/hostingocean-net/sync-pricing.php');
define('PK_SYNC_PHP',    '/opt/cpanel/ea-php81/root/usr/bin/php');
define('PK_SYNC_LOG',    '/var/log/whmcs-price-sync.log');

function triggerPkPricingSync(string $reason): void {
    // Run in background so it does not slow down the WHMCS admin page
    $cmd = PK_SYNC_PHP . ' ' . escapeshellarg(PK_SYNC_SCRIPT)
         . ' >> ' . escapeshellarg(PK_SYNC_LOG) . ' 2>&1 &';
    @exec($cmd);
    logActivity('PK Pricing Sync triggered: ' . $reason);
}

// Fires when a product is created in WHMCS admin
add_hook('ProductAdd', 1, function (array $vars): void {
    triggerPkPricingSync('ProductAdd id=' . ($vars['pid'] ?? '?'));
});

// Fires when a product is saved/edited in WHMCS admin
add_hook('ProductEdit', 1, function (array $vars): void {
    triggerPkPricingSync('ProductEdit id=' . ($vars['pid'] ?? '?'));
});

// Fires after WHMCS's own daily cron job — keeps prices in sync even without admin changes
add_hook('AfterCronJob', 1, function (array $vars): void {
    triggerPkPricingSync('AfterCronJob');
});
