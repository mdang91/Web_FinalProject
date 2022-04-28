<?php
    $connect['host'] = "localhost";
    $connect['username'] = "root";
    $connect['password'] = "";
	$connect['dbname'] = "final_data";
    $conn = mysqli_connect(
        "{$connect['host']}",
        "{$connect['username']}",
        "{$connect['password']}")
    or
        die("Cant connect to the database");
    @mysqli_select_db($conn, "{$connect['dbname']}") 
    or
        die("No database exist");
?>