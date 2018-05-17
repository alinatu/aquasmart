var $situationCount;
var $situationList;
var $optionList;
var $optionCount;
var $situationsUsed = [];
var $pullSituationsX;

//function for the highscores button
$(document).ready(function(){
    $("#highscores").click(function(e){
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
                    listData += "<tr><td>" + highscore_player["user_name"]
                    +"<br>City Name: " + highscore_player["user_city"] 
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

function addPlayer($playerName, $playerScore) {
    var postPlayer = {"user_name" : $playerName, "user_score" : $playerScore};
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
        getCurrentSituations(i);
    }
    /*
    if ($pullSituationsX == 1) {
        console.log("Pulling 1st set of situations from DB");
        $.ajax({
            url: "./DB/getSituations1.php",
            dataType: "json",
            type: "GET",
            data: {output: "json" },
            success: function(data) {
                console.log(data);
                $situationList = data["returnSituations"];
                console.log($situationList);
                setSituations();
            }
        });
        $.ajax({
            url: "./DB/getOptions1.php",
            dataType: "json",
            type: "GET",
            data: {output: "json" },
            success: function(data) {
                console.log(data);
                $optionList = data["returnSituations"];
                console.log($optionList);
                setOptions();
            }
        });
    } else if ($pullSituationsX == 2) {
        console.log("Pulling 2nd set of situations from DB");
        $.ajax({
            url: "./DB/getSituations2.php",
            dataType: "json",
            type: "GET",
            data: {output: "json" },
            success: function(data) {
                console.log(data);
                $situationList = data["returnSituations"];
                console.log($situationList);
                setSituations();
            }
        });
        $.ajax({
            url: "./DB/getOptions2.php",
            dataType: "json",
            type: "GET",
            data: {output: "json" },
            success: function(data) {
                console.log(data);
                $optionList = data["returnSituations"];
                console.log($optionList);
                setOptions();
            }
        });
    } else if ($pullSituationsX == 3) {
        console.log("Pulling 3rd set of situations from DB");
        $.ajax({
            url: "./DB/getSituations3.php",
            dataType: "json",
            type: "GET",
            data: {output: "json" },
            success: function(data) {
                console.log(data);
                $situationList = data["returnSituations"];
                console.log($situationList);
                setSituations();
            }
        });
        $.ajax({
            url: "./DB/getOptions3.php",
            dataType: "json",
            type: "GET",
            data: {output: "json" },
            success: function(data) {
                console.log(data);
                $optionList = data["returnSituations"];
                console.log($optionList);
                setOptions();
            }
        });
    } else if ($pullSituationsX == 4) {
        console.log("Pulling 4th set of situations from DB");
        $.ajax({
            url: "./DB/getSituations4.php",
            dataType: "json",
            type: "GET",
            data: {output: "json" },
            success: function(data) {
                console.log(data);
                $situationList = data["returnSituations"];
                console.log($situationList);
                setSituations();
            }
        });
        $.ajax({
            url: "./DB/getOptions4.php",
            dataType: "json",
            type: "GET",
            data: {output: "json" },
            success: function(data) {
                console.log(data);
                $optionList = data["returnSituations"];
                console.log($optionList);
                setOptions();
            }
        });
    } else if ($pullSituationsX == 5) {
        console.log ("Pulling 5th set of situations from DB");
        $.ajax({
            url: "./DB/getSituations5.php",
            dataType: "json",
            type: "GET",
            data: {output: "json" },
            success: function(data) {
                console.log(data);
                $situationList = data["returnSituations"];
                console.log($situationList);
                setSituations();
            }
        });
        $.ajax({
            url: "./DB/getOptions5.php",
            dataType: "json",
            type: "GET",
            data: {output: "json" },
            success: function(data) {
                console.log(data);
                $optionList = data["returnSituations"];
                console.log($optionList);
                setOptions();
            }
        });
    } else if ($pullSituationsX == 6) {
        console.log ("Pulling 6th set of situations from DB");
        $.ajax({
            url: "./DB/getSituations6.php",
            dataType: "json",
            type: "GET",
            data: {output: "json" },
            success: function(data) {
                console.log(data);
                $situationList = data["returnSituations"];
                console.log($situationList);
                setSituations();
            }
        });
        $.ajax({
            url: "./DB/getOptions6.php",
            dataType: "json",
            type: "GET",
            data: {output: "json" },
            success: function(data) {
                console.log(data);
                $optionList = data["returnSituations"];
                console.log($optionList);
                setOptions();
            }
        });
    } else if ($pullSituationsX == 7) {
        console.log("Pulling 7th set of situations from DB");
        $.ajax({
            url: "./DB/getSituations7.php",
            dataType: "json",
            type: "GET",
            data: {output: "json"},
            success: function(data) {
                console.log(data);
                $situationList = data["returnSituations"];
                console.log($situationList);
                setSituations();
            }
        });
        $.ajax({
            url: "./DB/getOptions7.php",
            dataType: "json",
            type: "GET",
            data: {output: "json" },
            success: function(data) {
                console.log(data);
                $optionList = data["returnSituations"];
                console.log($optionList);
                setOptions();
            }
        });
    } else if ($pullSituationsX == 8) {
        console.log("Pulling 8th set of situations from DB");
        $.ajax({
            url: "./DB/getSituations8.php",
            dataType: "json",
            type: "GET",
            data: {output: "json"},
            success: function(data) {
                console.log(data);
                $situationList = data["returnSituations"];
                console.log($situationList);
                setSituations();
            }
        });
        $.ajax({
            url: "./DB/getOptions8.php",
            dataType: "json",
            type: "GET",
            data: {output: "json",},
            success: function(data) {
                console.log(data);
                $optionList = data["returnSituations"];
                console.log($optionList);
                setOptions();
            }
        });
    } else if ($pullSituationsX == 9) {
        console.log("Pulling 9th set of situations from DB");
        $.ajax({
            url: "./DB/getSituations9.php",
            dataType: "json",
            type: "GET",
            data: {output: "json" },
            success: function(data) {
                console.log(data);
                $situationList = data["returnSituations"];
                console.log($situationList);
                setSituations();
            }
        });
        $.ajax({
            url: "./DB/getOptions9.php",
            dataType: "json",
            type: "GET",
            data: {output: "json"},
            success: function(data) {
                console.log(data);
                $optionList = data["returnSituations"];
                console.log($optionList);
                setOptions();
            }
        });
    }
    */
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