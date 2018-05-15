<?php
    $methodType = $_SERVER['REQUEST_METHOD'];

    $servername = "localhost";
    $dblogin = "playaqua_aqsmrt";
    $password = "!@Aquors!@";
    $dbname = "playaqua_aquasmart";

    $data = array("status" => "fail", "msg" => "on $methodType");

    if ($methodType === 'GET') {
        if (isset($_GET['output'])) {
            $output = $_GET['output'];

            try {
                $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dblogin, $password);

                $conn->setAttribute(PDO::ATTR_ERRMODE, ERRMODE_EXCEPTION);

                $sql = 
            }
        }
    }
?>