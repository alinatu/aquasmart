var $situationCount;
var $situationList;
var $optionList;
var $optionCount;
var $situationsUsed = [];
var $pullSituationsX;

//function for the highscores button
$(document).ready(function(){
    $("#highscores").click(function(e){
        $("#endGame").css("display", "none");
        $("#help").css("display", "none");
        document.getElementById("about").style.display = "none";
        document.getElementById("login").style.display = "none";
        document.getElementById("scores").style.display = "block";
        document.getElementById("gamediv").style.display = "none";
        document.getElementById("option").style.display = "none";
        document.getElementById("scoreList").innerHTML = "";
        e.preventDefault();
        console.log("Clicked for JSON");

        $.ajax({
            url: "./DB/getGlobalScores.php",
            dataType: "json",
            type: "GET",
            data: {output: "json" },
            success: function(data) {
                console.log(data);
                var listPlayers = data.players;
                //var listScores = data['scores'];

                var listData = "<table><th>Player</th><th>Score</th></tr>";
                for (var i in listPlayers) {
                    var highscore_player = listPlayers[i];
                    //var highscore_score = listScores[i];
                    listData += "<tr><td>Mayor " + highscore_player["user_name"]
                    +" of " + highscore_player["user_city"]
                    + "</td><td>" + highscore_player["user_score"]
                    + "</td></tr>";
                }
                listData += "</table>";
                $("#scoreList").append(listData);
                listData = "";
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Failed");
                console.log(textStatus);
                console.log(errorThrown);
                console.log(jqXHR);
                $("#scoreList").text(textStatus + " "
                + errorThrown + jqXHR.responseText);
            }
        });
    });
});

function addPlayer($playerName, $playerCity, $playerScore) {
    var postPlayer = {"user_name" : $playerName,"user_city": $cityName, "user_score" : $playerScore};
    console.log("Adding record to DB with Player Name: " + $playerName);
    $.ajax({
        url: "./DB/postGlobalScores.php",
        dataType: "json",
        type: "POST",
        data: postPlayer,
        success: function(data) {
            console.log("Data returned from server: ", data);
            var listData = "";
            for (var key in data) {
                listData += key + ":" + data[key] + " ";
            }
            console.log(listData);
        }
    });
}

function getSituationNumber() {
    console.log("Should show # of situations");
    $.ajax({
        url: "./DB/getSituationCount.php",
        dataType: "json",
        type: "GET",
        data: {output: "json" },
        success: function(data) {
            console.log(data);
            var listSituations = data["situationCount"];
            var situationNum = listSituations[0];
            $situationCount = situationNum["ID"];
            console.log($situationCount);
            getSituations();
        },
        error: function(jqXHR,textStatus, errorThrown) {
            console.log("Failed");
            console.log(textStatus);
            console.log(errorThrown);
            console.log(jqXHR);
        }
    });
}
function pullSituations() {
    var numFound = false;
    while (!numFound) {
        if ($situationsUsed.length < $situationCount) {
            $pullSituationsX = Math.floor(Math.random()
            * ($situationCount) + 1);
        }
        if (!$situationsUsed.includes($pullSituationsX)) {
            $situationsUsed.push($pullSituationsX);
            numFound = true;
        }
    }
}

function getCurrentSituations(sitNum) {
        pullSituations();
        console.log("Pulling situation: " + $pullSituationsX);
        $.ajax({
            url: "./DB/getSituations" + $pullSituationsX + ".php",
            dataType: "json",
            type: "GET",
            data: {output: "json" },
            success: function(data) {
                console.log(data);
                $situationList = data["returnSituations"];
                console.log($situationList);
                $optionList = data["returnOptions"];
                console.log($optionList);
                setSituations(sitNum);
                setOptions(sitNum);
            }
        });
}
//pulls the list of situations from the DB.
function getSituations() {
    for (let i = 0; i < 3; i++) {
        if ($situationsUsed.length < $situationCount) {
            getCurrentSituations(i);
        }
    }
}

//Sets the 3 situations with the situation and option data from the database.
function setSituations(districtID) {
    console.log("Setting situations for week: " + $currentWeek);
        var currentSituation = $situationList[0];
        situations[districtID].id = currentSituation["ID"];
        situations[districtID].title = currentSituation["title"];
        situations[districtID].description = currentSituation["description"];
        situations[districtID].imageBanner = "./images/situationBanners/"
        + currentSituation["imageLink"];
}

function setOptions(districtID) {
    var opt1 = $optionList[0];
    situations[districtID].option1.title = opt1["title"];
    situations[districtID].option1.description = opt1["description"];
    situations[districtID].option1.difficulty = opt1["difficulty"];
    situations[districtID].option1.rate = opt1["water_saved"];
    situations[districtID].option1.reception = Number(opt1["reception_change"]);
    situations[districtID].option1.success = opt1["success_description"];
    situations[districtID].option1.failure = opt1["failure_description"];
    situations[districtID].option1.time = opt1["completionTime"];
    situations[districtID].option1.outcome = opt1["isSuccessful"];
    console.log($optionList);

    var opt2 = $optionList[1];
    situations[districtID].option2.title = opt2["title"];
    situations[districtID].option2.description = opt2["description"];
    situations[districtID].option2.difficulty = opt2["difficulty"];
    situations[districtID].option2.rate = opt2["water_saved"];
    situations[districtID].option2.reception = Number(opt2["reception_change"]);
    situations[districtID].option2.success = opt2["success_description"];
    situations[districtID].option2.failure = opt2["failure_description"];
    situations[districtID].option2.time = opt2["completionTime"];
    situations[districtID].option2.outcome = opt2["isSuccessful"];
    console.log($optionList);

    var opt3 = $optionList[2];
    situations[districtID].option3.title = opt3["title"];
    situations[districtID].option3.description = opt3["description"];
    situations[districtID].option3.difficulty = opt3["difficulty"];
    situations[districtID].option3.rate = opt3["water_saved"];
    situations[districtID].option3.reception = Number(opt3["reception_change"]);
    situations[districtID].option3.success = opt3["success_description"];
    situations[districtID].option3.failure = opt3["failure_description"];
    situations[districtID].option3.time = opt3["completionTime"];
    situations[districtID].option3.outcome = opt3["isSuccessful"];
    console.log($optionList);
}