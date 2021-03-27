<?php
    include('./library/conn.php');

    $username = $_REQUEST['username'];
    $userid = $_REQUEST['userid'];

    $sql = "select * from user where id = $userid and username = '$username'";

    $res = $mysqli->query($sql);

    $mysqli->close();

    echo $res->num_rows;
?>