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

    //What the canvas will do EVERY FRAME
    var i = 0;
    function frameRefresh () {
        //LOGIC - update declared variables here
          //e.g - player.update();
          i++;
          console.log(i); 
          
        // To end the game, just set self.finished to true with some logic here...
        if (i > 200) {
        self.finished = true;
        destroyGame();
        }

        //DRAWING - this is the high-level 'executable' for ALL things drawn to screen
            //e.g - player.draw();
        self.ctx.fillRect(0, 0, 1000, 600);
        self.ctx.fillStyle = self.bgColor;

        //UPDATE LOGIC - calls rAF in an infinite loop, until self.finshed === true
        if (!self.finished) {
            window.requestAnimationFrame(frameRefresh);
            //console.log('Mooo');
          }
    }

    //Calls rAF for the first time
    window.requestAnimationFrame(frameRefresh);
}

Game.prototype.destroy = function () {
    var self = this;

    self.finished = true;

    self.canvasElement.remove();

    //Here we destroy the particular INSTANCE of Game that is live
    //gameToGameOverBridge;??
}