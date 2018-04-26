var name;
var cityName;
var waterLevel = "<img src='images/waterdrop.png' alt='water'>";
function myFunction() {
    var name = document.getElementById("name").value;
    var cityName = document.getElementById("cityName").value;
    document.getElementById("userName").innerHTML = name;
    document.getElementById("userCity").innerHTML = cityName;
  document.getElementById("waterLevel").innerHTML = waterLevel;
  document.getElementById("map").style.filter = "blur(0px)";
}