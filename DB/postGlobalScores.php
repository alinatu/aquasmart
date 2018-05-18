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
    //echo json_encode($data, JSON_FORCE_OBJECT);

    if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
       /* if (isset($_POST["user_name"]) && !empty($_POST["user_name"])
        && isset($_POST["user_score"]) && !empty($_POST["user_score"])) */
        if (isset($_POST["user_name"]) && isset($_POST["user_score"])) {

            $userName = $_POST["user_name"];
            $userCity = $_POST["user_city"];
            $userScore = $_POST["user_score"];
            
            try {
                $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dblogin, $password);

                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                $sqlInsert = "INSERT INTO player (user_name, user_city, user_score) VALUES (:playerName, :playerCity, :playerScore)";

                $statementInsert = $conn->prepare($sqlInsert);
                $statementInsert->execute(array("playerName" => $userName, "playerCity" =>  $userCity, ":playerScore" => $userScore));

                $data = array("status" => "success", "msg" => "Player added to scores list with name $userName and score $userScore");
            } catch (PDOException $e) {
                $data = array("error", $e->getMessage());
            }
        } else {
            $data = array("msg" => "Either Player Name, or Player Score was invalid. Player not added to database");
        }
    } else {
        $data = array("msg" => "Has to be an AJAX call");
    }
} else {
    $data = array("msg" => "Error: only POST allowed");
}
echo json_encode($data, JSON_FORCE_OBJECT);
?>