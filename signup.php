<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<link href="final.css" rel="stylesheet">
        <title>Login</title>
    </head>
    <body>
	<div class="form-tt">
        <h1>Sign up</h1>
        <form action="signup_submit.php" method="POST">
			<input type="text" name="txtUsername" placeholder="Username"/>
			<input type="password" name="txtPassword" placeholder="Password"/>
			<input type="password" name="cfPassword" placeholder="Confirm Password" />
			<input type="text" name="txtEmail" placeholder="Email" />
            <input type="submit" value="Sign Up" class="button1"/>
            <a href="signup.php"> <input type="button" value="Clear" class="button1"/></a>
			<br>
			<a href='login.php' title='login'>Log In</a>
        </form>
		</div>
    </body>
</html>