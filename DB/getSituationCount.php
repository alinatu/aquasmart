<?php
    $methodType = $_SERVER['REQUEST_METHOD'];

    $serverName = "localhost";
    $dblogin = "playaqua_aqsmrt";
    $password = "!@Aquors!@";
    $dbname = "playaqua_aquasmart";

    $data = array("status" => "fail", "msg" => "on $methodType");

    if ($methodType === 'GET') {
        if (isset($_GET['output'])) {
            $output = $_GET['output'];

            try {
                $conn = new PDO("mysql:host=$serverName;dbname=$dbname", $dblogin, $password);

                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                $sql = "SELECT MAX(ID) as ID FROM situation";

                $statement = $conn->prepare($sql);
                $statement->execute();
                $count = $statement->rowCount();

                $data = array("status" => "success", "situationCount" => $statement->fetchAll(PDO::FETCH_ASSOC));
            } catch (PDOException $e) {
                $data = array("error", $e->getMessage());
            }

            switch($output) {
                case "json":
                    $data['status'] = 'success';
                    $data['msg'] = "Retrieving data as JSON";

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