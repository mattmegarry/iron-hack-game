'use strict';

function Game (gameAreaDiv) {
    var self = this;

    //Set game area div as a property of *this* Game
    self.gameAreaDiv = gameAreaDiv;

    //Game variables
    self.finished = false;
    self.width = 1000; //Check or CHANGE THIS
    self.height = 600; //Check or CHANGE THIS
    self.bgColor = 'grey';

    //Create the GAME canvas dom element
    self.canvasElement = document.createElement('canvas');
    self.canvasElement.width = self.width;
    self.canvasElement.height = self.height;

    //Insert the canvas as a dom element
    gameAreaDiv.appendChild(self.canvasElement);

    //Set the canvas context
    self.ctx = self.canvasElement.getContext('2d');

    //Instanciate the player (params are thus, since whole canvas must be referencable)
    self.player = new Player(self.ctx, self.width, self.height);

    //Instantiate the environment (params are thus, since whole canvas must be referencable)
    //self.level = new level(self.ctx, self.width, self.height);

    //Insantiate enemies (later) - or include in level?

    //User input handling
    self.handleKeyDown = function (event) {
        var key = event.key.toLowerCase();
        switch (key) {
            case 'a':
                self.player.moveLateral('left');
                break;
            case 'd':
                self.player.moveLateral('right');
                break;
        }
    }
    self.handleKeyUp = function (event) {
        var key = event.key.toLowerCase();
        switch (key) {
          case 'a':
            self.player.moveLateral('stopleft');
            break;
          case 'd':
            self.player.moveLateral('stopright');
            break;
        }
    } 

    //What the canvas will do EVERY FRAME
    var i = 0;//DELETE THIS EVENTUALLY
    function frameRefresh () {
        //LOGIC - update declared variables here
          self.player.update();
          i++;
          //console.log(i); 
          
        // To end the game, just set self.finished to true with some logic here...
        if (i > 300) {
            self.finished = true;
            self.gameOverCallback();
        }

        //DRAWING - this is the high-level 'executable' for ALL things drawn to screen
        //e.g - player.draw();
        self.ctx.clearRect(0, 0, 1000, 600);
        self.ctx.fillStyle = self.bgColor; //DOESN'T MAKE SENSE IN CONTEXT OF CLEAR RECT
        self.player.draw();

        //UPDATE LOGIC - calls rAF in an infinite loop, until self.finshed === true
        if (!self.finished) {
            window.requestAnimationFrame(frameRefresh);
            //console.log('Mooo');
          }
    }

    //Calls rAF for the first time
    window.requestAnimationFrame(frameRefresh);
       
    document.addEventListener('keydown', self.handleKeyDown);
    document.addEventListener('keyup', self.handleKeyUp);
}


//This is a setter - LOOK INTO A BIT FURTHER
Game.prototype.onGameOver = function (callback) {
    var self = this;
    self.gameOverCallback = callback;
}

Game.prototype.destroy = function () {
    var self = this;

    self.finished = true;

    self.canvasElement.remove();

    //Here we destroy the particular INSTANCE of Game that is live
    //gameOverCallback;??

    document.removeEventListener('keydown', self.handleKeyDown);
    document.removeEventListener('keyup', self.handleKeyUp);
}