<?php
/**
 * WHMCS Hook: Pre-select currency based on referring site cookie
 *
 * When go-register.php?currency=N is accessed, it sets the cookie
 * 'ho_preferred_currency' with the desired currency ID. This hook
 * reads that cookie on every client area page load and updates the
 * WHMCS session currency accordingly.
 *
 * Place this file in: /home/hostingoceanuk/public_html/whmcs/includes/hooks/
 */

use WHMCS\Database\Capsule;

add_hook('ClientAreaPage', 1, function ($vars) {
    $allowedCurrencies = [1, 2, 3, 4]; // USD=1, PKR=2, GBP=3, NZD=4

    if (!isset($_COOKIE['ho_preferred_currency'])) {
        return;
    }

    $currencyId = (int)$_COOKIE['ho_preferred_currency'];
    if (!in_array($currencyId, $allowedCurrencies)) {
        return;
    }

    // Only apply once per session (after user has explicitly chosen, leave it)
    if (!empty($_SESSION['currency_manually_set'])) {
        return;
    }

    // Verify the currency ID actually exists in WHMCS
    $exists = Capsule::table('tblcurrencies')->where('id', $currencyId)->exists();
    if (!$exists) {
        return;
    }

    $_SESSION['currency'] = $currencyId;

    // Clear the cookie once applied (one-shot)
    setcookie('ho_preferred_currency', '', time() - 3600, '/');
    unset($_COOKIE['ho_preferred_currency']);
});
