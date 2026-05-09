<?php
/**
 * HostingOcean — Meezan Bank QR Code Hook
 *
 * Injects the Meezan Bank Scan & Pay QR code into every client-area
 * invoice page via the footer output hook.
 *
 * Place at: whmcs/includes/hooks/meezan_qr_hook.php
 */

if (!defined('WHMCS')) {
    die('This file cannot be accessed directly');
}

add_hook('ClientAreaFooterOutput', 1, function ($vars) {
    // Only fire on the invoice view page
    $filename = isset($_SERVER['PHP_SELF']) ? basename($_SERVER['PHP_SELF']) : '';
    if ($filename !== 'viewinvoice.php') {
        return '';
    }

    // Only inject for PKR invoices (currency ID 2 = PKR)
    // Also works for any currency — QR is always valid
    $invoiceId = isset($_GET['id']) ? (int) $_GET['id'] : 0;

    // The QR image URL — served from WHMCS root
    $systemUrl = \App::getSystemURL();
    // Trailing slash already present in getSystemURL()
    $qrUrl = $systemUrl . 'modules/gateways/meezanqr/meezan-qr.png';

    return <<<HTML
<style>
#ho-meezan-qr-wrap {
    display: none; /* shown by JS when Bank Transfer is selected */
    background: #fff;
    border: 2px solid #2d0a6e;
    border-radius: 12px;
    padding: 20px 20px 14px;
    margin: 20px auto 0;
    text-align: center;
    max-width: 420px;
    font-family: sans-serif;
}
#ho-meezan-qr-wrap .mqr-header {
    background: #2d0a6e;
    color: #fff;
    border-radius: 8px;
    padding: 10px 16px;
    margin-bottom: 14px;
    font-size: 15px;
    font-weight: 700;
}
#ho-meezan-qr-wrap img.mqr-img {
    max-width: 230px;
    width: 100%;
    border: 6px solid #f0f0f0;
    border-radius: 8px;
    display: block;
    margin: 0 auto 12px;
}
#ho-meezan-qr-wrap .mqr-meta {
    font-size: 13px;
    color: #444;
    margin-bottom: 5px;
}
#ho-meezan-qr-wrap .mqr-apps {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 6px;
    margin: 10px 0;
}
#ho-meezan-qr-wrap .mqr-apps span {
    background: #f4f4f4;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 3px 8px;
    font-size: 12px;
    color: #555;
}
#ho-meezan-qr-wrap .mqr-note {
    font-size: 12px;
    color: #888;
    margin-top: 10px;
    line-height: 1.5;
}
#ho-meezan-qr-wrap .mqr-note a { color: #2d0a6e; }
</style>

<div id="ho-meezan-qr-wrap">
    <div class="mqr-header">&#x1F3E6; Meezan Bank &mdash; Scan &amp; Pay</div>
    <img class="mqr-img"
         src="{$qrUrl}"
         alt="Meezan Bank QR Code"
         onerror="this.alt='QR code loading\u2026';this.style.opacity='0.3'">
    <div class="mqr-meta"><strong>HOSTING OCEAN</strong> &nbsp;&bull;&nbsp; TID: 10235273</div>
    <div class="mqr-meta">Open your banking or wallet app and scan</div>
    <div class="mqr-apps">
        <span>&#x2713; Meezan App</span>
        <span>&#x2713; JazzCash</span>
        <span>&#x2713; EasyPaisa</span>
        <span>&#x2713; Raast</span>
        <span>&#x2713; Visa</span>
    </div>
    <div class="mqr-note">
        After payment, email your transaction screenshot/ID to<br>
        <a href="mailto:info@hostingocean.net">info@hostingocean.net</a>
        with <strong>Invoice #{$invoiceId}</strong> in the subject line.
    </div>
</div>

<script>
(function () {
    var wrap = document.getElementById('ho-meezan-qr-wrap');
    if (!wrap) return;

    function getGatewaySelect() {
        return document.querySelector('select[name="gateway"]')
            || document.querySelector('#gateway')
            || document.querySelector('.paymentmethod select')
            || null;
    }

    function updateVisibility(sel) {
        if (!sel) return;
        var v = sel.value || '';
        var t = sel.options && sel.selectedIndex >= 0
            ? (sel.options[sel.selectedIndex].text || '').toLowerCase()
            : '';
        var isBankTransfer = v === 'banktransfer'
            || t.indexOf('bank transfer') !== -1
            || t.indexOf('easy paisa') !== -1;
        wrap.style.display = isBankTransfer ? 'block' : 'none';
    }

    function init() {
        var sel = getGatewaySelect();
        if (sel && sel.parentNode) {
            sel.parentNode.insertBefore(wrap, sel.nextSibling);
        } else {
            var paySection = document.querySelector('.invoice-payment, .paymentmethod, #paymentform')
                || document.querySelector('form');
            if (paySection) paySection.appendChild(wrap);
        }
        updateVisibility(sel);
        if (sel) {
            sel.addEventListener('change', function () { updateVisibility(sel); });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
</script>
HTML;
});
