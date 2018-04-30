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
  $("#aboutdiv").click(function(){
    document.getElementById("about").style.display = "block";
    document.getElementById("login").style.display = "none";

    document.getElementById("gamediv").style.display = "none";
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
        document.getElementById("setNames").reset();
    });
    //function for the back button
  $("#back").click(function(){
        document.getElementById("about").style.display = "none";
        document.getElementById("gamediv").style.display = "block";
        document.getElementById("map").style.filter = "blur(3px)";
        document.getElementById("login").style.display = "block";
        document.getElementById("userCity").innerHTML = "";
        document.getElementById("userName").innerHTML = "";
        document.getElementById("waterLevel").innerHTML = "";
        document.getElementById("setNames").reset();
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
      }
      
      var myGameArea = {
        canvas : document.createElement("canvas"),
        start : function() {
          this.canvas.width = 1920;
          this.canvas.height = 1080;
          this.context = this.canvas.getContext("2d");
          this.canvas.setAttribute("id", "map");
          document.getElementById("gamediv").appendChild(this.canvas);
          this.interval = setInterval(updateGameArea, 100);
        },
        clear : function() {
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
      
      function updateGameArea() {
        myGameArea.clear();
        gameMap.update();
        district1.update();
        district2.update();
        district3.update();
      }
/*
function hasSpecial(s) {
    return /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(s);
}
*/
