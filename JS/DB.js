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
            $totalSituations = situationNum['ID'];
            console.log($totalSituations);
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
function getSituations() {
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
        }
    });
}
function getOptions() {
    console.log("Pulling options from DB");
    $.ajax({
        url: "./DB/getOptions.php",
        dataType: "json",
        type: "GET",
        data: {output: 'json'},
        success: function(data) {
            console.log(data);
            $optionList1 = data['returnOptions'];
            console.log($optionList1);
        }
    });
}
//Sets the 3 situations with the situation and option data from the database.
function setSituations(sit1, sit2, sit3) {
    for (var i = 0; i < 3; i++) {
        var currentSituation = $situationList1[i];
        situations[i].id = currentSituation['ID'];
        situations[i].title = currentSituation['title'];
        situations[i].description = currentSituation['description'];
        situations[i].imageBanner = "./images/situationBanners/" + currentSituation['imageLink'];

    }
}
