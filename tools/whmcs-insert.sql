INSERT IGNORE INTO websiteFunctions_childdomains (master_id, domain, path, `ssl`, phpSelection, alais)
VALUES (2, 'whmcs.hostingocean.co.uk', '/home/whmcs.hostingocean.co.uk', 0, 'lsphp83', 0);
SELECT id, domain, path, phpSelection FROM websiteFunctions_childdomains WHERE domain LIKE '%whmcs%';
