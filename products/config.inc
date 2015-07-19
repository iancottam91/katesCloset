<?php

	function __autoload($className) {
	    include $className . '.class.php';
	}
	
?>