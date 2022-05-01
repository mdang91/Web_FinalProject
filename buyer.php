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
<link href="index.css" rel="stylesheet">
</head>
<body>
<ul>
  <li><a class="active" href="#home">Home</a></li>
  <li><a href="#news">News</a></li>
  <li><a href="#contact">Contact</a></li>
  <li><a href="#about">About</a></li>
  <input type="text" placeholder="Search..." class="search">
</ul>

</body>
</html>