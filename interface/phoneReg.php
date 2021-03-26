<?php
    include('./library/conn.php');

    $phone = $_REQUEST['phone'];
    
    $sql = "select * from user where phone = $phone";
    
    $res = $mysqli->query($sql);
    
    $mysqli->close();

    echo json_encode($res->fetch_assoc());
?>
