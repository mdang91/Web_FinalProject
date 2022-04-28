<!doctype html>

<html>

<head lang="en">
<meta charset="UTF-8">
<link href="cw10.css" rel="stylesheet">
<title>Create Tables</title>
<style>
body{
	text-align:center;
}
</style>
</head>

<body>
<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "final_data";

// The above used four variables servername,username,password and dbname 
// are according to my environment setting.

// Now your task would be to check 
// what your values would be accoring to your environment and change the values of above mentioned variables

// Note : This is the most crucial step for you DB connection. Please double check and change the values.

// Create connection

// create a variable conn and use it to establish the connection to the DB
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if($conn->connect_error){
     die("Connection failed: " . $conn->connect_error);
} 


$sql = "CREATE TABLE member(
		id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
    )";
	
if ($conn->query($sql) === TRUE) {
	echo "\nCreate table successfull";
} 
else {
//table already exists
	echo "Table Already Exists";
// Hnadle this condition
}

$conn->close();
?>  

	<div class="div1">
	<br>
		<!-- Fill the below blanks with appropriate files.-->
		<!-- so that you application looks it is redirecting to the required pages   -->
		<a href="cw10.php"><input type="button" id="btn1" value="OK"></a>
		<a href="logout.php"><input type="button" id="btn1" value="Logout"></a>
	</div>
</body>

</html>