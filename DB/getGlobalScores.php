<?php
    $methodType = $_SERVER['REQUEST_METHOD'];

    $servername = "localhost";
    $dblogin = "root";
    $password = "";
    $dbname = "aquasmart";

    $data = array("status" => "fail", "msg" => "on $methodType");

    if ($methodType === 'GET') {
        if (isset($_GET['output'])) {
            $output = $_GET['output'];

            try {
                $conn =  new PDO("mysql:host=$servername;dbname=$dbname", $dblogin, $password);

                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                $sqlPlayer = "SELECT * FROM player ORDER BY user_score DESC";

                $statementPlayer = $conn->prepare($sqlPlayer);
                $statementPlayer->execute();
                $count = $statementPlayer->rowCount();
                /*
                $sqlScore = "SELECT * FROM scores ORDER BY user_score DESC";
                $statementScore = $conn->prepare($sqlScore);
                $statementScore->execute();
                $count2 = $statementScore->rowCount();
                */
                $data = array("status" => "success", "players" => $statementPlayer->fetchAll(PDO::FETCH_ASSOC));//, "scores" => $statementScore->fetchAll(PDO::FETCH_ASSOC));
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
/*
class DB {
    private $servername = "localhost";
    private $username = "root";
    private $password = "";
    private $dbname = "scores";

    //connect to DB
    public function connect() {
        $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
        return;
    }

    //Insert into DB
    //Att: make sure table is created
    public function InsertPlayer($userName) {
        $sql = "INSERT INTO player (user_name) VALUES (\"$userName\")";
        $result = $this->conn->query($sql);
        if ($result == true) {
        }
    }

    //Read from DB
    public function listPlayers() {
        $sql = "SELECT * FROM player ORDER BY user_ID ASC";
        $result = $this->conn->query($sql);
        $data = array("status" => "success", "high" => $result->fetch_assoc());
        echo $data->num_rows;
        if ($data->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
            }
        } else {
            echo "No results :: Test";
        }
    }

    public function disconnect() {
        $this->conn->close();
    }
}

$obj = new DB();
$obj->connect();
$obj->listPlayers();
*/
?>