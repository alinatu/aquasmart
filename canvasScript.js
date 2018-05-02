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