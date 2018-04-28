var $name;
var $cityName;
var $waterLevel = "<img src='images/waterdrop.png' alt='water'>";
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
$(document).ready(function(){
  $("#aboutdiv").click(function(){
    document.getElementById("about").style.display = "block";
    document.getElementById("login").style.display = "none";
    document.getElementById("gamediv").style.display = "none";
  });
});

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