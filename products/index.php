<?php
	require_once("config.inc");
	$query = new Query();
	$json = $query->getAllValuesAsJson();


	// $data = file_get_contents ('./results.json');

	echo $json;
	// header('Content-Type: application/json');
	// echo json_encode($json);
?>