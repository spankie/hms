<?php
    include("includes/connection.php");

    if (isset($_GET["do"])) {
        switch ($_GET["do"]) {
            case 'login':
                # code...
                $post = array();
                $body_params = json_decode(file_get_contents("php://input"));
                // $body_params = json_decode($body);
                if($body_params) {
                    foreach($body_params as $param_name => $param_value) {
                        $post[$param_name] = $param_value;
                    }
                }
                // check if all values have been passed ...
                if (array_key_exists("username", $post) && array_key_exists("password", $post)) {
                    $stmt = $mysqli->prepare("SELECT * FROM `admin` WHERE username = ?");
                    $stmt->bind_param("s", $post["username"]);
                    $stmt->execute();
                    $res = $stmt->get_result();
                    if ($res->num_rows > 0) {
                        // check if password is correct...
                        $r = $res->fetch_assoc();
                        if ($r["password"] == $post["password"]) {
                            // set the session here
                            session_start();
                            $_SESSION["ADMIN_USER"] = base64_encode($post["username"].".".$post["password"]);
                            $r["password"] = "";
                            echo json_encode(array("success" => $r));
                        } else {
                            echo json_encode(array("error" => "Username or password is incorrect."));
                        }
                    } else {
                        echo json_encode(array("error" => "Username or password is incorrect."));
                    }
                } else {
                    echo json_encode(array("error" => "Username or password is incorrect."));
                }
                break;
            case 'logout':
                session_start();
                unset($_SESSION["ADMIN_USER"]);
                // session_abort();
                session_destroy();
            default:
                # code...
                break;
        }
    }
?>