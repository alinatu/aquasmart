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
//pulls the list of situations from the DB.
function getSituations1() {
    console.log("Pulling situations from DB");
    $.ajax({
        url: "./DB/getSituations1.php",
        dataType: "json",
        type: "GET",
        data: {output: 'json', },
        success: function(data) {
            console.log(data);
            $situationList1 = data['returnSituations'];
            console.log($situationList1);
            setSituations();
        }
    });
}
function getSituations2() {
    console.log("Pulling 2nd set of situations from DB");
    $.ajax({
        url: "./DB/getSituations2.php",
        dataType: "json",
        type: "GET",
        data: {output: 'json', },
        success: function(data) {
            console.log(data);
            $situationList1 = data['returnSituations'];
            console.log($situationList);
        }
    });
}
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
//Sets the 3 situations with the situation and option data from the database.
function setSituations() {
    for (var i = 0; i < 3; i++) {
        var currentSituation = $situationList1[i];
        situations[i].id = currentSituation['ID'];
        situations[i].title = currentSituation['title'];
        situations[i].description = currentSituation['description'];
        situations[i].imageBanner = "./images/situationBanners/" + currentSituation['imageLink'];
    }
}
function setOption1() {
    var currentOption = $optionList[0];
    situations[0].option1.title = currentOption['title'];
    situations[0].option1.description = currentOption['description'];
    situations[0].option1.difficulty = currentOption['difficulty'];
    situations[0].option1.rate = currentOption['water_saved'];
    situations[0].option1.reception = currentOption['reception_change'];
    situations[0].option1.success = currentOption['success_description'];
    situations[0].option1.failure = currentOption['failure_description'];
    situations[0].option1.time = currentOption['completionTime'];
    situations[0].option1.outcome = currentOption['isSuccessful'];
}
function setOption2() {
    var currentOption = $optionList[1];
    situations[0].option2.title = currentOption['title'];
    situations[0].option2.description = currentOption['description'];
    situations[0].option2.difficulty = currentOption['difficulty'];
    situations[0].option2.rate = currentOption['water_saved'];
    situations[0].option2.reception = currentOption['reception_change'];
    situations[0].option2.success = currentOption['success_description'];
    situations[0].option2.failure = currentOption['failure_description'];
    situations[0].option2.time = currentOption['completionTime'];
    situations[0].option2.outcome = currentOption['isSuccessful'];
}
function setOption3() {
    var currentOption = $optionList[2];
    situations[0].option3.title = currentOption['title'];
    situations[0].option3.description = currentOption['description'];
    situations[0].option3.difficulty = currentOption['difficulty'];
    situations[0].option3.rate = currentOption['water_saved'];
    situations[0].option3.reception = currentOption['reception_change'];
    situations[0].option3.success = currentOption['success_description'];
    situations[0].option3.failure = currentOption['failure_description'];
    situations[0].option3.time = currentOption['completionTime'];
    situations[0].option3.outcome = currentOption['isSuccessful'];
}
function setOptions() {
    for (var i = 0; i < 3; i++) {
        var opt1 = $optionList[0];
        situations[i].option1.title = opt1['title'];
        situations[i].option1.description = opt1['description'];
        situations[i].option1.difficulty = opt1['difficulty'];
        situations[i].option1.rate = opt1['water_saved'];
        situations[i].option1.reception = opt1['reception_change'];
        situations[i].option1.success = opt1['success_description'];
        situations[i].option1.failure = opt1['failure_description'];
        situations[i].option1.time = opt1['completionTime'];
        situations[i].option1.outcome = opt1['isSuccessful'];

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
    }
}