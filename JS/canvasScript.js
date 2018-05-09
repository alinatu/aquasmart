/* Canvas Setup */
      var district1Clicked = false;
      var district2Clicked = false;
      var district3Clicked = false;
      var myGamePiece;
      function startGame() {
        myGameArea.start();
        gameMap = new component(0, 375, 400, "images/Map.png", 0, 0, "image");
        district1 = new component(1, 100, 80, "images/District1Redone.png", 48, 92, "image", false);
        paint1 = new toggleComponent(100, 80, "images/paintstroke.png", 48, 92, false);
        
        district2 = new component(2, 100, 100, "images/District2Redone.png", 85, 190, "image", true);
        paint2 = new toggleComponent(100, 90, "images/paintstroke.png", 85, 190, false);
        
        district3 = new component(3, 100, 90, "images/District3Redone.png", 250, 140, "image", true);
        paint3 = new toggleComponent(100, 90, "images/paintstroke.png", 250, 140, false);
        
        drop1 = new toggleComponent(25, 25, "images/waterdrop.png", 48, 92, false);
        drop2 = new toggleComponent(25, 25, "images/waterdrop.png", 85, 190, false);
        drop3 = new toggleComponent(25, 25, "images/waterdrop.png", 250, 140, false);
      }
      
      var myGameArea = {
        canvas : document.createElement("canvas"),
        start : function() {
          this.canvas.width = 375;
          this.canvas.height = 400;
          this.context = this.canvas.getContext("2d");
          this.canvas.setAttribute("id", "map");
          this.canvas.addEventListener('mousedown', onDown, false);
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

      function onDown(event) {
        cx = event.pageX;
        cy = event.pageY;
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
            && district1.hasEvent) {
            setDecision();
            setDropDowns();
            updateScore();
            document.getElementById("option").style.display = "block";
            var district1Clicked = false;
        } 
        if (mousePos.x > district2.x && mousePos.x < (district2.x + district2.width)
            && mousePos.y > district2.y && mousePos.y < district2.y + district2.height
            && district2.hasEvent) {
              setDecision();
              setDropDowns();
              document.getElementById("option").style.display = "block";
              var district2Clicked = false;
        } 
        if (mousePos.x > district3.x && mousePos.x < (district3.x + district3.width)
            && mousePos.y > district3.y && mousePos.y < district3.y + district3.height
            && district3.hasEvent) {
              setDecision();
              setDropDowns();
              document.getElementById("option").style.display = "block";
              var district3Clicked = false;
        } 
    }
  
      /* function debugMessage(canvas, message) {
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = '18pt Calibri';
        context.fillStyle = 'black';
        context.fillText(message, 10, 25);
      } */
     
      function districtHide(){
        if (district1Clicked){
          district1.hasEvent = false;
        }
        if (district2Clicked){
          district2.hasEvent = false;
        }
        if (district3Clicked){
          district3.hasEvent = false;
        }
      }
      if ($chosen){
        districtHide();
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

          if (hasEvent && this.id == 1) {
            drop1.show = true;
          } else if (!hasEvent && this.id == 1) {
            drop1.show = false;
          }

          if (hasEvent && this.id == 2) {
            drop2.show = true;
          } else if (!hasEvent && this.id == 2) {
            drop2.show = false;
          }

          if (hasEvent && this.id == 3) {
            drop3.show = true;
          } else if (!hasEvent && this.id == 3) {
            drop3.show = false;
          }
        } 
      }

      

      function toggleComponent(width, height, image, x, y, show) {
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
          /* var x = Math.floor((Math.random() * 2) + 1); */
          
          /* if(x == 1){
            this.show = true;   
          } else {
            this.show = false;
          } */
        
          
          if (this.show == true) {
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
      

      function updateGameArea() {
        myGameArea.clear();
        gameMap.update();
        paint1.update();
        district1.update();
        paint2.update();
        district2.update();
        paint3.update();
        district3.update();
        drop1.update();
        drop2.update();
        drop3.update();
      }