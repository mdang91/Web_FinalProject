<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link href="final.css" rel="stylesheet">
    </head>
<body>
<div class="form-tt">
<?php
 
    if (!isset($_POST['txtUsername'])){
        die('');
    }
     
    include('connect.php');
          

    header('Content-Type: text/html; charset=UTF-8');

    $username   = ($_POST['txtUsername']);
    $password   = ($_POST['txtPassword']);
    $email      = ($_POST['txtEmail']);
          

    if (!$username || !$password || !$email)
    {
        echo "Please type in your information <a href='javascript: history.go(-1)'>Go Back</a>";
        exit;
    }
          

        $password = md5($password);
          

    /*if (mysqli_num_rows(mysqli_query("SELECT username FROM member WHERE username='$username'")) > 0){
        echo "Username already exists. Please change it. <a href='javascript: history.go(-1)'>Go Back</a>";
        exit;
    }
          

    if (!eregi("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$", $email))
    {
        echo "Email not correct. Please change your email. <a href='javascript: history.go(-1)'>Go Back</a>";
        exit;
    }
          

    if (mysqli_num_rows(mysqli_query("SELECT email FROM member WHERE email='$email'")) > 0)
    {
        echo "Email already in the system. Please choose another email. <a href='javascript: history.go(-1)'>Go back</a>";
        exit;
    }

          */

$sql = "INSERT INTO member(username, password, email) 
VALUES('$username', '$password', '$email')";

if ($conn->query($sql) === TRUE) {
    echo "User Create Succesfully!!!!";
} else {
    echo "Failed to create user";
}
$conn->close();

?>
<br>
<br>
<a href='login.php' title='login'>Log In</a>
</div>
</body>
</html>