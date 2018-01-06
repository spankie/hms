<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
    <!-- Head -->
    <head>
    <title>Blessed Barachel Hospitals | Manage</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="utf-8">
    <meta name="keywords" content="Blessed Barachel Hositals" />
    <link href="css/tachyons.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/iziToast.min.css">
    <link rel="stylesheet" href="css/flatpickr.min.css">
    <link href="css/dashboard.css" rel="stylesheet">
    </head>
    <body  class="Raleway">
        <?php if (isset($_SESSION["ADMIN_USER"])) { ?>
            <script> let RESU_NIMDA = true; </script>
        <?php } else { ?>
            <script> let RESU_NIMDA = false; </script>
        <?php } ?>
        <div id="appContainer"></div>
        <script src="../js/bin/manage-bundle.js"></script>
    </body>
</html>