var name;
var cityName;
function myFunction() {
    var name = document.getElementById("name").value;
    var cityName = document.getElementById("cityName").value;
    document.getElementById("userName").innerHTML = name;
    document.getElementById("userCity").innerHTML = cityName;
}