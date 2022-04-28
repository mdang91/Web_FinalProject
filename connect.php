<?php
    $ketnoi['host'] = "localhost"; //Tên server, nếu dùng hosting free thì cần thay đổi
    $ketnoi['username'] = "root"; //Tên sử dụng Database
    $ketnoi['password'] = "";//Mật khẩu của tên sử dụng Database
	$ketnoi['dbname'] = "final_data"; //Đây là tên của Database
    $conn = mysqli_connect(
        "{$ketnoi['host']}",
        "{$ketnoi['username']}",
        "{$ketnoi['password']}")
    or
        die("Không thể kết nối database");
    @mysqli_select_db($conn, "{$ketnoi['dbname']}") 
    or
        die("Không thể chọn database");
?>