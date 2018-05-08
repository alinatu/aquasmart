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
        success : " Way to go!",
        failure : "Your citizens weren't a fan of your changes.",
        time : 2,
        outcome : 1,
        
    },
    option2 : {
        title : "ban toothbrushes",
        description : "blah blah",
        difficulty : 20,
        rate : 5,
        reception : 20,
        success : "good job",
        failure : "Your citizens weren't a fan of your changes.",
        time : 3,
        outcome : 0,
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
    }
};
 function optionChosen1() {
    $("#option").css("height", "280px");
    var waterRate = (situation1.option1.rate / 100);
    if (situation1.option1.outcome == 1) {
        $("#decision").html("Water waste reduced by " + situation1.option1.rate + "% (" + ($waterUsage * (situation1.option1.rate / 100)) + " gallons per week)!" + situation1.option1.success);
    } else if (situation1.option1.outcome == 0) {
        $("#decision").html(situation1.option1.failure);
    }
    console.log("This decision took " + situation1.option1.time + " days to complete.");
    $weekDays -= situation1.option1.time;
    $waterUsage -= ($waterUsage * (situation1.option1.rate / 100));
    $waterSaved += ($waterUsage * (situation1.option1.rate / 100));
    console.log("You have " + $weekDays + " days left to make decisions");
    updateScore();
}
function optionChosen2() {
    $("#option").css("height", "280px");
    var waterRate = (situation1.option2.rate / 100);
    if (situation1.option2.outcome == 1) {
        $("#decision").html("Water waste reduced by " + situation1.option2.rate + "% (" + ($waterUsage * (situation1.option2.rate / 100)) + " gallons per week)!" + situation1.option2.success);
    } else if (situation1.option2.outcome == 0) {
        $("#decision").html(situation1.option2.failure);
    }
    console.log("This decision took " + situation1.option2.time + " days to complete.");
    $weekDays -= situation1.option2.time;
    $waterUsage -= ($waterUsage * (situation1.option2.rate / 100));
    $waterSaved += ($waterUsage * (situation1.option2.rate / 100));
    console.log("You have " + $weekDays + " days left to make decisions");
    updateScore();
}
function optionChosen3() {
    $("#option").css("height", "280px");
    var waterRate = (situation1.option3.rate / 100);
    if (situation1.option3.outcome == 1) {
        $("#decision").html("Water waste reduced by " + situation1.option3.rate + "% (" + ($waterUsage * (situation1.option3.rate / 100)) + " gallons per week)!" + situation1.option3.success);
    } else if (situation1.option3.outcome == 0) {
        $("#decision").html(situation1.option3.failure);
    }
    console.log("This decision took " + situation1.option3.time + " days to complete.");
    $weekDays -= situation1.option3.time;
    $waterUsage -= ($waterUsage * (situation1.option3.rate / 100));
    $waterSaved += ($waterUsage * (situation1.option3.rate / 100));
    console.log("You have " + $weekDays + " days left to make decisions");
    updateScore();
}
function setDecision(){
    // Setup div contents
    $("#opimg").attr("src", situation1.imageBanner);
    $("#option h3").html(situation1.title);
    $("#decisionDescription").html(situation1.description);

    // Setup button 1
    $("#option1").html(situation1.option1.title);
    $("#option1").click(optionChosen1);
    $("#description1").html(situation1.option1.description);

    //Setup button 2
    $("#option2").html(situation1.option2.title);
    $("#option2").click(optionChosen2);
    $("#description2").html(situation1.option2.description);
    
    //Setup button 3
    $("#option3").html(situation1.option3.title);
    $("#option3").click(optionChosen3);
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
        

        $("#option1").click(optionChosen1);
        $("#option2").click(optionChosen2);
        $("#option3").click(optionChosen3);


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

        if($summerDays == 0){
            document.getElementById("endGame").style.display = "block";
            document.getElementById("about").style.display = "none";
            document.getElementById("login").style.display = "none";
            document.getElementById("map").style.filter = "blur(3px)";
            document.getElementById("scores").style.display = "none";
            document.getElementById("option").style.display = "none";
        }
        setDecision();
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

