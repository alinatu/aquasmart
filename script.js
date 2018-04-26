$name = document.getElementById("#name").innerHTML;
$cityName = document.getElementById("#cityName").innerHTML;
$("#submit").click(function(){
    document.getElementById("#userName").innerHTML = $name;
    document.getElementById("#userCity").innerHTML = $cityName;
});