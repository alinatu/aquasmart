var $situationsUsed = [];
var $pullSituationsX;
var $totalWeeks = 5;
//function for the highscores button
$(document).ready(function(){
    $("#highscores").click(function(e){
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
            data: {output: 'json', },
            success: function(data) {
                console.log(data);
                var listPlayers = data['players'];
                //var listScores = data['scores'];
    
                var listData = "<table><th>Player Name</th><th>Score</th></tr>";
                for (var i in listPlayers) {
                    var highscore_player = listPlayers[i];
                    //var highscore_score = listScores[i];
                    listData += "<tr><td>" + highscore_player['user_name'] + "</td><td>" + highscore_player['user_score'] + "</td></tr>";
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
                $("#scoreList").text(textStatus + " " + errorThrown + jqXHR.responseText);
            }
        });
    });
});

function addPlayer($playerName) {
    var postPlayer = {"user_name" : $playerName, "user_score" : 0};
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
        data: {output: 'json', },
        success: function(data) {
            console.log(data);
            var listSituations = data['situationCount'];
            var situationNum = listSituations[0];
            console.log(situationNum['ID']);
            $situationCount = situationNum['ID'];
            console.log($situationCount);
            return situationNum['ID'];
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
        if ($situationsUsed.length < 15) {
            $pullSituationsX = Math.floor(Math.random() * ($totalWeeks) + 1);
        }
        if (!$situationsUsed.includes($pullSituationsX)) {
            $situationsUsed.push($pullSituationsX);
            numFound = true;
        }
    }
}
//pulls the list of situations from the DB.
function getSituations() {
    pullSituations();
    console.log("Pulling situations: " + $pullSituationsX);
    if ($pullSituationsX == 1) {
        console.log("Pulling 1st set of situations from DB");
        $.ajax({
            url: "./DB/getSituations1.php",
            dataType: "json",
            type: "GET",
            data: {output: 'json', },
            success: function(data) {
                console.log(data);
                $situationList = data['returnSituations'];
                console.log($situationList);
                setSituations();
            }
        });
        $.ajax({
            url: "./DB/getOptions1.php",
            dataType: "json",
            type: "GET",
            data: {output: 'json', },
            success: function(data) {
                console.log(data);
                $optionList = data['returnOptions'];
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
            data: {output: 'json', },
            success: function(data) {
                console.log(data);
                $situationList = data['returnSituations'];
                console.log($situationList);
                setSituations();
            }
        });
        $.ajax({
            url: "./DB/getOptions2.php",
            dataType: "json",
            type: "GET",
            data: {output: 'json', },
            success: function(data) {
                console.log(data);
                $optionList = data['returnOptions'];
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
            data: {output: 'json', },
            success: function(data) {
                console.log(data);
                $situationList = data['returnSituations'];
                console.log($situationList);
                setSituations();
            }
        });
        $.ajax({
            url: "./DB/getOptions3.php",
            dataType: "json",
            type: "GET",
            data: {output: 'json', },
            success: function(data) {
                console.log(data);
                $optionList = data['returnOptions'];
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
            data: {output: 'json', },
            success: function(data) {
                console.log(data);
                $situationList = data['returnSituations'];
                console.log($situationList);
                setSituations();
            }
        });
        $.ajax({
            url: "./DB/getOptions4.php",
            dataType: "json",
            type: "GET",
            data: {output: 'json', },
            success: function(data) {
                console.log(data);
                $optionList = data['returnOptions'];
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
            data: {output: 'json', },
            success: function(data) {
                console.log(data);
                $situationList = data['returnSituations'];
                console.log($situationList);
                setSituations();
            }
        });
    }
}
/*
function getSituations2() {
    console.log("Pulling 2nd set of situations from DB");
    $.ajax({
        url: "./DB/getSituations2.php",
        dataType: "json",
        type: "GET",
        data: {output: 'json', },
        success: function(data) {
            console.log(data);
            $situationList = data['returnSituations'];
            console.log($situationList);
            setSituations();
        }
    });
}
function getSituations3() {
    console.log("Pulling 3rd set of situations from DB");
    $.ajax({
        url: "./DB/getSituations3.php",
        dataType: "json",
        type: "GET",
        data: {output: 'json', },
        success: function(data) {
            console.log(data);
            $situationList = data['returnSituations'];
            console.log($situationList);
            setSituations();
        }
    });
}
function getSituations4() {
    console.log("Pulling 4th set of situations from DB");
    $.ajax({
        url: "./DB/getSituations4.php",
        dataType: "json",
        type: "GET",
        data: {output: 'json', },
        success: function(data) {
            console.log(data);
            $situationList = data['returnSituations'];
            console.log($situationList);
            setSituations();
        }
    });
}
*/
/*
function getOptions1() {
    console.log("Pulling options from DB");
    $.ajax({
        url: "./DB/getOptions1.php",
        dataType: "json",
        type: "GET",
        data: {output: 'json'},
        success: function(data) {
            console.log(data);
            $optionList = data['returnOptions'];
            console.log($optionList);
            setOptions();
        }
    });
}
function getOptions2() {
    console.log("Pulling 2nd set of options from DB");
    $.ajax({
        url: "./DB/getOptions2.php",
        dataType: "json",
        type: "GET",
        data: {output: 'json', },
        success: function(data) {
            console.log(data);
            $optionList = data['returnOptions'];
            console.log($optionList);
            setOptions();
        }
    });
}
function getOptions3() {
    console.log("Pulling 3rd set of options from DB");
    $.ajax({
        url: "./DB/getOptions3.php",
        dataType: "json",
        type: "GET",
        data: {output: 'json', },
        success: function(data) {
            console.log(data);
            $optionList = data['returnOptions'];
            console.log($optionList);
            setOptions();
        }
    })
}
function getOptions4() {
    console.log("Pulling 4th set of options from DB");
    $.ajax({
        url: "./DB/getOptions4.php",
        dataType: "json",
        type: "GET",
        data: {output: 'json', },
        success: function(data) {
            console.log(data);
            $optionList = data['returnOptions'];
            console.log($optionList);
            setOptions();
        }
    });
}
*/
//Sets the 3 situations with the situation and option data from the database.
function setSituations() {
    console.log("Setting situations for week: " + $currentWeek);
    for (var i = 0; i < 3; i++) {
        var currentSituation = $situationList[i];
        situations[i].id = currentSituation['ID'];
        situations[i].title = currentSituation['title'];
        situations[i].description = currentSituation['description'];
        situations[i].imageBanner = "./images/situationBanners/" + currentSituation['imageLink'];
    }
}

function setOptions() {
    for (var i = 0; i < 3; i++) {
        var opt1 = $optionList[0];
        console.log($optionList);
        situations[i].option1.title = opt1['title'];
        situations[i].option1.description = opt1['description'];
        situations[i].option1.difficulty = opt1['difficulty'];
        situations[i].option1.rate = opt1['water_saved'];
        situations[i].option1.reception = opt1['reception_change'];
        situations[i].option1.success = opt1['success_description'];
        situations[i].option1.failure = opt1['failure_description'];
        situations[i].option1.time = opt1['completionTime'];
        situations[i].option1.outcome = opt1['isSuccessful'];
        console.log($optionList);

        var opt2 = $optionList[1];
        situations[i].option2.title = opt2['title'];
        situations[i].option2.description = opt2['description'];
        situations[i].option2.difficulty = opt2['difficulty'];
        situations[i].option2.rate = opt2['water_saved'];
        situations[i].option2.reception = opt2['reception_change'];
        situations[i].option2.success = opt2['success_description'];
        situations[i].option2.failure = opt2['failure_description'];
        situations[i].option2.time = opt2['completionTime'];
        situations[i].option2.outcome = opt2['isSuccessful'];
        console.log($optionList);

        var opt3 = $optionList[2];
        situations[i].option3.title = opt3['title'];
        situations[i].option3.description = opt3['description'];
        situations[i].option3.difficulty = opt3['difficulty'];
        situations[i].option3.rate = opt3['water_saved'];
        situations[i].option3.reception = opt3['reception_change'];
        situations[i].option3.success = opt3['success_description'];
        situations[i].option3.failure = opt3['failure_description'];
        situations[i].option3.time = opt3['completionTime'];
        situations[i].option3.outcome = opt3['isSuccessful'];
        console.log($optionList);
        for (var j = 0; j < 3; j++) {
            $optionList.shift();
        }
    }
}