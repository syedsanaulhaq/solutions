#!/bin/bash
mysql -u hostingoceanuk_whmcs -p2016Wfp61@N3w hostingoceanuk_whmcs -e "SELECT setting, value FROM tblconfiguration WHERE setting LIKE '%Template%' LIMIT 10;"
ls /home/hostingoceanuk/whmcsdata/templates_c/ | head -5
ls /home/hostingoceanuk/public_html/whmcs/templates/
