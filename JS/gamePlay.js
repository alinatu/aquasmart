$(document).ready(function(){
    // Global variables
    var $repeatSituations = [];
    var $summerDays = 63;
    var $weekDays = 5;
    var $totalWater = 1248000;
    var $waterUsage = ($totalWater * 1.5) / Math.ceil($summerDays / $weekDays);
    // var $cityReception = 50;
    // Tracking variables
    var $waterSaved = 0;
    var $decisionLength = 2;
    var $currentWater = $totalWater;
    var $barLevel = ($currentWater / $totalWater) * 100;
    
    var $success = false;
    
    logCityStatus();
    //option choice
        
        $("#option1").click(function(){
            // This is a prototype of what each option should calculate
            alert("Water waste reduced by 2% (" + ($waterUsage * 0.02) + " gallons per week)!");
            console.log("This decision took " + 2 + " days to complete.");
            $weekDays -= 2;
            $waterUsage -= ($waterUsage * 0.02);
            $waterSaved += ($waterUsage * 0.02);
            console.log("You have " + $weekDays + " days left to make decisions");
            $success = true;
        });
        $("#option2").click(function(){
            alert("Oh no! You're citizens didn't listen, they're still wasting water");
            $success = false;
            endTurn();
        });
        $("#option3").click(function(){
            alert("Water waste reduced by 5% (" + ($waterUsage * 0.05) + " gallons per week)!");
            console.log("This decision took " + 5 + " days to complete");
            $weekDays -= 5;
            $waterUsage -= ($waterUsage * 0.05);
            $waterSaved += ($waterUsage * 0.05);
            console.log("You have " + $weekDays + " days left to make decisions");
            $success = true;
        });

    //while ($summerDays >= 0 || $currentWater >= 0) {
        if ($weekDays <= 7) {
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
    //}

    // Resets day count and decrements reservoir and days remaining
    function endTurn() {
        $weekDays = 7;
        $summerDays -= $weekDays;
        $currentWater -= $waterUsage;
        $barLevel = ($currentWater / $totalWater) * 100;
        $(".progress-bar").width($barLevel + '%');
        $("#userDays").html($summerDays);
        logCityStatus();
        randomSituations();
    }
    
    // Rolls for a situation ID. Does not accept ID's that have been rolled before
    // Returns an array of three values
    function randomSituations() {

        var numFound = false;
        var roll;
        var threeValues = [];
        for (let i = 0; i < 3; i++) {
            numFound = false;
            while (!numFound) {

            // Checks if unique ID's have been found.
            if ($repeatSituations.length < 26) {
                // Random number between 1 and number of situations
                roll = Math.floor(Math.random() * (26) + 1);
            } else {
                console.log("No more unique ID's");
                break;
            }
            if (!$repeatSituations.includes(roll)) {
                $repeatSituations.push(roll);
                threeValues.push(roll);
                console.log(roll);
                numFound = true;
            }
            }
        }
        return threeValues;
    }

    // Logs all variables to the console. Used for score and status tracking
    function logCityStatus() {
        console.log($summerDays + " days left in summer!");
        console.log("You have " + $currentWater + " gallons in your reservoir.");
        console.log("Your city uses " + $waterUsage + " gallons per week.");
        console.log("You have saved " + $waterSaved + " gallons so far!");
    }

    
});

function optionChosen() {
    
}


