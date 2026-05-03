#!/bin/bash
set -x
mysql -u root -p6xqBcu0rSmXCMs cyberpanel 2>&1 << 'SQL'
INSERT INTO websiteFunctions_childdomains 
  (master_id, domain, path, ssl, phpSelection, alais)
VALUES 
  (2, 'whmcs.hostingocean.co.uk', '/home/whmcs.hostingocean.co.uk', 0, 'lsphp83', 0);
SQL
