var $name;
var $cityName;
var onLogin = true;
var document;
var $;
var location;

//function for the Play arrow button
function myFunction() {
    "use strict";
    onLogin = false;
    $name = document.getElementById("name").value;
    $cityName = document.getElementById("cityName").value;
    if($name === "dog" || $name === "Dog"){
        $("#about a").html("<img src='images/dog.png' alt='dog'/>");
        $("#about p").html("bark bark bork bark bark bork bark bark"
        + "bork bark bark bork bark bark bork bark bark bork bark bark"
        + "bork bark bark bork bark bark bork bark bark bork bark bark"
        + "bork bark bark bork bark bark bork bark bark bork bark bark"
        + "bork bark bark bork bark bark bork.");
    }
    if($name === "cat" || $name === "Cat"){
        $("#about a").html("<img src='images/cat.png' alt='cat'/>");
        $("#about p").html("meow meow mew meow meow mew meow meow mew"
        + "meow meow mew meow meow mew meow meow mew meow meow mew meow"
        + "meow mew meow meow mew meow meow mew meow meow mew meow meow"
        + "mew meow meow mew meow meow mew meow meow mew meow meow mew"
        + "meow meow mew meow meow mew meow meow mew meow meow mew.");
    }
    if (isString($name) === false || hasNum($name) === true
    || validNameLength($name) === false) {
        alert("Invalid Name");
    } else if (isString($cityName) === false || hasNum($cityName) === true
    || validCityLength($cityName) === false ) {
        alert("Invalid City Name");
    }else {
        $("#startGame").css("display", "block");
        $("#startGame").fadeIn(7000).fadeOut(5000);
        document.getElementById("userName").innerHTML = "Mayor " + $name;
        document.getElementById("userCity").innerHTML = $cityName;
        document.getElementById("userDays").innerHTML="63";
        document.getElementById("daysLeft").innerHTML="Days Left";
        updateScore(0);
        document.getElementById("map").style.filter = "blur(0px)";
        document.getElementById("login").style.display = "none";
    }
}
function resetProgBar() {
    "use strict";
    var $level = 100;
    $(".progress-bar").width($level + "%");
}
$(document).ready(function(){
    $("#startGame").css("display", "none");
    $("#option").css("display", "none");
    $("#help").css("display", "none");
    getSituationNumber();
    //function for help link
    $("#helpLink").click(function(){
       document.getElementById("help").style.display = "block";
       document.getElementById("about").style.display = "none";
       document.getElementById("scores").style.display = "none";
      });
    //Function for the About button
  $("#aboutlink").click(function(){
    $("#help").css("dispaly", "none");
    $("#endGame").css("display", "none");
    document.getElementById("about").style.display = "block";
    document.getElementById("help").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("gamediv").style.display = "none";
    document.getElementById("scores").style.display = "none";
  });
  //x button for end of week message
$("#noDays").click(function(){
    $("#noDays").css("display", "none");
});
//x button for closing help
$("#closeHelp").click(function(){
    $("#help").css("display", "none");
    $("#help h2").html("Congratulations!");
    $("#help p").html("You’ve just been elected Mayor! "
    + "But water use doubles over the summer, and the dry "
    + "season lasts for 63 days!</br> Can you make the city’s water last?");
    $("#helpimg").attr("src", "images/elections.png");
    $helpClick = 0;
});
//Function for the new game button
  $("#newGame").click(function(){
      location.reload();
  });
  //function for the back arrow from the option card
  $("#optionExit").click(function(){
    $("#option").css("display", "none");
    $("#option").css("height", "330px");
    $("#decision").html("<p id='decisionDescription'></p>"
    + "<button id='option1' class='optionButton'></button>"
    + "<button id='more1' class='moreButton'>...</button><br>"
    + "<p id='description1'></p><button id='option2' class='optionButton'>"
    + "</button><button id='more2' class='moreButton'>...</button><br>"
    + "<p id='description2'></p><button id='option3' class='optionButton'>"
    + "</button><button id='more3' class='moreButton'>...</button><br>"
    + "<p id='description3'></p><p id='success'></p>");
    var decisionCheck = noDecisionsLeft();
            if ($weekDays <= 0 || $numOfEvents <= 0 || decisionCheck) {
                endTurn();
            }
    var decisionCheck = noDecisionsLeft();
    if(decisionCheck) {
        $("#noDays").css("display", "block");
        endTurn();
    } else if ($weekDays <= 0 || $numOfEvents <= 0) {
        endTurn();
    }
  });
    //function for the back arrow in about me and scores pages
    $(".toggle").click(function() {
        $("#about").css("display", "none");
        $("#scores").css("display", "none");
        $("#gamediv").css("display", "block");
        $("#startGame").css("display", "none");
        $("noDays").css("display", "none");
        if (onLogin) {
          $("#login").css("display", "block");
        }
        if (gameOver) {
            $("#endGame").css("display", "block");
        }
        $("#gamediv").fadeOut(10).load("{index.html} #gamediv").fadeIn(10);
    });
    $helpClick = 0;
    function help(){
        if ($helpClick === 0){
            $("#help h2").html("Reception:");
            $("#help p").html("Keep your citizens happy! Generous "
            + "decisions will keep your populace motivated!"
            +"<ul><li>When your citizens like your decision,"
            + " their reception increases</li>"
            + "<li>High reception increases the chances that "
            + "extreme decisions you make will succeed</li></ul>");
            $("#helpimg").attr("src",
            "images/receptionTracking/HighReception.png");
            $helpClick ++;
        } else  if ($helpClick === 1){
            $("#help h2").html("Reservoir:");
            $("#help p").html("The water in your reservoir decreases"
            + " each week at a fixed rate, which represents your"
            + " citizen’s water consumption."
            + "<ul><li>Make smart decisions to lower the rate of your "
            + "citizen’s water consumption</li></ul>");
            $("#helpimg").attr("src", "images/waterDrop.png");
            $helpClick ++;
        } else if ($helpClick === 2){
            $("#help h2").html("Decisions:");
            $("#help p").html("Your decisions can affect your "
            + "citizen’s reception and the rate of your "
            + "citizen’s water consumption."
            +"<ul><li>Each decision can lower or raise "
            + "your citizen’s reception</li>"
            +"<li>Each decision saves a certain amount "
            + "of water when it succeeds</li></ul>");
            $("#helpimg").attr("src",
            "images/decision.png");
            $helpClick ++;
        } else if ($helpClick === 3){
            $("#help h2").html("Weeks:");
            $("#help p").html("Each week you’ll have 3 decisions "
            + "you can make. Each choice takes some time to complete."
            + "<ul><li>Each choice you make will take a certain "
            + "number of days!</li>"
            + "<li>If no decisions are available, "
            + "the week will end. </li></ul>");
            $("#helpimg").attr("src",
            "images/calendarTracking/Calendar.png");
            $helpClick ++;
        } else if ($helpClick === 4){
            $("#help h2").html("Districts:");
            $("#help p").html("When a water droplet appears over "
            + "a district this means there is a decision to be made!"
            +"<ul><li>Droplets will disappear if all decisions in "
            + "the district take too much time. </li></ul>");
            $("#helpimg").attr("src", "images/district.png");
            $helpClick = 0;
        }
    }
    $("#forward").click(function(){
        help();
    });
    $("#helpBack").click(function(){
        if ($helpClick === 1){
            $("#help h2").html("Reception:");
            $("#help p").html("Keep your citizens happy! Generous "
            + "decisions will keep your populace motivated!"
            +"<ul><li>When your citizens like your decision, "
            + "their reception increases</li>"
            +"<li>High reception increases the chances that "
            + "extreme decisions you make will succeed</li></ul>");
            $("#helpimg").attr("src",
            "images/receptionTracking/HighReception.png");
            $helpClick = 0;
        } else  if ($helpClick === 2){
            $("#help h2").html("Reservoir:");
            $("#help p").html("The water in your reservoir "
            + "decreases each week at a fixed rate, which represents "
            + "your citizen’s water consumption."
            +"<ul><li>Make smart decisions to lower the rate of your "
            + "citizen’s water consumption</li></ul>");
            $("#helpimg").attr("src", "images/waterDrop.png");
            $helpClick = 1;
        } else if ($helpClick === 3){
            $("#help h2").html("Decisions:");
            $("#help p").html("Your decisions can affect your "
            + "citizen’s reception and the rate of your citizen’s "
            + "water consumption."
            +"<ul><li>Each decision can lower or raise your "
            + "citizen’s reception</li>"
            +"<li>Each decision saves a certain amount of water "
            + "when it succeeds</li></ul>");
            $("#helpimg").attr("src", "images/decision.png");
            $helpClick = 2;
        } else if ($helpClick === 4){
            $("#help h2").html("Weeks:");
            $("#help p").html("Each week you’ll have 3 decisions "
            + "you can make. Each choice takes some time to complete."
            + "<ul><li>Each choice you make will take a certain "
            + "number of days!</li>"
            + "<li>If no decisions are available, the week "
            + "will end. </li></ul>");
            $("#helpimg").attr("src", "images/calendarTracking/Calendar.png");
            $helpClick = 3;
        } else if ($helpClick === 0){
            $("#help h2").html("Districts:");
            $("#help p").html("When a water droplet appears over a "
            + "district this means there is a decision to be made!"
            +"<ul><li>Droplets will disappear if all decisions in "
            + "the district take too much time. </li></ul>");
            $("#helpimg").attr("src", "images/district.png");
            $helpClick = 4;
        }
    });
});
//series of functions for checking the names entered are valid
function isString(s) {
    "use strict";
    return Object.prototype.toString.call(s) === "[object String]";
}
function hasNum(s) {
    "use strict";
    return /\d/.test(s);
}
function validCityLength(s) {
    "use strict";
    return s.length > 0 && s.length <= 20;
}
function validNameLength(s) {
    "use strict";
    return s.length > 0 && s.length <= 20;
}