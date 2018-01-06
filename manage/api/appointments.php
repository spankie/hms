<?php
    include("includes/connection.php");

    switch ($_GET["do"]) {
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
            if (array_key_exists("patient_id", $post) && array_key_exists("appointment_time", $post)
                && array_key_exists("description", $post) && array_key_exists("doctor_id", $post))
            {
                // check if there is an appointment for the user at that particular time...
                // check if that is a valid user ID
                $patient = $mysqli->query("SELECT * FROM patients WHERE id = ".$post["patient_id"])->fetch_assoc();
                if (isset($patient["id"])) {

                    $stmt = $mysqli->prepare("INSERT INTO appointments VALUES (NULL, ?, ?, ?, ?, CURRENT_TIMESTAMP, 'pending', '')");
                    $stmt->bind_param("ssss", $post["patient_id"], $post["appointment_time"], $post["description"], $post["doctor_id"]);
                    $res = $stmt->execute();
                    if ($res) {
                        echo json_encode(array("success" => "New Appointment Added Successfully"));
                        // $subject = "BBH Appointment";
                        // $headers = "From: " . "BBH <appointment@bbhospitals.com>" . "\r\n";
                        // $headers .= "MIME-Version: 1.0\r\n";
                        // $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
                        // $emailtext = "We have created an appointment for you with ________ doctor at _____ time.";
                        // $patient = $mysqli->query("SELECT * FROM patients WHERE id = ".$post["patient_id"])->fetch_assoc();
                        // if (mail($patient["email"], $subject, $emailtext, $headers)) {
                        // //     $do_result .= ". Confirmation Email has been sent also.";
                        // } else {
                        // //     $do_result .= ". Could not send confirmation email.";
                        // }
                    } else {
                        echo json_encode(array("error" => "Server Error"));
                    }
                } else {
                    echo json_encode(array("error" => "Invalid Request"));    
                }
                exit();
            } else {
                echo json_encode(array("error" => "Invalid Request"));
            }
            exit();
            break;
        case 'updatestatus':
            $post = array();
            $body_params = json_decode(file_get_contents("php://input"));
            // $body_params = json_decode($body);
            if($body_params) {
                foreach($body_params as $param_name => $param_value) {
                    $post[$param_name] = $param_value;
                }
            }
            // check if all values have been passed ...
            if (array_key_exists("status", $post) && array_key_exists("status_desc", $post) && array_key_exists("id", $post)){
                $stmt = $mysqli->prepare("UPDATE appointments SET status = ?, status_desc = ? WHERE id = ?");
                $stmt->bind_param("ssi", $post["status"], $post["status_desc"], $post["id"]);
                $res = $stmt->execute();
                if ($res) {
                    echo json_encode(array("success" => "Appointment Updated Successfully"));
                    exit();
                } else {
                    echo json_encode(array("error" => "Server Error"));
                    exit();
                }
            } else {
                echo json_encode(array("error" => "Invalid Request"));
                exit();
            }
            break;
        case 'newuserapp':
            $post = array();
            $body_params = json_decode(file_get_contents("php://input"));
            // $body_params = json_decode($body);
            if($body_params) {
                foreach($body_params as $param_name => $param_value) {
                    $post[$param_name] = $param_value;
                }
            }
            // check if all values have been passed ...
            // if (array_key_exists("name", $post) && array_key_exists("email", $post)
            //     && array_key_exists("phone", $post) && array_key_exists("date", $post) && array_key_exists("message", $post))
            // {
            if (isset($_POST["name"]) && isset($_POST["email"]) && isset($_POST["phone"]) && isset($_POST["date"]) && isset($_POST["message"])){
                // check if there is an appointment for the user at that particular time...
                $stmt = $mysqli->prepare("INSERT INTO user_appointments VALUES (NULL, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, 'pending')");
                $stmt->bind_param("sssss", $_POST["name"], $_POST["email"], $_POST["phone"], $_POST["date"], $_POST["message"]);
                $res = $stmt->execute();
                if ($res) {
                    echo json_encode(array("success" => "New Appointment Added Successfully"));
                    // $subject = "New user Appointment";
                    // $headers = "From: " . "BBH <appointment@bbhospitals.com>" . "\r\n";
                    // $headers .= "MIME-Version: 1.0\r\n";
                    // $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
                    // $emailtext = "We have created an appointment for you with ________ doctor at _____ time.";
                    // $patient = $mysqli->query("SELECT * FROM patients WHERE id = ".$post["patient_id"])->fetch_assoc();
                    // if (mail(the person, $subject, $emailtext, $headers)) {
                    // //     $do_result .= ". Confirmation Email has been sent also.";
                    // } else {
                    // //     $do_result .= ". Could not send confirmation email.";
                    // }
                } else {
                    echo json_encode(array("error" => "Server Error"));
                }
                exit();
            } else {
                echo json_encode(array("error" => "Invalid Request"));
            }
            exit();
            break;
        case 'delete':
            $post = array();
            $body_params = json_decode(file_get_contents("php://input"));
            // $body_params = json_decode($body);
            if($body_params) {
                foreach($body_params as $param_name => $param_value) {
                    $post[$param_name] = $param_value;
                }
            }

            if (array_key_exists("id", $post)){
                $stmt = $mysqli->prepare("DELETE FROM appointments WHERE id = ?");
                $stmt->bind_param("i", $post["id"]);
                $res = $stmt->execute();
                if ($res) {
                    echo json_encode(array("success" => "Appointment Deleted Successfully"));
                    exit();
                } else {
                    echo json_encode(array("error" => "Server Error"));
                    exit();
                }
            } else {
                echo json_encode(array("error" => "Invalid Request"));
                exit();
            }
        case 'getallbapps':
            $stmt = $mysqli->prepare("SELECT * FROM `user_appointments`");
            $stmt->execute();
            $res = $stmt->get_result();
            if ($res->num_rows > 0) {
                $rows = array();
                while($r = $res->fetch_assoc()) {
                    $rows[] = $r;
                }
                echo json_encode($rows);
            } else {
                echo json_encode(array("error" => "No result"));
            }
            break;
        case 'getall':
            $stmt = $mysqli->prepare("SELECT * FROM `appointments` a LEFT JOIN (SELECT id as p_id, name as p_name FROM patients) x ON x.p_id = a.patient_id LEFT JOIN (SELECT id as d_id, name as d_name FROM doctors) d ON d.d_id = a.doctor_id");
            $stmt->execute();
            $res = $stmt->get_result();
            if ($res->num_rows > 0) {
                $rows = array();
                while($r = $res->fetch_assoc()) {
                    $rows[] = $r;
                }
                echo json_encode($rows);
            } else {
                echo json_encode(array("error" => "No result"));
            }
            break;
        default:
            break;
    }

?>