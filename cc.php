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
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		
<link href="index.css" rel="stylesheet">
<link rel="stylesheet" href="bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<title>Login</title>
</head>
<body>

<div class="creditCardForm">
<div class="heading">
<h1>Confirm Purchase</h1>
</div>
<div class="payment">
<form action="connection.php" method="POST">
	<div class="form-group Customer">
	<label for="Customer">Customer</label>
	<input type="text" class="form-control" id="Customer">
	</div>
	<div class="form-group CVV">
	<label for="cvv">CVV</label>
	<input type="text" class="form-control" id="cvv">
	</div>
	<div class="form-group" id="card-number-field">
	<label for="cardNumber">Card Number</label>
	<input type="text" class="form-control" id="cardNumber">
	</div>
	<div class="form-group" id="expiration-date">
	<label>Expiration Date</label>
	<select>
		<option value="01">January</option>
		<option value="02">February </option>
		<option value="03">March</option>
		<option value="04">April</option>
		<option value="05">May</option>
		<option value="06">June</option>
		<option value="07">July</option>
		<option value="08">August</option>
		<option value="09">September</option>
		<option value="10">October</option>
		<option value="11">November</option>
		<option value="12">December</option>
	</select>
	<select>
		<option value="23"> 2023</option>
		<option value="24"> 2024</option>
		<option value="25"> 2025</option>
		<option value="26"> 2026</option>
		<option value="27"> 2027</option>
		<option value="28"> 2028</option>
		<option value="29"> 2029</option>
		<option value="30"> 2030</option>
	</select>
	</div>
	<div class="form-group" id="credit_cards">
		<img src="./Pics/amex.jpg" id="amex">
		<img src="./Pics/visa.jpg" id="visa">
		<img src="./Pics/mastercard.jpg" id="mastercard">
		
	</div>
	
	<div class="form-group" id="pay-now">
		<button type="submit" class="btn btn-default" id="confirm-purchase">Confirm</button>
	</div>
</form>

<h3>Test Credit Card numbers</h3>
<table class="ddata">
<header>
<tr>
<th scope="col">Amex</th>
<th scope="col">Visa</th>
<th scope="col">Mastercard</th>    
</tr>
</header>
<tbody>
<tr>
<td> 344511112046512</td>
<td> 4188415419331299</td>
<td> 5121297817475606</td>
</tr>
<tr>
<td> 349208437315764</td>
<td> 4185126935301111</td>
<td> 5136028068398137</td>
</tr>
</tbody>
</table>

</div>
</div>
<script src="cc.js"></script>
<script src="jquery.payform.min.js"></script>
</body>
</html>