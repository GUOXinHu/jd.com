<?php
    include('./library/conn.php');

    $idList = $_REQUEST['idList'];

    $sql = "select * from product where id in ($idList)";
    
    $res = $mysqli->query($sql);

    $mysqli->close();

    $arr = array();

    while($row = $res->fetch_assoc()) {
        array_push($arr,$row);
    }

    echo json_encode($arr);
?>