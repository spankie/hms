<?php
    if (isset($_POST["login"])) {
        echo "login is set!";

    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>HOSPITAL MANAGEMENT SYSTEM</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <nav class="navbar navbar-inverse" style="border-radius: 0;">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.php">Adele's </a><p class="navbar-text text-info">HOSPITAL MANAGEMENT SYSTEM</p>
            </div>
        </div>
    </nav>

    <div class="col-sm-6 col-md-4 col-sm-offset-3 col-md-offset-4">
        <div class="row">
            <h3 class="center" align="center">Login</h3>
        </div>
        <hr>
        <?php if(isset($login_error)) {
            echo '<p align="center" class="text-danger">'.$login_error.'</p>';
        } ?>
        <form method="POST" action="login.php">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" name="username" class="form-control" id="username" placeholder="Username">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" name="password" class="form-control" id="password" placeholder="Password">
            </div>
            <div class="">
                <a href="#!">Forgot your password?</a>
            </div>
            <div>
                <button type="submit" name="login" class="btn btn-default">Login</button>
            </div>
        </form>
    </div>
   <h1>HOSPITAL MANAGEMENT SYSTEM</h1>
        <ul>
            <p>Admin</p>
            <li>Appointment</li>
            <li>Schedule</li>
            <p>Patients</p>
            <li>Register</li>
            <li>See available doctors</li>
            <li></li>
            <p>Doctors</p>
            <li>See His/her patients</li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>   
        </ul>
   <script src="js/jquery.min.js"></script>
   <script src="js/bootstrap.min.js"></script>
</body>
</html>