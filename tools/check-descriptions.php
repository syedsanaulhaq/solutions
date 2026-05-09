<?php
$pdo = new PDO('mysql:host=localhost;dbname=hostingoceanuk_whmcs', 'hostingoceanuk_whmcs', '2016Wfp61@N3w');
$rows = $pdo->query('SELECT id, name, description FROM tblproducts WHERE id IN (2,3,4,8,9,11,12,13,14,15) ORDER BY id')->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($rows, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
