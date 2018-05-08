// Global variables
var $repeatSituations = [];
var $summerDays = 63;
var $weekDays = 5;
var $totalWater = 1248000;
var $waterUsage = ($totalWater * 1.5) / Math.ceil($summerDays / ($weekDays + 2));
// Tracking variables
var $cityReception = 50;
var $waterSaved = 0;
var $decisionLength = 2;
var $currentWater = $totalWater;
var $barLevel = ($currentWater / $totalWater) * 100;
var $success = false;

//option variables
var situation1 = {
    id : 0,
    title : "Water Wasted Brushing teeth",
    description : "Your citizens are always leaving the sink on while they brush their teeth. This wastes HUGE amounts of water. What will you do about it?",
    imageBanner : "./images/situationBanners/toothbrush.png",
    option1 : {
        title : "create an ad campaign",
        description : "blah blah",
        difficulty : 5,
        rate : 2,
        reception : 20,
        success : "",
        failure : "Your citizens weren't a fan of your changes.",
        time : 2,
        outcome : 1,
        optionChosen : function() {
            var waterRate = (this.rate / 100);
            if (this.outcome == 1) {
                $("#decision").html("Water waste reduced by " + this.rate + "% (" + ($waterUsage * (this.rate / 100)) + " gallons per week)");
            } else if (this.outcome == 0) {
                $("#decision").html(this.failure);
            }
            console.log("This decision took " + this.time + " days to complete.");
            $weekDays -= this.time;
            $waterUsage -= ($waterUsage * (this.rate / 100));
            $waterSaved += ($waterUsage * (this.rate / 100));
            console.log("You have " + $weekDays + " days left to make decisions");
            updateScore();
        }
    },
    option2 : {
        title : "ban toothbrushes",
        description : "blah blah",
        difficulty : 20,
        rate : 5,
        reception : 20,
        success : "Water waste reduced by " + this.rate + "% (" + ($waterUsage * (this.rate / 100)) + " gallons per week)!",
        failure : "Your citizens weren't a fan of your changes.",
        time : 3,
        outcome : 0,
        optionChosen : function() {
            var waterRate = (this.rate / 100);
            if (this.outcome == 1) {
                $("#decision").html(this.success);
            } else if (this.outcome == 0) {
                $("#decision").html(this.failure);
                $cityReception -= this.reception;
            }
            console.log("This decision took " + this.time + " days to complete.");
            $weekDays -= this.time;
            $waterUsage -= ($waterUsage * (this.rate / 100));
            $waterSaved += ($waterUsage * (this.rate / 100));
            console.log("You have " + $weekDays + " days left to make decisions");
            updateScore();
        }
    },
    option3 : {
        title : "Offer a refund on waterwise taps",
        description : "blah blah",
        difficulty : 10,
        rate : 7,
        reception : 20,
        success : "",
        failure : "",
        time : 5,
        outcome : 1,
        optionChosen : function() {
            var waterRate = (this.rate / 100);
            if (this.outcome == 1) {
                $("#decision").html("Water waste reduced by " + this.rate + "% (" + ($waterUsage * (this.rate / 100)) + " gallons per week)!");
            } else if (this.outcome == 0) {
                $("#decision").html("Your citizens weren't a fan of your changes.");
            }
            console.log("This decision took " + this.time + " days to complete.");
            $weekDays -= this.time;
            $waterUsage -= ($waterUsage * (this.rate / 100));
            $waterSaved += ($waterUsage * (this.rate / 100));
            console.log("You have " + $weekDays + " days left to make decisions");
            updateScore();
        }
    }
};

function setDecision(){
    // Setup div contents
    $("#opimg").attr("src", situation1.imageBanner);
    $("#option h3").html(situation1.title);
    $("#decisionDescription").html(situation1.description);

    // Setup button 1
    $("#option1").html(situation1.option1.title);
    $("#option1").click(situation1.option1.optionChosen);
    $("#description1").html(situation1.option1.description);

    //Setup button 2
    $("#option2").html(situation1.option2.title);

    $("#description2").html(situation1.option2.description);
    
    //Setup button 3
    $("#option3").html(situation1.option3.title);
    $("#description3").html(situation1.option3.description);
}

$(document).ready(function(){
    
    //dropowns for options
    var $more1 = false;
    $("#more1").click(function(){
        if ($more1 == false){
            $("#description1").show();
            $more1 = true;
        } else{
            $("#description1").hide();
            $more1 = false;
        }
    });
    var $more2 = false;
    $("#more2").click(function(){
        if ($more2 == false){
            $("#description2").show();
            $more2 = true;
        } else{
            $("#description2").hide();
            $more2 = false;
        }
    });
    var $more3 = false;
    $("#more3").click(function(){
        if ($more3 == false){
            $("#description3").show();
            $more3 = true;
        } else{
            $("#description3").hide();
            $more3 = false;
        }
    });


    
    logCityStatus();
    //option choice
        
        $("#option1").click(situation1.option1.optionChosen);
        $("#option2").click(function(){
            $("#decision").html("Oh no! You're citizens didn't listen, they're still wasting water");
            $success = false;
            endTurn();
        });
        $("#option3").click(function(){
            $("#decision").html("Water waste reduced by 5% (" + ($waterUsage * 0.05) + " gallons per week)!");
            console.log("This decision took " + 5 + " days to complete");
            $weekDays -= 5;
            $waterUsage -= ($waterUsage * 0.05);
            $waterSaved += ($waterUsage * 0.05);
            console.log("You have " + $weekDays + " days left to make decisions");
            $success = true;
        });

    //while ($summerDays >= 0 || $currentWater >= 0) {
    /*    if ($weekDays <= 7) {
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
    //} */

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
            if ($repeatSituations.length < 24) {
                // Random number between 1 and number of situations
                roll = Math.floor(Math.random() * (24) + 1);
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

function updateScore() {
    var receptionModifier = ($cityReception / 100) + 1;
    var playerScore = ($waterSaved * receptionModifier);

    if ($currentWater <= 0) {
        playerScore /= 2;
    }
    playerScore = Math.round(playerScore);
    console.log("Your score is " + playerScore);
    $("#yourScore").html("Your Score: " + playerScore);
}


