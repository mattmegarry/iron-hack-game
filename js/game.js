'use strict';

function Game (gameAreaDiv) {
    var self = this;

    //Set game area div as a property of *this* Game
    self.gameAreaDiv = gameAreaDiv;

    //Game variables**
    self.finished;
    self.width;
    self.height;
    self.bgColor;
    self.canvasElement;
    self.player;
    self.world;
    self.handleKeyDown;
    self.handleKeyUp;
    self.ctx;
    self.i;

    //Execute
    self._init();
    window.requestAnimationFrame(self._frameRefresh.bind(self));
}

Game.prototype._init = function() {
    var self = this;

    self.finished = false;
    self.width = 1000; //Check or CHANGE THIS
    self.height = 600; //Check or CHANGE THIS
    self.bgColor = 'grey';
    self.i = 0;


    self._createCanvasElement();
    self.ctx = self.canvasElement.getContext('2d');

    //SUB GAME OBJECT INSTANCIATION**
    self.player = new Player(self.ctx, self.width, self.height);
    self.world = new World(self.ctx, self.width, self.height);

    self._defineUserInputs();

    document.addEventListener('keydown', self.handleKeyDown);
    document.addEventListener('keyup', self.handleKeyUp);
}

Game.prototype._createCanvasElement = function() {
    var self = this;

    //Create the GAME canvas dom element
    self.canvasElement = document.createElement('canvas');
    self.canvasElement.width = self.width;
    self.canvasElement.height = self.height;
    //Insert the canvas as a dom element
    self.gameAreaDiv.appendChild(self.canvasElement);
}

Game.prototype._defineUserInputs = function () {
    var self = this;

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
}

Game.prototype._frameRefresh = function() {
    var self = this;

    //------LOGIC------
    //PLAYER UPDATES
    self.player.lateralCollision();
    self.player.update();
    //WORLD UPDATES**
    //self.world.update();
    self.i++;
        
    //END GAME
    if (self.i > 3000) {
        self.finished = true;
        self.gameOverCallback();
    }

    //DRAWING**
    
    
    //The background
    self.ctx.clearRect(0, 0, 1000, 600);
    self.ctx.fillStyle = self.bgColor; //DOESN'T MAKE SENSE IN CONTEXT OF CLEAR RECT
    //The other stuff - must go after!!
    self.world.draw();
    self.player.draw();

    //CONTINUE REFRESHING
    if (!self.finished) {
        window.requestAnimationFrame(self._frameRefresh.bind(self));
        //console.log('Mooo');
    }
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