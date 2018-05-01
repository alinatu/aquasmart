<?php
    $methodType = $_SERVER['REQUEST_METHOD'];

    $servername = "localhost";
    $dblogin = "root";
    $password = "";
    $dbname = "scores";

    $data = array("status" => "fail", "msg" => "on $methodType");

    if ($methodType === 'GET') {
        if (isset($_GET['output'])) {
            $output = $_GET['output'];

            try {
                $conn =  new PDO("mysql:host=$servername;dbname=$dbname", $dblogin, $password);

                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                $sql = "SELECT * FROM highscores ORDER BY user_score DESC";

                $statement = $conn->prepare($sql);
                $statement->execute();
                $count = $statement->rowCount();

                $data = array("status" => "success", "high" => $statement->fetchAll(PDO::FETCH_ASSOC));
            } catch (PDOEXception $e) {
                $data = array("error", $e->getMessage());
            }

                switch($output) {
                    case "json":
                        $data['status'] = 'success';
                        $data['msg'] = 'Retrieving data as JSON';

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