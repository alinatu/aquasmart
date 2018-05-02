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
    $level = 100;
            $("#guy").click(function(){
                $level = $level - 10;
                $(".progress-bar").width($level + '%');
            });
  $("#aboutdiv").click(function(){
    document.getElementById("about").style.display = "block";
    document.getElementById("login").style.display = "none";
    document.getElementById("gamediv").style.display = "none";
    document.getElementById("scores").style.display = "none";
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
        document.getElementById("scores").style.display = "none";
        document.getElementById("setNames").reset();
    });
    //function for the back button on the about and highscores pages
  $(".back").click(function(){
        document.getElementById("about").style.display = "none";
        document.getElementById("scores").style.display = "none";
        document.getElementById("gamediv").style.display = "block";
        document.getElementById("map").style.filter = "blur(3px)";
        document.getElementById("login").style.display = "block";
        document.getElementById("userCity").innerHTML = "";
        document.getElementById("userName").innerHTML = "";
        document.getElementById("waterLevel").innerHTML = "";
        document.getElementById("scoreList").innerHTML = "";
        document.getElementById("setNames").reset();
    });
    //function for the highscores button
    $("#scoresDiv").click(function(e){
        document.getElementById("about").style.display = "none";
        document.getElementById("login").style.display = "none";
        document.getElementById("scores").style.display = "block";
        document.getElementById("gamediv").style.display = "none";
        document.getElementById("scoreList").innerHTML = "";
        e.preventDefault();
        console.log("Clicked for JSON");

        $.ajax({
            url: "./DB/getGlobalScores.php",
            dataType: "json",
            type: "GET",
            data: {output: 'json', },
            success: function(data) {
                console.log(data);
                var highest = data['high'];

                var listData = "<table><th>Player Name</th><th>Score</th></tr>";
                for (var i in highest) {
                    var highscore = highest[i];
                    listData += "<tr><td>" + highscore['user_name'] + "</td><td>" + highscore['user_score'] + "</td></tr>";
                }
                listData += "</table>";
                $("#scoreList").append(listData);
                listData = "";
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $("#scores").text(textStatus + " " + errorThrown + jqXHR.responseText);
            }
        });
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

/* Canvas Setup */
      var myGamePiece;
      function startGame() {
        myGameArea.start();
        gameMap = new component(1920, 1080, "images/Map.png", 0, 0, "image");
        district1 = new component(439, 267, "images/District1.png", 250, 235, "image");
        district2 = new component(434, 311, "images/District2.png", 590, 450, "image");
        district3 = new component(468, 369, "images/District3.png", 1300, 300, "image");
        drop1 = new droplet(50, 50, "images/waterdrop.png", 250, 235, false);
        drop2 = new droplet(50, 50, "images/waterdrop.png", 590, 450, false);
        drop3 = new droplet(50, 50, "images/waterdrop.png", 1300, 300, true);
      }

      var myGameArea = {
        canvas : document.createElement("canvas"),
        start : function() {
          this.canvas.width = 1920;
          this.canvas.height = 1080;
          this.context = this.canvas.getContext("2d");
          this.canvas.setAttribute("id", "map");
          document.getElementById("gamediv").appendChild(this.canvas);
          this.interval = setInterval(updateGameArea, 1000);
          
        },
        clear : function() {
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
      }
      
      var option = {
        name: "Option Name",
        desc : "Option Description",
        difficulty : 10,
        waterSaved : 12000,
        create : function(name, desc, difficulty, waterSaved) {
          this.name = name;
          this.desc = desc;
          this.difficulty = difficulty;
          this.waterSaved = waterSaved;
        }
      }

      function component(width, height, color, x, y, type) {
        this.type = type;
        if (type == "image") {
          this.image = new Image();
          this.image.src = color;
        } 
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
       
        
        this.update = function() {
          ctx = myGameArea.context;
          if (type == "image") {
              ctx.drawImage(this.image, 
                this.x, 
                this.y, 
                this.width, this.height);
          } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
          }
        } 
      }

      function droplet(width, height, image, x, y, show) {
        this.image = new Image();
        this.image.src = image;
        
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        var ogx = x;
        var ogy = y;
        
        //this.show = show;
        
        this.update = function() {
          ctx = myGameArea.context;
          var x = Math.floor((Math.random() * 2) + 1);
          console.log(x);
        
          if(x == 1){
            this.show = true;
            console.log(this.show);
            
       
          } else {
            this.show = false;
            console.log(this.show);
         
          }
        
          
          if (this.show == true) {
              ctx.drawImage(this.image, 
                ogx, 
                ogy, 
                this.width, this.height);
          } else {
              this.x = -50;
              this.y = -50;
              ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
          }
        } 
      }
      

      function updateGameArea() {
        myGameArea.clear();
        gameMap.update();
        district1.update();
        district2.update();
        district3.update();
        drop1.update();
        drop2.update();
        drop3.update();
      }
      

      
/*
function hasSpecial(s) {
    return /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(s);
}
*/
