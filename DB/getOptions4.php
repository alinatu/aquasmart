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

                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                $sql = "SELECT * FROM gameOption WHERE situation_ID IN (10, 11, 12) ORDER BY option_ID ASC";

                $statement = $conn->prepare($sql);
                $statement->execute();

                $data = array("status" => "success", "returnOptions" => $statement->fetchAll(PDO::FETCH_ASSOC));
            } catch (PDOException $e) {
                $data = array("error", $e->getMessage());
            }
                switch ($output) {
                    case "json":
                        $data['status'] = 'success';
                        $data['msg'] = 'Retrieving 4th set Options from database';

                    $json = json_encode($data);

                    echo $json;
                    break;
                }
        } else {
            echo "Need a type of output";
        }
    } else {
        echo $data;
    }
?>