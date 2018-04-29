var $name;
var $cityName;
var $waterLevel = "<img src='images/waterdrop.png' alt='water'>";
//function for the Play arrow button
function myFunction() {
    $name = document.getElementById("name").value;
    $cityName = document.getElementById("cityName").value;
    if (isString($name) == false || hasNum($name) == true || validNameLength($name) == false) {// || hasSpecial($name) == true) {
        alert ("Invalid Name");
    } else if (isString($cityName) == false || hasNum($cityName) == true || validCityLength($cityName) == false ) {//|| hasSpecial($cityName) == true) {
        alert ("Invalid City Name");
    } else {
        document.getElementById("userName").innerHTML = "Mayor " + $name;
        document.getElementById("userCity").innerHTML = $cityName;
        document.getElementById("waterLevel").innerHTML = $waterLevel;
        document.getElementById("map").style.filter = "blur(0px)";
        document.getElementById("login").style.display = "none";
    }
}
//Function for the About button
$(document).ready(function(){
  $("#aboutdiv").click(function(){
    document.getElementById("about").style.display = "block";
    document.getElementById("login").style.display = "none";

    document.getElementById("gamediv").style.display = "none";
  });
});
//Function for the new game button
$(document).ready(function(){
    $("#newGameDiv").click(function(){
        document.getElementById("about").style.display = "none";
        document.getElementById("gamediv").style.display = "block";
        document.getElementById("map").style.filter = "blur(3px)";
        document.getElementById("login").style.display = "block";
        document.getElementById("userCity").innerHTML = "";
        document.getElementById("userName").innerHTML = "";
        document.getElementById("waterLevel").innerHTML = "";
        document.getElementById("setNames").reset();
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

/*
function hasSpecial(s) {
    return /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(s);
}
*/
