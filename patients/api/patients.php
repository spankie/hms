<?php
    include("includes/connection.php");

    if (isset($_GET["do"])) {
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
                    $stmt = $mysqli->prepare("SELECT * FROM patients WHERE email = ?");
                    $stmt->bind_param("s", $post["email"]);
                    $stmt->execute();
                    $res = $stmt->get_result();
                    if ($res->num_rows > 0) {
                        // check if password is correct...
                        $r = $res->fetch_assoc();
                        if ($r["password"] == $post["password"]) {
                            // set the session here
                            session_start();
                            $_SESSION["PATIENT_USER"] = base64_encode($post["email"]."_".$post["password"]);
                            $r["password"] = "";
                            echo json_encode(array("success" => $r));
                            // $subject = "Patient Login";
                            // $headers = "From: " . "BBH <support@bbhospitals.com>" . "\r\n";
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
                            echo json_encode(array("error" => "Email or password is incorrect."));
                        }
                    } else {
                        echo json_encode(array("error" => "Email or password is incorrect."));
                    }
                } else {
                    echo json_encode(array("error" => "Email or password is incorrect."));
                }
                break;
            case 'logout':
                session_start();
                unset($_SESSION["PATIENT_USER"]);
                session_destroy();
                break;
            case 'updatepassword':
                session_start();
                $email_password = base64_decode($_SESSION["PATIENT_USER"]);
                $str = explode("_", $email_password);
                $post = array();
                $body_params = json_decode(file_get_contents("php://input"));
                // $body_params = json_decode($body);
                if($body_params) {
                    foreach($body_params as $param_name => $param_value) {
                        $post[$param_name] = $param_value;
                    }
                }

                if (array_key_exists("OldPassword", $post) && array_key_exists("NewPassword", $post)
                    && array_key_exists("ConfirmPassword", $post)) {
                        // check if passwords match;
                        $result = $mysqli->query("SELECT * FROM patients WHERE email = '".$str[0]."'")->fetch_assoc();
                        if ($result["password"] != $post["OldPassword"]) {
                            echo json_encode(array("error" => "Wrong Password."));
                            exit();
                        }
                        if ($post["NewPassword"] != $post["ConfirmPassword"]) {
                            echo json_encode(array("error" => "Password Mismatch."));
                        } else {
                            $stmt = $mysqli->prepare("UPDATE patients SET `password` = ? WHERE email = ?");
                            $stmt->bind_param("ss", $post["NewPassword"], $str[0]);
                            $res = $stmt->execute();
                            if ($res) {
                                echo json_encode(array("success" => "Password Changed Successfully"));
                                // $subject = "Password change";
                                // $headers = "From: " . "BBH <support@bbhospitals.com>" . "\r\n";
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
                                echo json_encode(array("error" => "Server Error."));
                            }
                        }
                } else {
                    echo json_encode(array("error" => "Invalid Request."));
                }
                break;
            case 'getappointments':
                session_start();
                $email_password = base64_decode($_SESSION["PATIENT_USER"]);
                $str = explode("_", $email_password);
                $result = $mysqli->query("SELECT * FROM patients WHERE email = '".$str[0]."'")->fetch_assoc();
                $stmt = $mysqli->prepare("SELECT * FROM appointments a LEFT JOIN (SELECT id AS d_id, name AS d_name FROM doctors) d ON d.d_id = a.doctor_id WHERE a.patient_id = ?");
                $stmt->bind_param("i", $result["id"]);
                $stmt->execute();
                $res = $stmt->get_result();
                $rows = array();
                if ($res->num_rows > 0) {
                    while($r = $res->fetch_assoc()) {
                        $rows[] = $r;
                    }
                    echo json_encode($rows);
                } else {
                    echo json_encode(array("error" => "No Appointment(s)"));
                }
                break;
            case 'updateimage':
                session_start();
                if (!isset($_SESSION["PATIENT_USER"])) {
                    echo json_encode(array("error" => "Common Get out of here."));
                    exit();
                }
                $email_password = base64_decode($_SESSION["PATIENT_USER"]);
                $str = explode("_", $email_password);
                if (!isset($_FILES["image"])) {
                    echo json_encode(array("error" => "Invalid Request."));
                    exit();
                }
                $fileName = $_FILES["image"]["name"]; // The file name
                $fileTmpLoc = $_FILES["image"]["tmp_name"];
                $fileType = $_FILES["image"]["type"];
                $fileSize = $_FILES["image"]["size"];
                $fileErrorMsg = $_FILES["image"]["error"];
                $file_path = "../images/patients/";
                $file_name = strval(time());
                // $final_name = $file_path.$file_name;
        
                if (!$fileTmpLoc) {
                    // echo "ERROR: Please browse for a file before clicking the upload button. ".$_SESSION['uname'];
                    echo json_encode(array("error" => "Invalid Request."));
                    exit();
                } else {
                    $finfo = new finfo(FILEINFO_MIME_TYPE);
                    if (false === $ext = array_search(
                        $finfo->file($_FILES['image']['tmp_name']),
                        array(
                            'jpg' => 'image/jpeg',
                            'png' => 'image/png',
                            'gif' => 'image/gif',
                        ),
                        true
                    )) {
                        echo json_encode(array("error" => "Invalid File Format."));
                        exit();
                    }
        
                    if (is_dir($file_path) && is_writable($file_path)) {
                        // echo " is writeable and is a directory";
                        // echo "is directory: " . is_dir($file_path) ." is writeable: " . is_writable($file_path);
                        $final_name = $file_name.".".$ext;
                        if(move_uploaded_file($fileTmpLoc, $file_path.$final_name)){
                            // $insert_result = mysqli_query($conn, $insert_path);
                            $stmt = $mysqli->prepare("UPDATE patients SET `image` = ? WHERE email = ?");
                            $stmt->bind_param("ss", $final_name, $str[0]);
                            $res = $stmt->execute();
                            if($res) {
                                echo json_encode(array("success" => "Upload Completed Successfully.","image" => $final_name));
                                exit();
                            } else {
                                echo json_encode(array("error" => "Upload failed."));
                                exit();
                            }
                        } else {
                            echo json_encode(array("error" => "Could not upload the file."));
                            exit();
                            // echo "\nmove_uploaded_file function failed : ".$fileTmpLoc . "\n finalname: " . $final_name;
                        }
                    } else {
                        echo json_encode(array("error" => "No a directory or not writeable."));
                        exit();
                        // echo $file_path." is not a directory or is not writeable\n";
                        // echo "is directory: " . is_dir($file_path) ." is writeable: " . is_writable($file_path);
                    }
                }
                break;
            case 'getappointmentsreports':
                // These needs fine tuning tho...
                session_start();
                $email_password = base64_decode($_SESSION["PATIENT_USER"]);
                $str = explode("_", $email_password);
                $result = $mysqli->query("SELECT * FROM patients WHERE email = '".$str[0]."'")->fetch_assoc();
                $stmt = $mysqli->prepare("SELECT * FROM appointments a LEFT JOIN (SELECT id AS d_id, name AS d_name FROM doctors) d ON d.d_id = a.doctor_id WHERE a.patient_id = ?");
                $stmt->bind_param("i", $result["id"]);
                $stmt->execute();
                $res = $stmt->get_result();
                $rows = array();
                if ($res->num_rows > 0) {
                    while($r = $res->fetch_assoc()) {
                        $rows[] = $r;
                    }
                    echo json_encode($rows);
                } else {
                    echo json_encode(array("error" => "No Appointment(s)"));
                }
                break;
            default:
                # code...
                break;
        }
    }
?>