<?php
    include('./library/conn.php');

    $username = $_REQUEST['username'];
    $phone = $_REQUEST['phone'];
    $email = $_REQUEST['email'];
    $pwd = $_REQUEST['pwd'];
    // echo $username;
    // echo $phone;
    // echo $email;
    // echo $pwd;
    if($username) {
        $sql = "select * from user where username = '$username' and password='$pwd'";
    }else if($phone) {
        $sql = "select * from user where phone = '$phone' and password='$pwd'";
    }else {
        $sql = "select * from user where email = '$email' and password='$pwd'";
    }
    $res = $mysqli->query($sql);

    $mysqli->close();
    // echo $sql;
    if($res->num_rows > 0) {
        echo json_encode($res->fetch_assoc());
        // echo json_encode($res->fetch_assoc());
        // echo '<script>location.href="../src/index.html";</script>';
    } else {
        echo 0;
        // echo '<script>alert("用户名或密码错误");</script>';
        // echo '<script>location.href="../src/login.html";</script>';
    }
?>