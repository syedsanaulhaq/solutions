import sys

TPL = '/home/hostingoceanuk/public_html/whmcs/templates/prosper/viewinvoice.tpl'

with open(TPL, 'r') as f:
    content = f.read()

# The exact block to search for (after the gateway select div closes)
# Uses tab + spaces mix as in the original file
SEARCH = "\t                    </div>    \n\t                    \n                        <div class=\"invoicequote-paymentbutton payment-btn-container d-print-none\">"

if SEARCH not in content:
    print("ERROR: injection marker not found. Aborting.")
    print("Looking for partial match...")
    if 'invoicequote-paymentselect' in content:
        idx = content.index('invoicequote-paymentselect')
        print("Nearby content:", repr(content[idx:idx+500]))
    sys.exit(1)

if 'ho-meezan-qr-wrap' in content:
    print("QR block already injected, nothing to do.")
    sys.exit(0)

REPLACEMENT = "\t                    </div>    \n\n                    {* Meezan Bank QR Pay — HostingOcean *}\n                    {if ($status eq \"Unpaid\" || $status eq \"Draft\") && $allowchangegateway}\n                    <div id=\"ho-meezan-qr-wrap\" style=\"margin:14px auto 0;text-align:center;max-width:380px;display:{if $selectedGateway eq 'banktransfer'}block{else}none{/if};\">\n                        <div style=\"background:#2d0a6e;color:#fff;border-radius:8px;padding:10px 16px;margin-bottom:12px;font-size:14px;font-weight:700;\">&#x1F3E6; Meezan Bank &mdash; Scan &amp; Pay</div>\n                        <img src=\"{$WEB_ROOT}/modules/gateways/meezanqr/meezan-qr.png\"\n                             alt=\"Meezan Bank QR Code\"\n                             style=\"max-width:220px;width:100%;border:6px solid #f0f0f0;border-radius:8px;display:block;margin:0 auto 10px;\"\n                             onerror=\"this.style.opacity='0.2'\">\n                        <div style=\"font-size:13px;color:#444;margin-bottom:4px;\"><strong>HOSTING OCEAN</strong> &nbsp;&bull;&nbsp; TID: 10235273</div>\n                        <div style=\"font-size:12px;color:#777;margin-bottom:6px;\">Scan with Meezan App, JazzCash, EasyPaisa or Raast</div>\n                        <div style=\"font-size:12px;color:#999;margin-top:8px;line-height:1.5;\">\n                            After payment, email your transaction ID to<br>\n                            <a href=\"mailto:info@hostingocean.net\" style=\"color:#2d0a6e;\">info@hostingocean.net</a>\n                            with Invoice #{$invoiceid} in the subject.\n                        </div>\n                    </div>\n                    <script>\n                    (function(){\n                        var wrap = document.getElementById('ho-meezan-qr-wrap');\n                        var sel  = document.querySelector('select[name=\"gateway\"]');\n                        if (!wrap || !sel) return;\n                        sel.addEventListener('change', function(){\n                            wrap.style.display = (sel.value === 'banktransfer') ? 'block' : 'none';\n                        });\n                    })();\n                    </script>\n                    {/if}\n\n                        <div class=\"invoicequote-paymentbutton payment-btn-container d-print-none\">"

content = content.replace(SEARCH, REPLACEMENT, 1)

with open(TPL, 'w') as f:
    f.write(content)

print("SUCCESS: QR block injected into prosper/viewinvoice.tpl")
