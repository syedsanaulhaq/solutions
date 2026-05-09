import subprocess
sql = "SELECT id FROM tblinvoices WHERE status='Unpaid' LIMIT 1;"
r = subprocess.run(['mysql','-u','hostingoceanuk_whmcs','-p2016Wfp61@N3w','hostingoceanuk_whmcs'],input=sql,capture_output=True,text=True)
print(r.stdout.strip())