<?php
/**
 * Meezan Bank QR Pay — WHMCS Payment Gateway Module
 *
 * Displays the Meezan Bank Scan & Pay QR code on the invoice page.
 * Customer scans with any banking app (Meezan, JazzCash, EasyPaisa, Raast)
 * and enters their Transaction Reference after payment.
 * Admin receives an email notification to verify and manually confirm.
 *
 * Merchant: HOSTING OCEAN  |  TID: 10235273
 */

if (!defined('WHMCS')) {
    die('This file cannot be accessed directly');
}

/**
 * Module metadata
 */
function meezanqr_MetaData()
{
    return [
        'DisplayName' => 'Meezan Bank QR Pay (Raast / Visa)',
        'APIVersion'  => '1.1',
    ];
}

/**
 * Configuration fields shown in WHMCS Admin → Payment Gateways
 */
function meezanqr_config()
{
    return [
        'FriendlyName' => [
            'Type'  => 'System',
            'Value' => 'Meezan Bank QR Pay (Raast / Visa)',
        ],
        'merchantName' => [
            'FriendlyName' => 'Merchant Name',
            'Type'         => 'text',
            'Size'         => '40',
            'Default'      => 'HOSTING OCEAN',
            'Description'  => 'As printed on your QR slip.',
        ],
        'merchantTID' => [
            'FriendlyName' => 'Terminal ID (TID)',
            'Type'         => 'text',
            'Size'         => '20',
            'Default'      => '10235273',
            'Description'  => 'TID printed below the QR code.',
        ],
        'adminEmail' => [
            'FriendlyName' => 'Notification Email',
            'Type'         => 'text',
            'Size'         => '50',
            'Default'      => 'info@hostingocean.net',
            'Description'  => 'Where to send payment-received alerts.',
        ],
        'instructions' => [
            'FriendlyName' => 'Extra Instructions',
            'Type'         => 'textarea',
            'Rows'         => '4',
            'Default'      => 'Scan the QR code with Meezan Bank app, JazzCash, EasyPaisa, or any Raast-enabled app. After payment, enter your Transaction Reference below and click Confirm.',
            'Description'  => 'Shown to the customer above the QR code.',
        ],
    ];
}

/**
 * Payment link — rendered on the invoice "Pay Now" page
 */
function meezanqr_link($params)
{
    $invoiceId    = $params['invoiceid'];
    $amount       = $params['amount'];
    $currencyCode = $params['currency'];
    $merchantName = htmlspecialchars($params['merchantName'] ?? 'HOSTING OCEAN');
    $tid          = htmlspecialchars($params['merchantTID']  ?? '10235273');
    $instructions = htmlspecialchars($params['instructions'] ?? '');
    $adminEmail   = $params['adminEmail'] ?? 'info@hostingocean.net';

    // URL where the form POSTs back
    $systemUrl    = $params['systemurl'];
    $returnUrl    = $params['returnurl'];

    // Path to the QR image (relative to WHMCS web root)
    $qrImageUrl   = $systemUrl . 'modules/gateways/meezanqr/meezan-qr.png';

    // Handle form submission
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['meezan_txn_ref'])) {
        $txnRef = trim(strip_tags($_POST['meezan_txn_ref']));

        if ($txnRef !== '') {
            // Log the payment as pending in WHMCS
            logTransaction('meezanqr', [
                'invoice_id' => $invoiceId,
                'amount'     => $amount,
                'currency'   => $currencyCode,
                'txn_ref'    => $txnRef,
            ], 'Pending Verification');

            // Email admin
            $subject = "Meezan QR Payment Received — Invoice #{$invoiceId}";
            $body    = "A customer has submitted a Meezan Bank QR payment.\n\n"
                     . "Invoice ID : {$invoiceId}\n"
                     . "Amount     : {$currencyCode} {$amount}\n"
                     . "Txn Ref    : {$txnRef}\n\n"
                     . "Please verify in your Meezan Bank app and then accept the invoice payment manually in WHMCS:\n"
                     . $systemUrl . "admin/invoices.php?action=edit&id={$invoiceId}";

            @mail($adminEmail, $subject, $body, "From: noreply@hostingocean.net");

            // Show confirmation to customer
            return '
<div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:20px;border:1px solid #d4edda;border-radius:8px;background:#f4fff7;color:#155724;">
  <h3 style="margin-top:0;">&#10004; Payment Submitted</h3>
  <p>Thank you! Your transaction reference <strong>' . htmlspecialchars($txnRef) . '</strong> has been received.</p>
  <p>Our team will verify your payment within <strong>1–2 hours</strong> (Mon–Sat, 9am–9pm PKT) and activate your service.</p>
  <p>Questions? Email <a href="mailto:info@hostingocean.net">info@hostingocean.net</a></p>
</div>';
        }
    }

    // Render the QR payment form
    $html = '
<div style="font-family:sans-serif;max-width:520px;margin:0 auto;text-align:center;">

  <!-- Header -->
  <div style="background:#2d0a6e;color:#fff;border-radius:10px 10px 0 0;padding:14px 20px;">
    <img src="' . $qrImageUrl . '?_=logo" alt=""
         onerror="this.style.display=\'none\'"
         style="height:28px;vertical-align:middle;margin-right:8px;">
    <span style="font-size:17px;font-weight:600;vertical-align:middle;">Meezan Bank QR Pay</span>
  </div>

  <!-- Instructions -->
  <div style="border:1px solid #ddd;border-top:none;padding:16px 20px;background:#fff;">
    <p style="margin:0 0 16px;color:#444;font-size:14px;">' . $instructions . '</p>

    <!-- QR Code -->
    <img src="' . $qrImageUrl . '"
         alt="Meezan Bank Scan &amp; Pay QR Code"
         style="max-width:240px;width:100%;border:6px solid #f5f5f5;border-radius:8px;"
         onerror="this.outerHTML=\'<p style=&quot;color:red;font-size:13px;&quot;>QR image not found. Please contact support.</p>\'">

    <p style="margin:10px 0 4px;font-size:13px;color:#666;">
      Merchant: <strong>' . $merchantName . '</strong> &nbsp;|&nbsp; TID: <strong>' . $tid . '</strong>
    </p>
    <p style="margin:0 0 16px;font-size:12px;color:#999;">
      ✓ Raast &nbsp;&nbsp; ✓ Meezan App &nbsp;&nbsp; ✓ JazzCash &nbsp;&nbsp; ✓ EasyPaisa &nbsp;&nbsp; ✓ Visa
    </p>

    <!-- Transaction reference form -->
    <form method="POST" action="" style="margin-top:12px;">
      <input type="hidden" name="invoiceid" value="' . (int)$invoiceId . '">
      <label style="display:block;text-align:left;font-size:13px;font-weight:600;margin-bottom:6px;color:#333;">
        Transaction Reference / TxnID *
      </label>
      <input type="text" name="meezan_txn_ref" required
             placeholder="e.g. MZN20260510123456"
             style="width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid #ccc;border-radius:6px;font-size:14px;margin-bottom:10px;">
      <button type="submit"
              style="width:100%;padding:12px;background:#2d0a6e;color:#fff;border:none;border-radius:6px;font-size:15px;font-weight:600;cursor:pointer;">
        &#10003; Confirm Payment
      </button>
    </form>

    <p style="margin-top:14px;font-size:11px;color:#aaa;">
      Your order will be activated once payment is verified by our team.
    </p>
  </div>

</div>';

    return $html;
}
