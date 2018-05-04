$(document).ready(function(){
    //global variables
    var $barLevel = 100;
    var $waterSaved = 0;
    var $decisionLength = 2;
    var $weekDays = 0;
    var $summerDays = 0;
    var $success = false;
    //option choice

  
        $("#option1").click(function(){
            alert("Water waste reduced by 5% good job!");
            $success = true;
        });
        $("#option2").click(function(){
            alert("Oh no! You're citizens didn't listen, they're still wasting water");
            $success = false;
            $barLevel -= 10 + $waterSaved;
            $(".progress-bar").width($barLevel + '%');
        });
        $("#option3").click(function(){
            alert("Water waste reduced by 5% good job!");
            $success = true;
        });

    //if ($summerDays <= 90 && $barLevel > 0){
        if ($weekDays <= 7){
           if ($success){
               $waterSaved += 1;
           }
           $weekDays += $decisionLength; 
        } else {
            $barLevel -= 10 + $waterSaved;
            $weekDays = 0;
            $summerDays += 7;
            $(".progress-bar").width($barLevel + '%');
        }
    //} else {
    //    alert("Game Over!");
    //}

});