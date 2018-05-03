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
                 $conn =  new PDO("mysql:host=$servername;dbname=$dbname", $dblogin, $password);
 
                 $conn >setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 
                 $sqlPlayer = "SELECT * FROM player ORDER BY user_score DESC";
 
                 $statementPlayer = $conn->prepare($sqlPlayer);
                 $statementPlayer->execute();
                 $count = $statementPlayer->rowCount();
                 /*
                 $sqlScore = "SELECT * FROM scores ORDER BY user_score DESC";
                 $statementScore = $conn >prepare($sqlScore);
                 $statementScore >execute();
                 $count2 = $statementScore >rowCount();
                 */
                 $data = array("status" => "success", "players" => $statementPlayer->fetchAll(PDO::FETCH_ASSOC));//, "scores" => $statementScore >fetchAll(PDO::FETCH_ASSOC));
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