<?php
/**
 * sync-pricing.php
 * Syncs WHMCS product pricing (GBP) to the pk.hostingocean.co.uk hosting-plans.json
 * using the live GBP→PKR exchange rate.
 *
 * Usage:
 *   /opt/cpanel/ea-php81/root/usr/bin/php /var/www/hostingocean/frontend/hostingocean-net/sync-pricing.php
 *
 * Cron (daily at 06:00 server time):
 *   0 6 * * * /opt/cpanel/ea-php81/root/usr/bin/php /var/www/hostingocean/frontend/hostingocean-net/sync-pricing.php >> /var/log/whmcs-price-sync.log 2>&1
 */

define('WHMCS_DB_HOST', 'localhost');
define('WHMCS_DB_NAME', 'hostingoceanuk_whmcs');
define('WHMCS_DB_USER', 'hostingoceanuk_whmcs');
define('WHMCS_DB_PASS', '2016Wfp61@N3w');

// Absolute path — works whether called from CLI, cron, or a WHMCS hook
define('PLANS_JSON', '/var/www/hostingocean/frontend/hostingocean-net/src/data/hosting-plans.json');

// Map of pk-site plan id → WHMCS product id (currency 3 = GBP)
define('PRODUCT_MAP', json_encode([
    // Web Hosting
    'starter'          => 2,
    'premium'          => 3,
    'advanced'         => 4,
    // VPS
    'vps-basic'        => 8,
    'vps-starter'      => 9,
    'vps-business'     => 12,
    'vps-enterprise'   => 11,
    // Dedicated
    'ds-e3-standard'   => 13,
    'ds-e3-professional' => 14,
    'ds-e3-enterprise' => 15,
]));

// ─── Step 1: Fetch live GBP→PKR rate ────────────────────────────────────────

function fetchLiveRate(): float {
    $url = 'https://open.er-api.com/v6/latest/GBP';
    $ctx = stream_context_create(['http' => ['timeout' => 10]]);
    $response = @file_get_contents($url, false, $ctx);
    if ($response !== false) {
        $data = json_decode($response, true);
        if (isset($data['rates']['PKR']) && $data['rates']['PKR'] > 0) {
            return (float) $data['rates']['PKR'];
        }
    }
    // Fallback: compute from WHMCS stored rates (USD→PKR / USD→GBP)
    log_msg("Live rate fetch failed — using WHMCS fallback rate.");
    return 0.0; // signal fallback
}

// ─── Step 2: Get WHMCS fallback rate from DB ────────────────────────────────

function getWhmcsFallbackRate(PDO $pdo): float {
    $stmt = $pdo->query(
        "SELECT id, `rate` FROM tblcurrencies WHERE id IN (2, 3)"
    );
    $rates = [];
    foreach ($stmt as $row) {
        $rates[(int)$row['id']] = (float)$row['rate'];
    }
    // id=2: PKR rate (PKR per USD), id=3: GBP rate (GBP per USD)
    if (isset($rates[2], $rates[3]) && $rates[3] > 0) {
        return round($rates[2] / $rates[3], 4);
    }
    return 367.2; // hardcoded last-resort fallback
}

// ─── Step 3: Fetch GBP prices + descriptions from WHMCS DB ─────────────────

function fetchWhmcsProducts(PDO $pdo, array $whmcsIds): array {
    $placeholders = implode(',', array_fill(0, count($whmcsIds), '?'));
    $stmt = $pdo->prepare(
        "SELECT p.id, p.name, p.description, pr.monthly
         FROM tblproducts p
         JOIN tblpricing pr ON pr.relid = p.id AND pr.type = 'product'
         WHERE pr.currency = 3
           AND p.id IN ($placeholders)"
    );
    $stmt->execute(array_values($whmcsIds));
    $products = [];
    foreach ($stmt as $row) {
        $products[(int)$row['id']] = [
            'name'        => $row['name'],
            'monthly'     => (float)$row['monthly'],
            'description' => (string)$row['description'],
        ];
    }
    return $products;
}

// ─── Parse HTML description → clean feature strings ─────────────────────────

function parseFeatures(string $html): array {
    preg_match_all('/<li[^>]*>(.*?)<\/li>/si', $html, $matches);
    $features = [];
    foreach ($matches[1] as $item) {
        $clean = trim(strip_tags(html_entity_decode($item, ENT_QUOTES, 'UTF-8')));
        // Collapse multiple spaces/newlines
        $clean = preg_replace('/\s+/', ' ', $clean);
        if ($clean !== '') {
            $features[] = $clean;
        }
    }
    return $features;
}

// ─── Parse feature list → structured VPS specs object ───────────────────────

function parseVpsSpecs(array $features): array {
    $specs = ['cpu' => '', 'ram' => '', 'storage' => '', 'bandwidth' => '', 'os' => 'Linux / Windows'];
    foreach ($features as $f) {
        if ($specs['cpu'] === '' && preg_match('/vcpu|cpu core/i', $f)) {
            $specs['cpu'] = $f;
        } elseif ($specs['ram'] === '' && preg_match('/memory|ddr|\bram\b/i', $f)) {
            $specs['ram'] = $f;
        } elseif ($specs['storage'] === '' && preg_match('/storage|\bssd\b|\bhdd\b|nvme/i', $f)) {
            $specs['storage'] = $f;
        } elseif ($specs['bandwidth'] === '' && preg_match('/bandwidth|transfer/i', $f)) {
            $specs['bandwidth'] = $f;
        } elseif ($specs['os'] === 'Linux / Windows' && preg_match('/cpanel|plesk|windows|linux/i', $f)) {
            $specs['os'] = $f;
        }
    }
    return $specs;
}

// ─── Parse feature list → structured Dedicated specs object ─────────────────

function parseDedicatedSpecs(array $features): array {
    $specs = ['cpu' => '', 'ram' => '', 'storage' => '', 'bandwidth' => '', 'ip' => ''];
    $cpuSet = false;
    foreach ($features as $f) {
        if (!$cpuSet && preg_match('/xeon|intel|amd|ghz/i', $f)) {
            $specs['cpu'] = $f; $cpuSet = true;
        } elseif ($specs['ram'] === '' && preg_match('/gb ddr|\bram\b/i', $f)) {
            $specs['ram'] = $f;
        } elseif ($specs['storage'] === '' && preg_match('/\bx\s*[0-9]|\bsata\b|ssd|hdd|nvme/i', $f)) {
            $specs['storage'] = $f;
        } elseif ($specs['bandwidth'] === '' && preg_match('/bandwidth|\btb\b/i', $f)) {
            $specs['bandwidth'] = $f;
        } elseif ($specs['ip'] === '' && preg_match('/ip|ipv4/i', $f)) {
            $specs['ip'] = $f;
        }
    }
    return $specs;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function log_msg(string $msg): void {
    echo '[' . date('Y-m-d H:i:s') . '] ' . $msg . PHP_EOL;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

log_msg("Starting WHMCS pricing sync...");

// 1. Connect to WHMCS DB
try {
    $pdo = new PDO(
        'mysql:host=' . WHMCS_DB_HOST . ';dbname=' . WHMCS_DB_NAME . ';charset=utf8',
        WHMCS_DB_USER,
        WHMCS_DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    log_msg("DB connection failed: " . $e->getMessage());
    exit(1);
}

// 2. Get live GBP→PKR rate
$gbpToPkr = fetchLiveRate();
if ($gbpToPkr <= 0) {
    $gbpToPkr = getWhmcsFallbackRate($pdo);
    $rateSource = 'whmcs-rates';
} else {
    $rateSource = 'open.er-api.com';
}
log_msg("GBP→PKR rate: {$gbpToPkr} (source: {$rateSource})");

// 3. Load product map
$productMap = json_decode(PRODUCT_MAP, true);
$whmcsIds = array_values($productMap);

// 4. Fetch GBP prices + descriptions from WHMCS
$products = fetchWhmcsProducts($pdo, $whmcsIds);
log_msg("Fetched " . count($products) . " products from WHMCS.");

// 5. Load existing plans JSON
if (!file_exists(PLANS_JSON)) {
    log_msg("ERROR: " . PLANS_JSON . " not found!");
    exit(1);
}
$json = json_decode(file_get_contents(PLANS_JSON), true);
if (!$json) {
    log_msg("ERROR: Failed to parse hosting-plans.json");
    exit(1);
}

// 6. Helper to update a plan — web hosting (features from <li> items)
$updateWebPlan = function (array &$plan) use ($productMap, $products, $gbpToPkr): void {
    $planId  = $plan['id'];
    if (!isset($productMap[$planId])) return;
    $whmcsId = $productMap[$planId];
    if (!isset($products[$whmcsId])) {
        log_msg("  WARNING: No data for WHMCS id={$whmcsId} (plan={$planId})");
        return;
    }
    $product = $products[$whmcsId];
    $gbp = $product['monthly'];
    $pkr = (int) round($gbp * $gbpToPkr);

    $plan['whmcsId']  = $whmcsId;
    $plan['priceGBP'] = $gbp;
    $plan['pricePKR'] = $pkr;
    $plan['features'] = parseFeatures($product['description']);

    log_msg("  {$planId}: £{$gbp} → Rs.{$pkr} (" . count($plan['features']) . " features)");
};

// Helper to update VPS plan — specs auto-parsed from description
$updateVpsPlan = function (array &$plan) use ($productMap, $products, $gbpToPkr): void {
    $planId  = $plan['id'];
    if (!isset($productMap[$planId])) return;
    $whmcsId = $productMap[$planId];
    if (!isset($products[$whmcsId])) {
        log_msg("  WARNING: No data for WHMCS id={$whmcsId} (plan={$planId})");
        return;
    }
    $product  = $products[$whmcsId];
    $gbp      = $product['monthly'];
    $pkr      = (int) round($gbp * $gbpToPkr);
    $features = parseFeatures($product['description']);

    $plan['whmcsId']  = $whmcsId;
    $plan['priceGBP'] = $gbp;
    $plan['pricePKR'] = $pkr;
    $plan['features'] = $features;
    $plan['specs']    = parseVpsSpecs($features);

    log_msg("  {$planId}: £{$gbp} → Rs.{$pkr} (" . count($features) . " features)");
};

// Helper to update Dedicated plan — specs auto-parsed from description
$updateDedicatedPlan = function (array &$plan) use ($productMap, $products, $gbpToPkr): void {
    $planId  = $plan['id'];
    if (!isset($productMap[$planId])) return;
    $whmcsId = $productMap[$planId];
    if (!isset($products[$whmcsId])) {
        log_msg("  WARNING: No data for WHMCS id={$whmcsId} (plan={$planId})");
        return;
    }
    $product  = $products[$whmcsId];
    $gbp      = $product['monthly'];
    $pkr      = (int) round($gbp * $gbpToPkr);
    $features = parseFeatures($product['description']);

    $plan['whmcsId']  = $whmcsId;
    $plan['priceGBP'] = $gbp;
    $plan['pricePKR'] = $pkr;
    $plan['features'] = $features;
    $plan['specs']    = parseDedicatedSpecs($features);

    log_msg("  {$planId}: £{$gbp} → Rs.{$pkr} (" . count($features) . " features)");
};

// 7. Update each plan category
foreach ($json['webHosting'] as &$plan) {
    $updateWebPlan($plan);
}
unset($plan);

foreach ($json['vpsHosting'] as &$plan) {
    $updateVpsPlan($plan);
}
unset($plan);

foreach ($json['dedicatedServers'] as &$plan) {
    $updateDedicatedPlan($plan);
}
unset($plan);

// 8. Update metadata
$json['lastSynced']    = date('c');
$json['exchangeRate']  = ['GBPPKR' => $gbpToPkr, 'source' => $rateSource];

// 9. Write back
$output = json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
if (file_put_contents(PLANS_JSON, $output) === false) {
    log_msg("ERROR: Failed to write " . PLANS_JSON);
    exit(1);
}

log_msg("Done. hosting-plans.json updated successfully.");
exit(0);
