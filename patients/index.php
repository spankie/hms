<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
    <!-- Head -->
    <head>
    <title>Blessed Barachel Hospitals | Patients</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="utf-8">
    <meta name="keywords" content="Blessed Barachel Hospitals" />
    <meta name="description" content="Blessed Barachel Hospitals Patients login portal."/>
    <link href="css/tachyons.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/iziToast.min.css">
    <link href="css/dashboard.css" rel="stylesheet">
    </head>
    <body  class="Raleway">
        <a href="/" class="dn">home</a>
        <?php if (isset($_SESSION["PATIENT_USER"])) { ?>
            <script> let RESU_TNEITAP = true; </script>
        <?php } else { ?>
            <script> let RESU_TNEITAP = false; </script>
        <?php } ?>
        <div id="appContainer"></div>
        <script src="../js/bin/patients-bundle.js"></script>
    </body>
</html>