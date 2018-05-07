var $name;
var $cityName;
var $totalSituations;
var onLogin = true;

//function for the Play arrow button
function myFunction() {
    onLogin = false;
    $name = document.getElementById("name").value;
    $cityName = document.getElementById("cityName").value;
    //addPlayer($name);
    console.log($totalSituations);
    if($name == "dog" || $name == "Dog"){
        $("#about a").html("<img src='images/dog.jpeg' alt='dog'/>");
        $("#about p").html("bark bark bork bark bark bork bark bark bork bark bark bork bark bark bork bark bark bork bark bark bork bark bark bork bark bark bork bark bark bork bark bark bork bark bark bork bark bark bork bark bark bork bark bark bork bark bark bork bark bark bork.");
    }
    if($name == "cat" || $name == "Cat"){
        $("#about a").html("<img src='images/cat.jpg' alt='cat'/>");
        $("#about p").html("meow meow mew meow meow mew meow meow mew meow meow mew meow meow mew meow meow mew meow meow mew meow meow mew meow meow mew meow meow mew meow meow mew meow meow mew meow meow mew meow meow mew meow meow mew meow meow mew meow meow mew meow meow mew meow meow mew meow meow mew.");
    }
    if (isString($name) == false || hasNum($name) == true || validNameLength($name) == false) {// || hasSpecial($name) == true) {
        alert ("Invalid Name");
    } else if (isString($cityName) == false || hasNum($cityName) == true || validCityLength($cityName) == false ) {//|| hasSpecial($cityName) == true) {
        alert ("Invalid City Name");
    }else {
        document.getElementById("userName").innerHTML = "Mayor " + $name;
        document.getElementById("userCity").innerHTML = $cityName;
        document.getElementById("userDays").innerHTML="63";
        document.getElementById("daysLeft").innerHTML="Days Left"
        document.getElementById("yourScore").innerHTML="Your Score: 0";
       
        document.getElementById("map").style.filter = "blur(0px)";
        document.getElementById("login").style.display = "none";
    }
}

/*Function fot the progressBar 
$(function() {
    $level = 100;
    $("#guy").click(function(){
        $level = $level - 10;
        $(".progress-bar").width($level + '%');
    });
});*/

function resetProgBar() {
    $level = 100;
    $(".progress-bar").width($level + '%');
}

//Function for the About button
$(document).ready(function(){
    getSituationNumber();
  $("#aboutlink").click(function(){
    document.getElementById("about").style.display = "block";
    document.getElementById("login").style.display = "none";
    document.getElementById("gamediv").style.display = "none";
    document.getElementById("scores").style.display = "none";
  });

//Function for the new game button
  $("#newGame").click(function(){
        onLogin = true;
        document.getElementById("about").style.display = "none";
        document.getElementById("gamediv").style.display = "block";
        document.getElementById("map").style.filter = "blur(3px)";
        document.getElementById("login").style.display = "block";
        document.getElementById("userCity").innerHTML = "";
        document.getElementById("userName").innerHTML = "";
        document.getElementById("userDays").innerHTML = "";
        document.getElementById("daysLeft").innerHTML = "";
        document.getElementById("scores").style.display = "none";
        document.getElementById("setNames").reset();
        resetProgBar();
         // Global variables
    var $repeatSituations = [];
    var $summerDays = 60;
    var $weekDays = 7;
    var $barLevel = ($currentWater / $totalWater) * 100;
    var $totalWater = 1248000;
    var $currentWater = $totalWater;
    var $waterUsage = ($totalWater * 1.5) / Math.ceil($summerDays / $weekDays);
    var $cityReception = 50;
    // Tracking variables
    var $waterSaved = 0;
    var $decisionLength = 2;
    
    var $success = false;
    logCityStatus();
        $("#option").css("display", "none");
  });
  $("#optionExit").click(function(){
    $("#option").css("display", "none");
    $("#decision").html("<p id='decisionDescription'><p><button id='option1'></button> <button id='more1'>...</button><p id='description1'></p><button id='option2'></button><button id='more2'>...</button><p id='description2'></p><button id='option3'></button><button id='more3'>...</button><p id='description3'></p><p id='success'></p>");
  });
    $(".toggle").click(function() {
        $("#about").css("display", "none");
        $("#scores").css("display", "none");
        $("#gamediv").css("display", "block");
        if (onLogin) {
          $("#login").css("display", "block");
        } 
        $("#gamediv").fadeOut(10).load("{index.html} #gamediv").fadeIn(10);
    });
});
//series of functions for checking the names entered are valid
function isString(s) {
    return Object.prototype.toString.call(s) === "[object String]";
}
function hasNum(s) {
    return /\d/.test(s);
}
function validCityLength(s) {
    return s.length > 0 && s.length <= 20;
}
function validNameLength(s) {
    return s.length > 0 && s.length <= 20;
}
