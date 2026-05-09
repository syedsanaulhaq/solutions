<?php
/**
 * Currency-aware register entry point for HostingOcean
 *
 * Embeds register.php in a same-origin full-page iframe and uses JavaScript
 * to pre-select the desired currency dropdown after the page loads.
 * (WHMCS ignores session currency for unauthenticated register.php,
 *  so client-side DOM manipulation is the only reliable approach.)
 */

$allowedCurrencies = [1, 2, 3, 4]; // USD=1, PKR=2, GBP=3, NZD=4
$currency = isset($_GET['currency']) ? (int)$_GET['currency'] : 1;
if (!in_array($currency, $allowedCurrencies)) {
    $currency = 1;
}
$currency = (int)$currency;
?><!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Register</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 100%; height: 100%; overflow: hidden; }
  iframe { width: 100%; height: 100%; border: 0; display: block; }
</style>
</head>
<body>
<iframe id="f" src="/register.php" sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation allow-popups"></iframe>
<script>
(function () {
  var cur = '<?= $currency ?>';
  function applySelection(doc) {
    try {
      // Sidebar currency switcher
      var sidebar = doc.querySelector('.collapsable-card-body select[name="currency"]');
      if (sidebar && sidebar.value !== cur) sidebar.value = cur;

      // Registration form currency field
      var regCur = doc.getElementById('inputCurrency');
      if (regCur && regCur.value !== cur) regCur.value = cur;
    } catch (e) { /* cross-origin guard — shouldn't happen */ }
  }

  var iframe = document.getElementById('f');
  iframe.addEventListener('load', function () {
    try { applySelection(this.contentDocument); } catch (e) {}
  });
})();
</script>
</body>
</html>
