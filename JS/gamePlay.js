// Global variables
var $chosen = false;
var $repeatSituations = [];
var $summerDays = 63;
var $weekDays = 7;
var $totalWater = 1248000;
var $waterUsage = ($totalWater * 1.5) / Math.ceil($summerDays / $weekDays);
// Tracking variables
var $cityReception = 50;
var $waterSaved = 0;
var $numOfEvents = 3;
var $currentWater = $totalWater;
var $barLevel = ($currentWater / $totalWater) * 100;
var $success = false;

//option variables
var situations = { 0: {
    id : 0,
    title : "Tooth brushes",
    description : "Your citizens are brushing their teeth. What a bunch of jerks.",
    imageBanner : "./images/situationBanners/toothbrush.png",
    option1 : {
        title : "Create an ad campaign to educate. ",
        description : "Leaving the faucet running wastes 6 litres of treated water per minute. Simply communicating this fact may be enough to make people change their habits! ",
        difficulty : 5,
        rate : 3,
        reception : 20,
        success : "After seeing the facts, your citizens understood the change, and are making adjustments to their habits. ",
        failure : "Despite the good intentions, your citizens were unreceptive to the changes. If only they understood how much little changes go a long way... ",
        time : 3,
        outcome : 1,
        
    },
    option2 : {
        title : "Ban toothbrushes! ",
        description : "If citizens are wasting water brushing their teeth, then outlawing the use of toothbrushes will solve the issue... Right? ",
        difficulty : 20,
        rate : 1,
        reception : 20,
        success : "Wait, that worked? I guess your citizens trust you quite a bit. We're seeing a decrease in overall water usage. ",
        failure : "Why did we let you go through with this? Nobody is happy with this change, and receptiveness has plummeted! ",
        time : 2,
        outcome : 0,
    },
    option3 : {
        title : "Offer a refund on waterwise taps",
        description : "Faucets with sensors are capable of controlling the amount of water dispensed. Offering an incentive for citizens to upgrade is a good move. ",
        difficulty : 10,
        rate : 7,
        reception : 20,
        success : "You decided to offer refunds to all citizens who upgrade their faucets. This was a great water saving move, and also increased receptiveness! ",
        failure : "",
        time : 1,
        outcome : 1,
    },
    chosen : false
}, 1: {
    id : 1,
    title : "Excessive Lawn Watering",
    description : "Everyone loves a green lawn... However, using treated drinking water to keep a lawn green is an excessive waste. Surely there's something we can do.",
    imageBanner : "./images/situationBanners/situationimage1.png",
    option1 : {
        title : "Regulate water usage for lawns",
        description : "blah blah",
        difficulty : 5,
        rate : 5,
        reception : 20,
        success : " Way to go!",
        failure : "Your citizens weren't a fan of your changes.",
        time : 1,
        outcome : 1,
        
    },
    option2 : {
        title : "Promote the use of synthetic turf ",
        description : "blah blah",
        difficulty : 15,
        rate : 7,
        reception : 20,
        success : "good job",
        failure : "Your citizens weren't a fan of your changes.",
        time : 6,
        outcome : 0,
    },
    option3 : {
        title : "Ban toothbrushes! ",
        description : "blah blah",
        difficulty : 20,
        rate : 1,
        reception : 20,
        success : "",
        failure : "",
        time : 1,
        outcome : 0,
    },
    chosen : false
}, 2: {
    id : 2,
    title : "Eco-Friendly Gardens",
    description : "Many residents take pride in their beautiful gardens, but the upkeep of these gardens is strenuous on our water supply",
    imageBanner : "./images/situationBanners/situationimage2.png",
    option1 : {
        title : "Promote water-wise garden design",
        description : "blah blah",
        difficulty : 5,
        rate : 2,
        reception : 40,
        success : " Way to go!",
        failure : "Your citizens weren't a fan of your changes.",
        time : 5,
        outcome : 1,
        
    },
    option2 : {
        title : "Advertise water-wise garden equipment",
        description : "blah blah",
        difficulty : 10,
        rate : 5,
        reception : 10,
        success : "They like that lots woo",
        failure : "Your citizens weren't a fan of your changes.",
        time : 2,
        outcome : 1,
    },
    option3 : {
        title : "Replace plants with plastic props",
        description : "",
        difficulty : 20,
        rate : 4,
        reception : 20,
        success : "",
        failure : "Your citizens are apalled at your actions. Large plastic plants now fill the town, giving it a very fake feel.",
        time : 5,
        outcome : 0,
    },
    chosen : false
}
};

$(document).ready(function(){
    logCityStatus();
});

function optionChosen(x, y) {
    return function(){
        $("#option").css("height", "230px");
        if (x.time > $weekDays) {
            $("#decision").html("You don't have enough days in the week to make this change... You'll have to choose another.");
        } else {
            var waterRate = (x.rate / 100);
            if (x.outcome == 1) {
                $("#decision").html(x.success + "Water waste reduced by " + x.rate + "% (" 
                    + Math.round(($waterUsage * (x.rate / 100))) + " gallons per week)!");
            } else if (x.outcome == 0) {
                $("#decision").html(x.failure + " Despite this, water waste has still been reduced by " 
                    + x.rate + "% (" + Math.round(($waterUsage * (x.rate / 100))) + " gallons per week), but at what cost?");
            }
            console.log("This decision took " + x.time + " days to complete.");
            $weekDays -= x.time;
            $waterUsage -= ($waterUsage * (x.rate / 100));
            $waterSaved += ($waterUsage * (x.rate / 100));
            console.log("You have " + $weekDays + " days left to make decisions");
            updateScore();
            y.chosen = true;
            var decisionCheck = noDecisionsLeft();
            $numOfEvents--;
            
            if ($weekDays <= 0 || $numOfEvents <= 0 || decisionCheck) {
                
                endTurn();
              
            } /* else if (decisionCheck && !$("#option").css('display') == 'block') {

            }*/
        }
    };
}

function noDecisionsLeft() {
        var counter = 0;
        var noDecisions = false;
        for (let i = 0; i < 3; i++) {
            // True if all options cannot be selected
            if (situations[i].chosen == true){
                counter++;
            } else if (situations[i].chosen == false){
                if (situations[i].option1.time > $weekDays
                && situations[i].option2.time > $weekDays
                && situations[i].option3.time > $weekDays) {
                    counter++;
                }
            }
        }
        // If all three situations does not have options to select...
        if (counter == 3) {
            $("#noDays").css("display", "block");
            noDecisions = true;
        }
        return noDecisions;
}

function setDecision(x){
    // Setup div contents
    $("#opimg").attr("src", situations[x].imageBanner);
    $("#option h4").html(situations[x].title);
    $("#option").css("dispay", "block");
    $("#option").css("margin-top", "-100px");
    $("#decisionDescription").html(situations[x].description);
    $("#startGame").css("display", "none");

    // Setup button 1
    $("#option1").html(situations[x].option1.title);
    $("#option1").click(optionChosen(situations[x].option1, situations[x]));
    $("#description1").html(situations[x].option1.description);
    $("#more1").prepend(situations[x].option1.time + " Days<br>");

    //Setup button 2
    $("#option2").html(situations[x].option2.title);
    $("#option2").click(optionChosen(situations[x].option2, situations[x]));
    $("#description2").html(situations[x].option2.description);
    $("#more2").prepend(situations[x].option2.time + " Days<br>");
    
    //Setup button 3
    $("#option3").html(situations[x].option3.title);
    $("#option3").click(optionChosen(situations[x].option3, situations[x]));
    $("#description3").html(situations[x].option3.description);
    $("#more3").prepend(situations[x].option3.time + " Days<br>");


}
function resetDecision(){
    $("#option").css("display", "none");
    $("#option").css("height", "330px");
    $("#decision").html("<p id='decisionDescription'></p><button id='option1' class='optionButton'></button><button id='more1' class='moreButton'>...</button><br><p id='description1'></p><button id='option2' class='optionButton'></button><button id='more2' class='moreButton'>...</button><br><p id='description2'></p><button id='option3' class='optionButton'></button><button id='more3' class='moreButton'>...</button><br><p id='description3'></p><p id='success'></p>");
}

 //dropowns for options
 function setDropDowns(){
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
 }

function updateScore() {
    var receptionModifier = ($cityReception / 100) + 1;

    $playerScore = ($waterSaved * receptionModifier);
    if ($currentWater <= 0) {
        $playerScore /= 2;
    }
    $playerScore = Math.round($playerScore);
    console.log("Your score is " + $playerScore);
    $("#yourScore").html('Your score: ');
    $("#yourScore").append($playerScore);
}

function endTurn() {
    $numOfEvents = 3;
    $weekDays = 7;
    $summerDays -= $weekDays;
    $currentWater -= $waterUsage;
    $barLevel = ($currentWater / $totalWater) * 100;
    $(".progress-bar").width($barLevel + '%');
    $("#userDays").html($summerDays);
    logCityStatus();
    randomSituations();
    situations[0].chosen = false;
    situations[1].chosen = false;
    situations[2].chosen = false;
    
    endGame();
    //setDecision();

}
function endGame(){
    var decisionCheck = noDecisionsLeft();
    $("#noDays").css("display", "none");
    var desc = "I scored " + $playerScore + "playing Aqua Smart!";
    $("meta[property='og:title']").attr("content", desc);
    if ($currentWater <= 0 || $summerDays <= 0 && $currentWater <= 0){
        $("#youWin").css("display", "none");
        document.getElementById("endGame").style.display = "block";
        document.getElementById("about").style.display = "none";
        document.getElementById("login").style.display = "none";
        document.getElementById("map").style.filter = "blur(3px)";
        document.getElementById("scores").style.display = "none";
        document.getElementById("option").style.display = "none";
    } else if($summerDays <= 0 || $summerDays <= 7 && decisionCheck){
        $("#youLose").css("display", "none");
        document.getElementById("endGame").style.display = "block";
        document.getElementById("about").style.display = "none";
        document.getElementById("login").style.display = "none";
        document.getElementById("map").style.filter = "blur(3px)";
        document.getElementById("scores").style.display = "none";
        document.getElementById("option").style.display = "none";
    }
}
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

function logCityStatus() {
    console.log("There are " + $summerDays + " left in the summer!");
    console.log("You have " + $currentWater + " gallons left in your reservoir.");
    console.log("Your city uses " + $waterUsage + " gallons gallons per week.");
    console.log("You've saved " + $waterSaved + " gallons so far!");
}

