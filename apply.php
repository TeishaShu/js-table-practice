<?php
print_r($_POST);exit;
$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);

print_r($data);exit;
?>