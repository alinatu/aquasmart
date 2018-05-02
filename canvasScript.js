/* Canvas Setup */
      var myGamePiece;
      function startGame() {
        myGameArea.start();
        gameMap = new component(1920, 1080, "images/Map.png", 0, 0, "image");
        district1 = new component(439, 267, "images/District1Redone.png", 250, 235, "image");
        paint1 = new toggleComponent(439, 267, "images/paintstroke.png", 250, 235, false);
        
        district2 = new component(434, 311, "images/District2.png", 590, 450, "image");
        paint2 = new toggleComponent(434, 311, "images/paintstroke.png", 590, 450, false);
        
        district3 = new component(468, 369, "images/District3.png", 1300, 300, "image");
        paint3 = new toggleComponent(468, 369, "images/paintstroke.png", 1300, 300, false);
        
        drop1 = new toggleComponent(50, 50, "images/waterdrop.png", 250, 235, false);
        drop2 = new toggleComponent(50, 50, "images/waterdrop.png", 590, 450, false);
        drop3 = new toggleComponent(50, 50, "images/waterdrop.png", 1300, 300, false);
      }

      var myGameArea = {
        canvas : document.createElement("canvas"),
        start : function() {
          this.canvas.width = 1920;
          this.canvas.height = 1080;
          this.context = this.canvas.getContext("2d");
          this.canvas.setAttribute("id", "map");
          this.canvas.addEventListener('mousedown', onDown, false);
          this.canvas.addEventListener('mousemove', function(event) {
            var mousePos = getMousePos(myGameArea.canvas, event);
            var message = 'Current pos: ' + mousePos.x + ', ' + mousePos.y;
            console.log(mousePos.x + ", " + mousePos.y);
          }, false);
          document.getElementById("gamediv").appendChild(this.canvas);
          this.interval = setInterval(updateGameArea, 1000);
          
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
      
      function debugMessage(canvas, message) {
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = '18pt Calibri';
        context.fillStyle = 'black';
        context.fillText(message, 10, 25);
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
          var x = Math.floor((Math.random() * 2) + 1);
          
          if(x == 1){
            this.show = true;   
          } else {
            this.show = false;
          }
        
          
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