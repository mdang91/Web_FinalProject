<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link href="final.css" rel="stylesheet">
    </head>
    <body>
<?php

session_start();
 

header('Content-Type: text/html; charset=UTF-8');
 
$servername = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname = "final_data";
$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if (isset($_POST['submit'])) 
{
     
    $username = mysqli_real_escape_string($conn,$_POST['txtUsername']);
	$password = mysqli_real_escape_string($conn,$_POST['txtPassword']); 
     
    if (!$username || !$password) {
        echo "Please type your name and password";
        exit;
    }
     
    $password = md5($password);

	$sql = "SELECT count(*) as cntUser FROM member WHERE username = '$username' and password = '$password'";
	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_array($result,MYSQLI_ASSOC);
	$active = $row['active'];
      
	$count = $row['cntUser'];
      
      // If result matched $myusername and $mypassword, table row must be 1 row
	if($count > 0){
		$_SESSION['login_user'] = $username;
		if($_POST['buyer'] == 1){
			header("Location:buyer.php");
		}
		elseif($_POST['seller'] == 1){
			header("Location:seller.php");
		}
		elseif($_POST['admin'] == 1){
			header("Location:admin.php");
		}
	}
	else{
		$error = "Your Login Name or Password is invalid";
	}
}
?>
<div class="form-tt">
<h2>Log in</h2>
<form action='login.php?do=login' method='POST'>
	<input type="text" name="txtUsername" placeholder="Username" />
	<input type="password" name="txtPassword" placeholder="Password" />
	<input type="checkbox" id="checkbox" name="buyer" value="1"><label class="checkbox-text">Buyer</label>
	<input type="checkbox" id="checkbox" name="seller" value="1"><label class="checkbox-text">Seller</label>
	<input type="checkbox" id="checkbox" name="admin" value="1"><label class="checkbox-text">Admin</label>
	<input type="submit" name="submit" value="Sign In" class="submit1"/>
	<a href='signup.php' title='signup'>Sign Up</a>
</form>
</div>
</body>
	
</html>