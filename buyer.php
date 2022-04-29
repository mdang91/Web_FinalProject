<?php
include "connect.php";

if(!isset($_SESSION['login_user'])){
	header("location:login.php");
	exit;
}
?>
<!DOCTYPE html>
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>
<h1>This is Buyer</h1>
	<form method='post' action="logout.php">
		<input type="submit" value="Logout" name="logout">
</form>
</body>
</html>