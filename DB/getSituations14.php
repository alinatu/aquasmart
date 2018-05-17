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

                $sqlSituation = "SELECT * FROM situation WHERE ID = 14";
                $sqlOption = "SELECT * FROM gameOption WHERE situation_ID = 14 ORDER BY option_ID ASC";

                $statementSituation = $conn->prepare($sqlSituation);
                $statementSituation->execute();

                $statementOption = $conn->prepare($sqlOption);
                $statementOption->execute();

                $data = array("status" => "success", "returnSituations" => $statementSituation->fetchAll(PDO::FETCH_ASSOC), "returnOptions" => $statementOption->fetchAll(PDO::FETCH_ASSOC));
            } catch (PDOException $e) {
                $data = array("error", $e->getMessage());
            }

                switch ($output) {
                    case "json":
                        $data['status'] = 'success';
                        $data['msg'] = 'Retrieving situations from database';
                    
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