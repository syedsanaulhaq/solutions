<?php
$file = '/home/hostingoceanuk/public_html/whmcs/modules/addons/menumanager/hooks.php';
$content = file_get_contents($file);
// Fix both the original and the broken-by-sed version
$content = str_replace(
    '$smarty->compile_id = md5(MODURL);',
    '$smarty->compile_id = md5(defined(\'MODURL\') ? MODURL : ROOTDIR);',
    $content
);
$content = str_replace(
    '$smarty->compile_id = md5(defined(" MODURL) ? MODURL : ROOTDIR);',
    '$smarty->compile_id = md5(defined(\'MODURL\') ? MODURL : ROOTDIR);',
    $content
);
file_put_contents($file, $content);
echo "Result: " . (strpos($content, "defined('MODURL')") !== false ? "FIXED OK" : "NOT FIXED - check manually") . PHP_EOL;
