<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    <body>
	<?php

session_start();
 

header('Content-Type: text/html; charset=UTF-8');
 

if (isset($_POST['login'])) 
{

    include('connect.php');
     

    $username = ($_POST['txtUsername']);
    $password = ($_POST['txtPassword']);
     

    if (!$username || !$password) {
        echo "Please type your name and password";
        exit;
    }
     

    $password = md5($password);

    $query = mysqli_query("SELECT username, password FROM member WHERE username='$username'");
    if (mysqli_num_rows($query) == 0) {
        echo "Username not exist";
        exit;
    }
     
    $row = mysqli_fetch_array($query);
     
    if ($password != $row['password']) {
        echo "Wrong password!!!";
        exit;
    }
     
    $_SESSION['username'] = $username;
    echo "Xin chào " . $username . ". Bạn đã đăng nhập thành công. <a href='/'>Về trang chủ</a>";
    die();
}
?>
        <form action='login.php?do=login' method='POST'>
            <table cellpadding='0' cellspacing='0' border='1'>
                <tr>
                    <td>
                        Username:
                    </td>
                    <td>
                        <input type='text' name='txtUsername' />
                    </td>
                </tr>
                <tr>
                    <td>
                        Password:
                    </td>
                    <td>
                        <input type='password' name='txtPassword' />
                    </td>
                </tr>
            </table>
            <input type='submit' value='Log In' />
            <a href='signup.php' title='signup'>Sign Up</a>
        </form>
    </body>
	
</html>