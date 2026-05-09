import subprocess
sql = "SELECT gateway, setting, value FROM tblpaymentgateways WHERE gateway IN ('banktransfer','alfalah','meezanqr') ORDER BY gateway, setting;"
r = subprocess.run(['mysql','-u','hostingoceanuk_whmcs','-p2016Wfp61@N3w','hostingoceanuk_whmcs'],input=sql,capture_output=True,text=True)
print(r.stdout)
print(r.stderr[:300])
