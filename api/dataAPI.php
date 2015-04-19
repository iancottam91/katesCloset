<?php
	require_once("config.inc");
	$query = new Query();
	$json = $query->getAllValuesAsJson();
	header('Content-Type: application/json');
	echo json_encode($json);
?>