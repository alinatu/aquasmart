/* Canvas Setup */
      var myGamePiece;
      function startGame() {
        myGameArea.start();
        
        gameMap = new component(1920, 1080, "images/Map.png", 0, 0, "image");
        district1 = new component(439, 267, "images/District1Redone.png", 300, 230, "image");
        paint1 = new toggleComponent(439, 267, "images/paintstroke.png", 300, 230, false);
        
        district2 = new component(434, 311, "images/District2.png", 600, 450, "image");
        paint2 = new toggleComponent(434, 311, "images/paintstroke.png", 600, 450, false);
        
        district3 = new component(468, 369, "images/District3.png", 1250, 350, "image");
        paint3 = new toggleComponent(468, 369, "images/paintstroke.png", 1250, 350, false);
        
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
          this.canvas.addEventListener('mousemove', mouseHover, false);
          this.canvas.addEventListener('click', mouseClick, false);
          document.getElementById("gamediv").appendChild(this.canvas);
          this.interval = setInterval(updateGameArea, 20);
          
        },
        clear : function() {
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
      }
      
      var percent = {
        x : 0,
        y : 0
      };

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
      
      function mouseHover(event) {
          var x = Math.floor(event.x / myGameArea.canvas.clientWidth * 100);
          var y = Math.floor(event.y/ myGameArea.canvas.clientHeight * 100) - 70;
        
          var message = 'Current pos: ' + x + ', ' + y;
          console.log(x + ", " + y);
          if (x > 15 && x < 34
              && y > 20 && y < 41) {
            paint1.show = true;
          } else {
            paint1.show = false;
          }
          if (x > 32 && x < 50
              && y > 38 && y < 62) {
            paint2.show = true;
          } else {
            paint2.show = false;
          }
          if (x > 66 && x < 90
              && y > 21 && y < 46) {
            paint3.show = true;
          } else {
            paint3.show = false;
          }
      }
      function mouseClick() {
        var x = Math.floor(event.x / myGameArea.canvas.offsetWidth * 100);
        var y = Math.floor(event.y/ myGameArea.canvas.offsetHeight * 100) - 74;
        
        if (x > 15 && x < 34
            && y > 20 && y < 41) {
            document.getElementById("option").style.display = "block";
        } 
        if (x > 32 && x < 50
            && y > 38 && y < 62) {
              document.getElementById("option").style.display = "block";
        } 
        if (x > 66 && x < 90
            && y > 21 && y < 46) {
              document.getElementById("option").style.display = "block";
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

      

      function toggleComponent(width, height, image, x, y, show) {
        this.image = new Image();
        this.image.src = image;
        
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        var ogx = x;
        var ogy = y;

        this.update = function() {
          ctx = myGameArea.context;
          
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