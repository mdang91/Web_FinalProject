<?php session_start(); ?>
<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    <body>
       <?php 
       if (isset($_SESSION['username']) && $_SESSION['username']){
           echo 'Welcome'.$_SESSION['username']."<br/>";
           echo 'Logout <a href="logout.php">Logout</a>';
       }
       else{
           echo 'You didnt login';
       }
       ?>
    </body>
</html>