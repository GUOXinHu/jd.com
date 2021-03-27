<?php
    include('./library/conn.php');

    $username = $_REQUEST['username'];
    $pwd = $_REQUEST['password'];
    $phone = $_REQUEST['phone'];
    $email = $_REQUEST['email'];

    $insert = "INSERT INTO user (`username`, `password`, `phone`, `email`) VALUES ('$username','$pwd','$phone','$email')";

    $res = $mysqli->query($insert);

    $mysqli->close();

    if($res) {
        echo 1;
    }else {
        echo 0;
    }

?>