<?php
    include("includes/connection.php");

    if (isset($_GET["do"])) {
        switch ($_GET["do"]) {
            case 'getall':
                # code...
                $stmt = $mysqli->prepare("SELECT * FROM patients");
                $stmt->execute();
                $res = $stmt->get_result();
                if ($res->num_rows > 0) {
                    $rows = array();
                    while($r = $res->fetch_assoc()) {
                        // $r["password"] = "";
                        $rows[] = $r;
                    }
                    echo json_encode($rows);
                } else {
                    echo json_encode(array("error" => "No result"));
                }
                exit();
                break;
            case 'new':
                # code...
                // $post = json_decode(file_get_contents('php://input'));
                // echo json_encode($post);
                $post = array();
                $body_params = json_decode(file_get_contents("php://input"));
                // $body_params = json_decode($body);
                if($body_params) {
                    foreach($body_params as $param_name => $param_value) {
                        $post[$param_name] = $param_value;
                    }
                }
                // check if all values have been passed ...
                if (array_key_exists("name", $post) && array_key_exists("sex", $post)
                    && array_key_exists("country", $post) && array_key_exists("state", $post) && array_key_exists("city", $post)
                    && array_key_exists("phone", $post) && array_key_exists("email", $post) && array_key_exists("password", $post)
                    && array_key_exists("illness", $post) && array_key_exists("accomp_by_name", $post) && array_key_exists("accomp_by_phone", $post))
                {
                    // check if email already exists ...

                    $stmt1 = $mysqli->prepare("SELECT * FROM patients WHERE email = ?");
                    $stmt1->bind_param("s", $post["email"]);
                    $stmt1->execute();
                    $res1 = $stmt1->get_result();
                    if ($res1->num_rows > 0) {
                        echo json_encode(array("error" => "Email Already Exists"));
                        exit();
                    }
                    $stmt = $mysqli->prepare("INSERT INTO patients VALUES (NULL, ?, '', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)");
                    $stmt->bind_param("sssssssssss", $post["name"], $post["sex"],
                                        $post["country"], $post["state"], $post["city"],
                                        $post["phone"], $post["email"], $post["password"],
                                        $post["illness"], $post["accomp_by_name"], $post["accomp_by_phone"]);
                    $res = $stmt->execute();
                    if ($res) {
                        echo json_encode(array("success" => "New Patient Added Successfully"));
                    } else {
                        echo json_encode(array("error" => "Server Error"));
                    }
                    exit();
                } else {
                    echo json_encode(array("error" => "Invalid Request"));
                }
                exit();
                break;
            case 'update':
                $post = array();
                $body_params = json_decode(file_get_contents("php://input"));
                // $body_params = json_decode($body);
                if($body_params) {
                    foreach($body_params as $param_name => $param_value) {
                        $post[$param_name] = $param_value;
                    }
                }
                // check if all values have been passed ...
                if (array_key_exists("id", $post) && array_key_exists("image", $post) && array_key_exists("name", $post) && array_key_exists("sex", $post)
                    && array_key_exists("country", $post) && array_key_exists("state", $post) && array_key_exists("city", $post)
                    && array_key_exists("phone", $post) && array_key_exists("email", $post) && array_key_exists("password", $post)
                    && array_key_exists("illness", $post) && array_key_exists("accomp_by_name", $post) && array_key_exists("accomp_by_phone", $post))
                {
                    $exits = $mysqli->query("SELECT * FROM patients WHERE email = '".$post["email"]."'")->fetch_assoc();
                    if (isset($exits["id"]) && $exits["id"] != $post["id"]) {
                        echo json_encode(array("error" => "Email exists"));
                        exit();
                    }
                    $stmt = $mysqli->prepare("UPDATE patients SET `name` = ?, email = ?, phone = ?, country = ?, `state` = ?, city = ?, sex = ?, `password` = ?, illness = ?, accomp_by_name = ?, accomp_by_phone = ? WHERE id = ?");
                    $stmt->bind_param("sssssssssssi", $post["name"], $post["email"], $post["phone"],
                            $post["country"], $post["state"], $post["city"], $post["sex"],
                            $post["password"], $post["illness"], $post["accomp_by_name"], $post["accomp_by_phone"], $post["id"]);
                    $res = $stmt->execute();
                    if ($res) {
                        echo json_encode(array("success" => "Patient Updated Successfully"));
                    } else {
                        echo json_encode(array("error" => "Server Error"));
                    }
                    exit();
                } else {
                    echo json_encode(array("error" => "Invalid Request"));
                }
                exit();
                break;
            case 'updateimage':
                $post = array();
                $body_params = json_decode(file_get_contents("php://input"));
                // $body_params = json_decode($body);
                if($body_params) {
                    foreach($body_params as $param_name => $param_value) {
                        $post[$param_name] = $param_value;
                    }
                }
                if (!isset($_FILES["image"]) || !isset($_POST["email"])) {
                    echo json_encode(array("error" => "Invalid Request.p"));
                    exit();
                }
                $fileName = $_FILES["image"]["name"]; // The file name
                $fileTmpLoc = $_FILES["image"]["tmp_name"];
                $fileType = $_FILES["image"]["type"];
                $fileSize = $_FILES["image"]["size"];
                $fileErrorMsg = $_FILES["image"]["error"];
                $file_path = "../../patients/images/patients/";
                $file_name = strval(time());
                // $final_name = $file_path.$file_name;
        
                if (!$fileTmpLoc) {
                    // echo "ERROR: Please browse for a file before clicking the upload button. ".$_SESSION['uname'];
                    echo json_encode(array("error" => "Invalid Request."));
                    exit();
                } else {
                    // $finfo = new finfo(FILEINFO_MIME_TYPE);
                    // if (false === $ext = array_search(
                    //     $finfo->file($_FILES['image']['tmp_name']),
                    //     array(
                    //         'jpg' => 'image/jpeg',
                    //         'png' => 'image/png',
                    //         'gif' => 'image/gif',
                    //     ),
                    //     true
                    // )) {
                    //     echo json_encode(array("error" => "Invalid File Format."));
                    //     exit();
                    // }
                    $ext = pathinfo(basename($fileName), PATHINFO_EXTENSION);
                    if (is_dir($file_path) && is_writable($file_path)) {
                        // echo " is writeable and is a directory";
                        // echo "is directory: " . is_dir($file_path) ." is writeable: " . is_writable($file_path);
                        $final_name = $file_name.".".$ext;
                        if(move_uploaded_file($fileTmpLoc, $file_path.$final_name)){
                            // $insert_result = mysqli_query($conn, $insert_path);
                            $stmt = $mysqli->prepare("UPDATE patients SET `image` = ? WHERE email = ?");
                            $stmt->bind_param("ss", $final_name, $_POST["email"]);
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
            case 'delete':
                $post = array();
                $body_params = json_decode(file_get_contents("php://input"));
                // $body_params = json_decode($body);
                if($body_params) {
                    foreach($body_params as $param_name => $param_value) {
                        $post[$param_name] = $param_value;
                    }
                }
                // check if all values have been passed ...
                if (array_key_exists("id", $post)){
                    $stmt = $mysqli->prepare("DELETE FROM patients WHERE id = ?");
                    $stmt->bind_param("i", $post["id"]);
                    $res = $stmt->execute();
                    if ($res) {
                        echo json_encode(array("success" => "Patient Deleted Successfully"));
                        exit();
                    } else {
                        echo json_encode(array("error" => "Server Error"));
                        exit();
                    }
                } else {
                    echo json_encode(array("error" => "Invalid Request"));
                    exit();
                }
            default:
                # code...
                break;
        }
    }
?>