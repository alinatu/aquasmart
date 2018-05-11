/* Canvas Setup */
      var district1Clicked = false;
      var district2Clicked = false;
      var district3Clicked = false;
      var myGamePiece;
      function startGame() {
        myGameArea.start();
        gameMap = new component(0, 375, 400, "images/MapTest2.png", 0, 0, "image");
        district1 = new component(1, 100, 80, "images/District1Redone.png", 48, 92, "image", true);
        paint1 = new hoverComponent(1, 100, 80, "images/paintstroke.png", 48, 92, false);
        
        district2 = new component(2, 100, 100, "images/District2Redone.png", 85, 190, "image", true);
        paint2 = new hoverComponent(2, 100, 90, "images/paintstroke.png", 85, 190, false);
        
        district3 = new component(3, 100, 90, "images/District3Redone.png", 250, 140, "image", true);
        paint3 = new hoverComponent(3, 100, 90, "images/paintstroke.png", 250, 140, false);
        
        drops = {
          0 : drop1 = new toggleComponent(1, 25, 25, "images/waterdrop.png", 48, 92, true),
          1 : drop2 = new toggleComponent(2, 25, 25, "images/waterdrop.png", 85, 190, true),
          2 : drop3 = new toggleComponent(3, 25, 25, "images/waterdrop.png", 250, 140, true)
        }

        calendar = new component(4, 50, 70, "images/calendarTracking/Calendar.png", 5, -5, "image", false);
        daysLeft = new counterComponent(4, 50, 70, "images/calendarTracking/7.png", 5, -5, "image");
      }
      
      var myGameArea = {
        canvas : document.createElement("canvas"),
        start : function() {
          this.canvas.width = 375;
          this.canvas.height = 400;
          this.context = this.canvas.getContext("2d");
          this.canvas.setAttribute("id", "map");
          this.canvas.addEventListener('mousemove', mouseHover, false);
          this.canvas.addEventListener('click', mouseClick, false);
          document.getElementById("gamediv").appendChild(this.canvas);
          this.interval = setInterval(updateGameArea, 20);
          
        },
        clear : function() {
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
      }
      
      function getMousePos(canvas, event) {
        var bounds = canvas.getBoundingClientRect();
        return {
          x : event.clientX - bounds.left,
          y : event.clientY - bounds.top
        };
      }
      
      function mouseHover() {
          var mousePos = getMousePos(myGameArea.canvas, event);
          var message = 'Current pos: ' + mousePos.x + ', ' + mousePos.y;
          //console.log(mousePos.x + ", " + mousePos.y);
          if (mousePos.x > district1.x && mousePos.x < (district1.x + district1.width)
              && mousePos.y > district1.y && mousePos.y < district1.y + district1.height) {
            paint1.show = true;
          } else {
            paint1.show = false;
          }
          if (mousePos.x > district2.x && mousePos.x < (district2.x + district2.width)
              && mousePos.y > district2.y && mousePos.y < district2.y + district2.height) {
            paint2.show = true;
          } else {
            paint2.show = false;
          }
          if (mousePos.x > district3.x && mousePos.x < (district3.x + district3.width)
              && mousePos.y > district3.y && mousePos.y < district3.y + district3.height) {
            paint3.show = true;
          } else {
            paint3.show = false;
          }
      }
      function mouseClick() {
        var mousePos = getMousePos(myGameArea.canvas, event);
        var message = 'Current pos: ' + mousePos.x + ', ' + mousePos.y;
        console.log(mousePos.x + ", " + mousePos.y);
        if (mousePos.x > district1.x && mousePos.x < (district1.x + district1.width)
            && mousePos.y > district1.y && mousePos.y < district1.y + district1.height
            && !situations[0].chosen) {
            setDecision(0);
            setDropDowns(0);
            updateScore();
            document.getElementById("option").style.display = "block";
            var district1Clicked = false;
        } 
        if (mousePos.x > district2.x && mousePos.x < (district2.x + district2.width)
            && mousePos.y > district2.y && mousePos.y < district2.y + district2.height
            && !situations[1].chosen) {
              setDecision(1);
              setDropDowns(1);
              document.getElementById("option").style.display = "block";
              var district2Clicked = false;
        } 
        if (mousePos.x > district3.x && mousePos.x < (district3.x + district3.width)
            && mousePos.y > district3.y && mousePos.y < district3.y + district3.height
            && !situations[2].chosen) {
              setDecision(2);
              setDropDowns(2);
              document.getElementById("option").style.display = "block";
              var district3Clicked = false;
        } 
    }

      function component(id, width, height, color, x, y, type, hasEvent) {
        this.id = id;
        this.type = type;
        if (type == "image") {
          this.image = new Image();
          this.image.src = color;
        } 
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.hasEvent = hasEvent;
        
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

          var idCount = 1;
          for (var i = 0; i < 3; i++) {
            if (this.id == idCount || situations[i].chosen == false) {
              drops[i].show = true;
            } else if (this.id == idCount || situations[i].chosen == true) {
              drops[i].show = false;
            }
            // console.log("Drop" + idCount + ": " + drops[i].show);
            idCount++;
          }
          
        } 
      }

      function toggleComponent(id, width, height, image, x, y, show) {
        this.image = new Image();
        this.image.src = image;
        
        this.id = id;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        var ogx = x;
        var ogy = y;
        
        this.show = show;
        
        this.update = function() {
          ctx = myGameArea.context;

          var index = this.id - 1;
          if (situations[index].chosen == false) {
              ctx.drawImage(this.image, 
                ogx, 
                ogy, 
                this.width, this.height);
          } else {
              this.x = -500;
              this.y = -500;
              ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
          }
        } 
      }

      function hoverComponent(id, width, height, image, x, y, show) {
        this.image = new Image();
        this.image.src = image;
        
        this.id = id;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        var ogx = x;
        var ogy = y;
        
        this.show = show;
        
        this.update = new function update() {
          return function(){
          ctx = myGameArea.context;

          var index = this.id - 1;
          if (this.show == true && situations[index].chosen == false) {
              ctx.drawImage(this.image, 
                ogx, 
                ogy, 
                this.width, this.height);
          } else {
              this.x = -500;
              this.y = -500;
              ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
          }
          }
        } 
      }

      function counterComponent(id, width, height, color, x, y, type) {
        this.id = id;
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

          var imageName = "images/calendarTracking/" + $weekDays + ".png";
          // console.log(imageName);
          this.image = new Image();
          this.image.src = imageName;
          myGameArea.context;
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
        calendar.update();
        daysLeft.update();
        paint1.update();
        district1.update();
        paint2.update();
        district2.update();
        paint3.update();
        district3.update();
        drops[0].update();
        drops[1].update();
        drops[2].update();
      }