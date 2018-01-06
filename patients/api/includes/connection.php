<?php
    DEFINE("SERVER", "localhost");
    DEFINE("USER", "root");
    DEFINE("PASSWORD", "");
    DEFINE("DB", "hms");
    $mysqli = new mysqli(SERVER, USER, PASSWORD, DB);
    if($mysqli->connect_error) {
        echo json_encode(array("error" => "Unable to connect."));
        exit();
        // var_dump($mysqli);
    } else {
        // echo("Error<br>");
        // var_dump($mysqli);
    }
?>