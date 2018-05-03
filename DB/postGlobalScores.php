<?php
$methodType = $_SERVER['REQUEST_METHOD'];

    $servername = "localhost";
     $dblogin = "playaqua_aqsmrt";
     $password = "!@Aquors!@";
     $dbname = "playaqua_aquasmart";
 
     $data = array("msg" => "on $methodType");

if ($methodType === 'POST') {
    foreach ($_POST as $key => $value) {
        $data[$key] = $value;
    }
    echo json_encode($data, JSON_FORCE_OBJECT);
    return;

    if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
        if (isset($_POST["user_name"]) && !empty($_POST["user_name"])
        && (isset($_POST["user_score"]) && !empty($_POST["user_score"]))) {

            $userName = $_POST["user_name"];
            $userScore = $_POST["user_score"];

            $data = array("msg" => "Player added to scores list with name $userName and score $userScore");
            /*
            try {
                $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dblogin, $password);

                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                $sqlInsert = "INSERT INTO player (user_name, user_score) VALUES ($userName, $userScore)";

                $statementInsert = $conn->prepare($sqlInsert);
                $statementInsert->execute();

                $data = array("status" => "success", "")
            } catch (PDOEXCEPTION $e) {
                $data = array("error", $e->getMessage());
            } */
        }
    }
}
?>