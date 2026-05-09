import sys

TPL = '/home/hostingoceanuk/public_html/whmcs/templates/twenty-one/viewinvoice.tpl'

with open(TPL, 'r') as f:
    content = f.read()

# Marker: the <br /><br /> that follows the payment method span
# We inject our QR block right before the closing </div> of the payment-method column
SEARCH = "                    <br /><br />\n                </div>\n                <div class=\"col-12 col-sm-6 invoice-col\">"

if SEARCH not in content:
    print("ERROR: injection marker not found in template. Aborting.")
    sys.exit(1)

if 'ho-meezan-qr-wrap' in content:
    print("QR block already injected, nothing to do.")
    sys.exit(0)

QR_BLOCK = """                    <br /><br />
                    {* Meezan Bank QR Pay — injected by HostingOcean *}
                    {if ($status eq "Unpaid" || $status eq "Draft") && $allowchangegateway}
                    <div id="ho-meezan-qr-wrap" style="margin-top:14px; text-align:center; display:{if $selectedGateway eq 'banktransfer'}block{else}none{/if};">
                        <div style="background:#2d0a6e;color:#fff;border-radius:8px;padding:10px 16px;margin-bottom:12px;font-size:14px;font-weight:700;">&#x1F3E6; Meezan Bank &mdash; Scan &amp; Pay</div>
                        <img src="{$WEB_ROOT}/modules/gateways/meezanqr/meezan-qr.png"
                             alt="Meezan Bank QR Code"
                             style="max-width:220px;width:100%;border:6px solid #f0f0f0;border-radius:8px;display:block;margin:0 auto 10px;">
                        <div style="font-size:13px;color:#444;margin-bottom:4px;"><strong>HOSTING OCEAN</strong> &nbsp;&bull;&nbsp; TID: 10235273</div>
                        <div style="font-size:12px;color:#777;margin-bottom:6px;">Scan with Meezan App, JazzCash, EasyPaisa or Raast</div>
                        <div style="font-size:12px;color:#999;margin-top:8px;line-height:1.5;">
                            After payment, email your transaction ID to<br>
                            <a href="mailto:info@hostingocean.net" style="color:#2d0a6e;">info@hostingocean.net</a>
                            with Invoice #{$invoiceid} in the subject.
                        </div>
                    </div>
                    <script>
                    (function(){
                        var wrap = document.getElementById('ho-meezan-qr-wrap');
                        var sel  = document.querySelector('select[name="gateway"]');
                        if (!wrap || !sel) return;
                        sel.addEventListener('change', function(){
                            wrap.style.display = (sel.value === 'banktransfer') ? 'block' : 'none';
                        });
                    })();
                    </script>
                    {/if}
                </div>
                <div class="col-12 col-sm-6 invoice-col">"""

content = content.replace(SEARCH, QR_BLOCK, 1)

with open(TPL, 'w') as f:
    f.write(content)

print("SUCCESS: QR block injected into viewinvoice.tpl")
