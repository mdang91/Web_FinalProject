<?php
session_start();
$servername = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname = "final_data";
$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);
if (!$conn){
	die("Connection failed: " . mysqli_connect_error());
}
?>