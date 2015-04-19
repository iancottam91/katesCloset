<?php

class Query{

	function getValues(){

		// connect to database
		$link = mysqli_connect('localhost', 'root', 'root');

		// select relevant table
		mysqli_select_db($link, 'kates_closet');

		// mySql queries
		// query to check if this entry already exists in the database
		$sql_all = "SELECT * FROM clothing";

        // check if the entry is already in the table
		$entryCheck = mysqli_query($link, $sql_all);
		if(! $entryCheck )
		{
		  die('Could not check this entry: ' . mysqli_error($link));
		}
		$entryCheckCount = mysqli_num_rows($entryCheck);
		echo 'Number of entries: ' . $entryCheckCount . "<br>" . "--------------------------------<br>";

		// query to check if this entry already exists in the database
		$sql_shop_names = "SELECT shop_name FROM clothing ORDER BY shop_name ASC";

        // check if the entry is already in the table
		$shop_names_retval = mysqli_query($link, $sql_shop_names);
		if(! $entryCheck )
		{
		  die('Could not check this entry: ' . mysqli_error($link));
		}

		$rows = array();
		while($row = mysqli_fetch_array($shop_names_retval, MYSQL_ASSOC))
		{
		    echo "Shop Name :{$row['shop_name']}  <br> ".
		         "--------------------------------<br>";
		}

		mysqli_close($link);

	}

	function getAllValuesAsJson(){
				// connect to database
		$link = mysqli_connect('localhost', 'root', 'root');

		// select relevant table
		mysqli_select_db($link, 'kates_closet');

		// mySql queries
		// query to check if this entry already exists in the database
		$sql_all = "SELECT * FROM clothing";

        // check if the entry is already in the table
		$sql_all_retval = mysqli_query($link, $sql_all);
		if(! $sql_all_retval )
		{
		  die('Could not check this entry: ' . mysqli_error($link));
		}

		$rows = array();
		while($row = mysqli_fetch_array($sql_all_retval, MYSQL_ASSOC))
		{
		    $rows[] = $row;
		}
		return json_encode($rows);

		$fp = fopen('results.json', 'w');
		fwrite($fp, json_encode($rows));
		fclose($fp);

		mysqli_close($link);


	}

}

?>