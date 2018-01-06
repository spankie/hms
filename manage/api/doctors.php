<?php
    include("includes/connection.php");

    switch ($_GET["do"]) {
        case 'login':
            $post = array();
            $body_params = json_decode(file_get_contents("php://input"));
            // $body_params = json_decode($body);
            if($body_params) {
                foreach($body_params as $param_name => $param_value) {
                    $post[$param_name] = $param_value;
                }
            }
            // check if all values have been passed ...
            if (array_key_exists("email", $post) && array_key_exists("password", $post)) {
                $stmt = $mysqli->prepare("SELECT * FROM doctors WHERE email = ?");
                $stmt->bind_param("s", $post["email"]);
                $stmt->execute();
                $res = $stmt->get_result();
                if ($res->num_rows > 0) {
                    // check if password is correct...
                    $r = $res->fetch_assoc();
                    if ($r["password"] == $post["password"]) {
                        // set the session here
                        session_start();
                        $_SESSION["DOCTOR_USER"] = base64_encode($post["email"].".".$post["password"]);
                        $r["password"] = "";
                        echo json_encode(array("success" => $_SESSION["DOCTOR_USER"]));
                    } else {
                        echo json_encode(array("error" => "Email or password is incorrect."));
                    }
                } else {
                    echo json_encode(array("error" => "Email or password is incorrect."));
                }
            } else {
                echo json_encode(array("error" => "Email or password is incorrect."));
            }
            break;
        case 'getall':
            # code...
            $stmt = $mysqli->prepare("SELECT * FROM doctors");
            $stmt->execute();
            $res = $stmt->get_result();
            if ($res->num_rows > 0) {
                $rows = array();
                while($r = $res->fetch_assoc()) {
                    $r["password"] = "";
                    $rows[] = $r;
                }
                echo json_encode($rows);
            } else {
                echo json_encode(array("error" => "No result"));
            }
            exit();
            break;
        case 'new':
            $post = array();
            $body_params = json_decode(file_get_contents("php://input"));
            // $body_params = json_decode($body);
            if($body_params) {
                foreach($body_params as $param_name => $param_value) {
                    $post[$param_name] = $param_value;
                }
            }
            // check if all values have been passed ...
            if (array_key_exists("name", $post) && array_key_exists("email", $post) && array_key_exists("password", $post) && array_key_exists("specialty", $post)
                && array_key_exists("department", $post) && array_key_exists("sex", $post))
            {
                // check if email already exists ...
                $stmt1 = $mysqli->prepare("SELECT * FROM doctors WHERE email = ?");
                $stmt1->bind_param("s", $post["email"]);
                $stmt1->execute();
                $res1 = $stmt1->get_result();
                if ($res1->num_rows > 0) {
                    echo json_encode(array("error" => "Email Already Exists"));
                    exit();
                }
                $stmt = $mysqli->prepare("INSERT INTO doctors VALUES (NULL, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)");
                $stmt->bind_param("ssssss", $post["name"], $post["email"], $post["password"], $post["specialty"],
                                    $post["department"], $post["sex"]);
                $res = $stmt->execute();
                if ($res) {
                    echo json_encode(array("success" => "New Doctor Added Successfully"));
                } else {
                    echo json_encode(array("error" => "Server Error"));
                }
                exit();
            } else {
                echo json_encode(array("error" => "Invalid Request"));
            }
            exit();
            break;
        default:
            # code...
            break;
    }
?>