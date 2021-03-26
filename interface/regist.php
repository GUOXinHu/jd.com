<?php
    include('./library/conn.php');

    $username = $_REQUEST['username'];
    $pwd = $_REQUEST['pwd'];
    $phone = $_REQUEST['phone'];
    $email = $_REQUEST['phone'];

    $sql = "INSERT INTO `user` (`id`, `username`, `password`, `phone`, `email`) VALUES (null,$username,$pwd,$phone,$email)";
?>